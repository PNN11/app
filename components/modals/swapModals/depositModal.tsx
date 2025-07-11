import { FC, MouseEvent, useState } from 'react'

import { Form, Formik } from 'formik'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'

import BinanceDepositOptions from './deposit/binanceOptions'
import TransactionWrapper from './transactionWrapper'

import { Web3Core } from 'common-types/web3core'
import Input from 'components/authorization/form/input'
import BinanceButton from 'components/common/ui/buttons/binanceButton'
import { ModalOverlay } from 'components/modals/overlay'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import BinanceIcon from 'components/svg/binance'
import useGetUsdToAmtSwapRate from 'hooks/swap/useGetUsdToAmtSwapRate'
import { useDeposit } from 'hooks/useDeposit'
import { useSetAuthorizedUser } from 'hooks/useGetUserInfo'
import useRequireWallet from 'hooks/useRequireWallet'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import useWalletStore from 'store/useWalletStore'
import getChainId from 'utils/environment/getChainId'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'
import { numberFormatter } from 'utils/math/formatNumber'
import { validateIntegerAndFloatDigitsLength } from 'utils/math/validateIntegerAndFloatDigits'
import { integerOrFloatNumbers } from 'utils/regexp/number'
import { approve } from 'utils/transactions/approve'
import { IMetamaskError } from 'utils/types/error'
import validation from 'validation/yup'

type IDepositModal = ConfirmableProps

interface DepositModalForm {
    amount: string
}

const initialState: DepositModalForm = {
    amount: '',
}

const schema = yup.object().shape({
    amount: validation.string.required(),
})

const gameAssetId = '65578afab87e105b0bcc4547'

const DepositModal: FC<IDepositModal> = ({ show, cancel }) => {
    const wallet = useWalletStore(store => store.activeWallet)
    const [chainId] = useState<Web3Core.EChainID>(getChainId())
    const swapService = useServiceStore(store => store.swapService)
    const accessToken = useUserStore(s => s.accessToken)
    const requireWallet = useRequireWallet()
    const deposit = useDeposit()
    const [txHash, setTxHash] = useState('')
    const rate = useGetUsdToAmtSwapRate()

    const closeModal = (): void => cancel()

    const { data: minAmount, isLoading } = useQuery(
        'min-amount',
        swapService.getMinAmountForDepositBinance,
        {
            onError(error) {
                if (error instanceof HttpError) toast(error.message)
            },
        }
    )

    const approveMutation = useMutation(approve, {
        onError(e: IMetamaskError) {
            toast(e.reason)
        },
    })

    const depositMutation = useMutation(deposit, {
        onSuccess(data) {
            setTxHash(data.hash)
        },
        onError(e: IMetamaskError) {
            toast(e.reason)
        },
    })

    const submitForm = async ({ amount }: DepositModalForm): Promise<void> => {
        const decimals = 18

        const { toBigNumber } = await import('utils/math/ethers/toBigNumber')
        const result = toBigNumber(amount, decimals)

        await requireWallet(async () => {
            const approved = await approveMutation.mutateAsync({
                tokenAdress: process.env.NEXT_PUBLIC_MAIN_TOKEN,
                amount: result,
                wallet,
            })

            if (approved?.success)
                await depositMutation.mutateAsync({
                    amount: +amount,
                    activeWallet: wallet,
                })
        }, chainId)
    }

    const close = (): void => {
        setTxHash('')
        closeModal()
    }

    const handleDepositWithBinance = (e: MouseEvent<HTMLButtonElement>, amount: number): void => {
        if (approveMutation.isLoading || depositMutation.isLoading || isLoading) {
            e.stopPropagation()
            e.preventDefault()

            return
        }

        if (amount < minAmount.amount) {
            toast(`Amount must be greater than ${minAmount?.amount}`)
            e.stopPropagation()
            e.preventDefault()

            return
        }

        sendAnalyticsEvent({ event: 'deposit', options: { deposit_value: amount * rate } })
    }

    const getUrl = (amount: number): string => {
        return `/api/${
            Number.isNaN(amount) ? 'buy-game-asset-binance' : 'binance'
        }?amount=${amount}&accessToken=${accessToken?.token}&gameAssetId=${gameAssetId}`
    }

    useSetAuthorizedUser()

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ModalFormWrapper
                title="Deposit AMT"
                onClose={close}
                classes={{ container: 'self-start mt-28 max-w-162' }}
            >
                <TransactionWrapper txHash={txHash} onDone={close}>
                    <Formik
                        onSubmit={submitForm}
                        validateOnMount
                        validationSchema={schema}
                        initialValues={initialState}
                    >
                        {formik => (
                            <Form>
                                <BinanceDepositOptions
                                    value={(+formik.values.amount).toString()}
                                    setValue={value => formik.setFieldValue('amount', +value)}
                                />
                                <Input
                                    title="Amount"
                                    name="amount"
                                    type="number"
                                    onChange={e => {
                                        const { value } = e.target

                                        if (
                                            integerOrFloatNumbers.test(value) &&
                                            validateIntegerAndFloatDigitsLength({
                                                value,
                                            })
                                        ) {
                                            formik.setValues({ amount: value })
                                        }
                                    }}
                                    hint={
                                        !isLoading
                                            ? `Minimum amount ${numberFormatter(
                                                  minAmount.amount ?? 0,
                                                  0,
                                                  3
                                              )}`
                                            : null
                                    }
                                />
                                {/* <SubmitButton
                                    isLoading={
                                        approveMutation.isLoading || depositMutation.isLoading
                                    }
                                    type="submit"
                                    className="mt-6 mb-3 bg-cta shadow-button hover:bg-cta-600"
                                >
                                    Confirm
                                </SubmitButton> */}
                                <a
                                    rel="noreferrer"
                                    target="_blank"
                                    className="mt-5 block text-2xl"
                                    href={getUrl(+formik.values.amount)}
                                >
                                    <BinanceButton
                                        onClick={e => {
                                            handleDepositWithBinance(e, +formik.values.amount)
                                        }}
                                        isLoading={isLoading}
                                        isDisabled={
                                            approveMutation.isLoading ||
                                            depositMutation.isLoading ||
                                            isLoading
                                        }
                                        type="button"
                                        className=""
                                    >
                                        <>
                                            <BinanceIcon />{' '}
                                            <span className="ml-3 font-medium">
                                                Pay with Binance Pay
                                            </span>
                                        </>
                                    </BinanceButton>
                                </a>
                            </Form>
                        )}
                    </Formik>
                </TransactionWrapper>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

const openDepositAmtModal = promisifyModal(DepositModal)

export default openDepositAmtModal
