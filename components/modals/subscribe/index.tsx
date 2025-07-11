import { FC, useCallback } from 'react'

import { Form, Formik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import { ModalOverlay } from '../overlay'
import openSuccessSubmittingModal from '../partnership/success'
import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'

import Input from 'components/authorization/form/input'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import useServiceStore from 'store/service'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

type Props = ConfirmableProps

interface ISubscribeForm {
    email: string
}

const schema = yupObject().shape({
    email: validation.string.email(true),
})

const initialState: ISubscribeForm = {
    email: '',
}

const SubscribeNewsModal: FC<Props> = ({ proceed, show }) => {
    const close = useCallback(() => proceed(), [])
    const formsService = useServiceStore(store => store.formsService)

    const subscribeMutation = useMutation(formsService.subscribe, {
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async ({ email }: ISubscribeForm): Promise<void> => {
        const res = await subscribeMutation.mutateAsync({ email })

        if (res?.ok) {
            openSuccessSubmittingModal({ title: 'Subscribe newsletter' })
            close()
        }
    }

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ModalFormWrapper
                title="Subscribe newsletter"
                onClose={close}
                classes={{ container: 'max-w-162' }}
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form className="space-y-5">
                            <Input title="Email" name="email" placeholder="example@gmail.com" />
                            <SmallButton
                                isLoading={subscribeMutation.isLoading}
                                className="w-full"
                                type="submit"
                            >
                                Subscribe
                            </SmallButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

const openSubscribeModal = promisifyModal(SubscribeNewsModal)

export default openSubscribeModal
