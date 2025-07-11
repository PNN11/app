import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { object as yupObject } from 'yup'

import { IModal } from './interfaces/modalInterface'

import Input from 'components/authorization/form/input'
import TextArea from 'components/authorization/form/textArea'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { ModalOverlay } from 'components/modals/overlay'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import useServiceStore from 'store/service'
import validation from 'validation/yup'

type ContactUsModalProps = IModal & {}

interface IContactForm {
    name: string
    email: string
    message: string
}

const schema = yupObject().shape({
    name: validation.string.name('name', true),
    email: validation.string.email(true),
    message: validation.string.text('message', true),
})

const initialState: IContactForm = {
    name: '',
    email: '',
    message: '',
}

const ContactUsModal: FC<ContactUsModalProps> = ({ isOpen, close }) => {
    const formsService = useServiceStore(store => store.formsService)

    const { mutateAsync, isLoading } = useMutation(formsService.submitPartnershipForm, {
        onSuccess() {
            close()
        },
    })

    const submitForm = async (
        values: IContactForm,
        { setValues, resetForm }: FormikHelpers<IContactForm>
    ): Promise<void> => {
        await mutateAsync(values)

        resetForm()
        setValues(initialState)
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <ModalFormWrapper
                title="Contact us"
                onClose={close}
                classes={{ container: 'self-start mt-28 max-w-162' }}
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form>
                            <Input title="Name" name="name" classes={{ input: 'px-4 py-2.5' }} />
                            <Input title="Email" name="email" classes={{ input: 'px-4 py-2.5' }} />
                            <TextArea title="Comment" name="message" classes={{ input: 'h-24' }} />
                            <SmallButton isLoading={isLoading} type="submit" className="w-full">
                                Continue
                            </SmallButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

export default ContactUsModal
