import { FC, useState } from 'react'

import { Form, Formik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { Web3Core } from 'common-types/web3core'
import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import { ModalOverlay } from 'components/modals/overlay'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import useRequireWallet from 'hooks/useRequireWallet'
import { useWithdraw } from 'hooks/useWithdraw'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import getChainId from 'utils/environment/getChainId'
import { HttpError } from 'utils/httpError'
import { validateIntegerAndFloatDigitsLength } from 'utils/math/validateIntegerAndFloatDigits'
import { integerOrFloatNumbers } from 'utils/regexp/number'
import { IServerError } from 'utils/types/common'
import { IMetamaskError } from 'utils/types/error'
import validation from 'validation/yup'

interface IWithdrawModalProps {
    isOpen: boolean
    closeModal: () => void
}

interface WithdrawModalForm {
    amount: string
}

const initialState: WithdrawModalForm = {
    amount: '',
}

const schema = yup.object().shape({
    amount: validation.string.required(),
})

const WithdrawModal: FC<IWithdrawModalProps> = ({ isOpen, closeModal }) => {
    const activeWallet = useWalletStore(store => store.activeWallet)
    const swapService = useServiceStore(state => state.swapService)
    const [chainId] = useState<Web3Core.EChainID>(getChainId())
    const requireWallet = useRequireWallet()
    const withdraw = useWithdraw()

    const withdrawMutation = useMutation(withdraw, {
        onSuccess() {
            closeModal()
        },
        onError(e: IMetamaskError) {
            toast(e.reason)
        },
    })

    const withdrawRequestMutation = useMutation(swapService.withdrawal, {
        async onSuccess(data) {
            if ((data as unknown as IServerError).code === 'low_balance_wallet')
                throw new Error((data as unknown as IServerError).message)

            await requireWallet(
                () =>
                    withdrawMutation.mutate({
                        params: {
                            amount: data.amount,
                            nonce: data?.payload?.nonce,
                            signature: data?.payload?.signature,
                        },
                        activeWallet,
                    }),
                chainId
            )
        },
        onError(e: HttpError) {
            toast(e.message)
        },
    })

    const submitForm = async ({ amount }: WithdrawModalForm): Promise<void> => {
        withdrawRequestMutation.mutate({ amount: Number(amount) })
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModal}>
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
                                        formik.setValues({ amount: value })
                                    }
                                }}
                            />
                            <SubmitButton
                                type="submit"
                                isLoading={
                                    withdrawRequestMutation.isLoading || withdrawMutation.isLoading
                                }
                                className="shadow-shadowButton hover:bg-pink-fuchsia mt-6 bg-cta"
                            >
                                Confirm
                            </SubmitButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

export default WithdrawModal
