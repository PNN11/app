import { FC } from 'react'

import { FormikHelpers, Formik, Form } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import useServiceStore from 'store/service'
import { getDefaultNextAttemptTime } from 'utils/date/nextAttempt'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

type PropsType = {
    onSubmit: (email: string, nextAttempt: number) => void
}

interface ResetPasswordForm<T> {
    email: T
}
const initialState: ResetPasswordForm<string> = {
    email: '',
}

type Values = typeof initialState

const schema = yupObject().shape({
    email: validation.string.email(true),
})

export const ResetYourPassword: FC<PropsType> = ({ onSubmit }) => {
    const authService = useServiceStore(state => state.authService)

    const mutation = useMutation(authService.password.sendCode, {
        async onSuccess(data, { email }) {
            onSubmit(email, getDefaultNextAttemptTime())
        },
        onError(error, { email }) {
            if (error instanceof HttpError) toast(error.message)
            if (error instanceof HttpError && error?.status === 409) onSubmit(email, 0)
        },
    })

    const submitForm = async (
        { email }: Values,
        { resetForm }: FormikHelpers<Values>
    ): Promise<void> => {
        await mutation.mutateAsync({ email })
        resetForm()
    }

    return (
        <Formik
            onSubmit={submitForm}
            validateOnMount
            validationSchema={schema}
            initialValues={initialState}
        >
            {() => (
                <Form>
                    <Input title="Your Email" name="email" />
                    <SubmitButton
                        type="submit"
                        className="mt-5 bg-cta shadow-button hover:bg-cta-600"
                    >
                        Continue
                    </SubmitButton>
                </Form>
            )}
        </Formik>
    )
}
