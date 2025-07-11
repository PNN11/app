import { FC, useState } from 'react'

import { PopulatedTransaction, ethers } from 'ethers'
import { Form, Formik } from 'formik'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { Economics } from 'common-types/economics'
import { Web3Core } from 'common-types/web3core'
import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import Skeleton from 'components/common/skeleton'
import { Dropdown } from 'components/common/ui/dropdown'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import useGetERC20Currencies from 'hooks/swap/useGetERC20Currencies'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import useRequireWallet from 'hooks/useRequireWallet'
import { CurrencyLabel } from 'pages/nft/sell/[id]'
import { TChainIds, blockchains } from 'services/wallets/blockchainProvider'
import useWalletStore from 'store/useWalletStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { numberFormatter } from 'utils/math/formatNumber'
import { validateIntegerAndFloatDigitsLength } from 'utils/math/validateIntegerAndFloatDigits'
import { integerOrFloatNumbers } from 'utils/regexp/number'
import validation from 'validation/yup'

interface WithdrawFromCustodialWalletModalProps extends ConfirmableProps {}

interface WithdrawalFormValues {
    address: string
    amount: string
}

const initialState: WithdrawalFormValues = {
    address: '',
    amount: '',
}

const schema = yup.object().shape({
    address: validation.string.walletAddress(true),
    amount: validation.string.required(),
})

const WithdrawFromCustodialWalletModal: FC<WithdrawFromCustodialWalletModalProps> = ({
    proceed,
    show,
}) => {
    const [currency, setCurrency] = useState<Economics.IAsset>(null)
    const [transaction, setTransaction] = useState<PopulatedTransaction>(null)
    const getBlockchainService = useGetRequiredBlockchainService()
    const requireWallet = useRequireWallet()
    const activeWallet = useWalletStore(s => s.activeWallet)

    const { data, fetchNextPage } = useGetERC20Currencies()

    const {
        data: fee,
        isLoading,
        isError,
    } = useQuery(
        [QueryKeys.GET_TRANSACTION_FEE, transaction],
        async () => {
            const blockchainService = await getBlockchainService()

            const fee = await blockchainService.estimateTransactionFee({
                tx: transaction,
                activeWallet,
            })

            return fee
        },
        {
            enabled: !!transaction,
            refetchInterval: 5000,
        }
    )

    const { processing, reset, wrap } = useAsyncWrapper()
    const { processing: sendProcessing, reset: sendReset, wrap: sendWrap } = useAsyncWrapper()

    const closeModal = (): void => proceed()

    const submitForm = async ({ amount, address }: WithdrawalFormValues): Promise<void> => {
        await requireWallet(async () => {
            const [, error] = await wrap(async () => {
                const blockchainService = await getBlockchainService()

                const tx = await blockchainService.sendCurrency({
                    activeWallet,
                    amount: +amount,
                    decimals: currency.decimals,
                    recipientAddress: address,
                    tokenAddress: currency.address,
                })

                setTransaction(tx)
            }, null)()

            if (error) {
                toast(ethersContractExecutionError(error))
                reset()
            }
        }, currency.chaiId as Web3Core.EChainID)
    }

    const handleSendTransaction = async (): Promise<void> => {
        const [, error] = await sendWrap(async () => {
            const blockchainService = await getBlockchainService()

            const sendTx = await blockchainService.sendTransaction({
                activeWallet,
                tx: transaction,
                addExtraGas: false,
            })

            await activeWallet.waitForTx(sendTx.hash)
        }, null)()

        if (error) {
            toast(ethersContractExecutionError(error))
            reset()
            sendReset()

            return
        }

        toast.success(
            `Successfully send ${ethers.utils.formatEther(transaction.value)} ${
                currency.symbol
            } to ${transaction.to}`
        )
    }

    return (
        <ModalOverlay isOpen={show} onClose={closeModal}>
            <ModalFormWrapper
                title="Withdraw"
                onClose={closeModal}
                classes={{ container: 'self-start mt-28 max-w-162' }}
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {formik => (
                        <Form>
                            <Dropdown
                                items={(data?.pages?.map(page => page.docs) ?? []).flat()}
                                activeItem={currency}
                                setActiveItem={setCurrency}
                                elementToLabel={CurrencyLabel}
                                classes={{ wrapper: 'w-full mb-5 h-12', activeItem: 'h-12' }}
                                onScrollEnd={fetchNextPage}
                                placeholder="Select currency"
                            />
                            <Input
                                name="address"
                                title="Recipient address"
                                type="text"
                                disabled={!!transaction}
                            />
                            <Input
                                title="Amount"
                                name="amount"
                                type="number"
                                onChange={e => {
                                    const { value } = e.target

                                    if (
                                        integerOrFloatNumbers.test(e.target.value) &&
                                        validateIntegerAndFloatDigitsLength({ value })
                                    ) {
                                        formik.setFieldValue('amount', value)
                                    }
                                }}
                                disabled={!!transaction}
                            />
                            {transaction && (
                                <div className="flex items-center gap-2">
                                    Transaction fee:{' '}
                                    <Skeleton
                                        isLoading={isLoading}
                                        classes={{ skeleton: 'rounded-md h-6 w-25' }}
                                    >
                                        {isError ? (
                                            'Failed to estimate fee'
                                        ) : (
                                            <>
                                                {numberFormatter(fee, 0, 6)}{' '}
                                                {
                                                    blockchains[currency.chaiId as TChainIds]
                                                        .nativeCurrency.symbol
                                                }
                                            </>
                                        )}
                                    </Skeleton>
                                </div>
                            )}
                            <SubmitButton
                                type={transaction ? 'button' : 'submit'}
                                onClick={() => {
                                    if (!transaction) return
                                    handleSendTransaction()
                                }}
                                isLoading={processing || sendProcessing}
                                disabled={!currency}
                                className="shadow-shadowButton hover:bg-pink-fuchsia mt-6 bg-cta"
                            >
                                {transaction ? 'Confirm' : 'Continue'}
                            </SubmitButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

const openWithdrawFromCustodialWalletModal = promisifyModal(WithdrawFromCustodialWalletModal)

export default openWithdrawFromCustodialWalletModal
