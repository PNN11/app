import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import { deleteCookie, getCookie } from 'cookies-next'
import { Form, Formik, FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { object as yupObject } from 'yup'

import Input from '../form/input'
import SubmitButton from '../form/submitButton'
import WrapperForm from '../form/wrapperForm'

import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { passwordRecoveryTokenKey } from 'utils/constants/auth'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

interface IUnChangedResetPassword {
    setIsChanged: Dispatch<SetStateAction<boolean>>
    email: string
}

const initialState = {
    password: '',
    confirmPassword: '',
}

type Values = typeof initialState

const schema = yupObject().shape({
    password: validation.string.password('password', true),
    confirmPassword: validation.string
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const ResetPassword: FC<IUnChangedResetPassword> = ({ setIsChanged, email }) => {
    const authService = useServiceStore(store => store.authService)

    const disconnect = useUserStore(state => state.disconnect)

    const confirmMutation = useMutation(authService.password.setNew, {
        onSuccess() {
            setIsChanged(true)
            disconnect()
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async (
        { password }: Values,
        { resetForm }: FormikHelpers<Values>
    ): Promise<void> => {
        await confirmMutation.mutateAsync({
            password,
            token: getCookie(passwordRecoveryTokenKey) as string,
        })
        resetForm()
    }

    useEffect(() => {
        const handler = (): void => deleteCookie(passwordRecoveryTokenKey)

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)

            handler()
        }
    }, [])

    return (
        <WrapperForm title="Reset your password">
            <Formik
                onSubmit={submitForm}
                validateOnMount
                validationSchema={schema}
                initialValues={initialState}
            >
                {() => (
                    <Form>
                        <p className="mb-5">
                            Thank, your email {email} has been successfully verified.
                        </p>
                        <Input
                            title="New password"
                            name="password"
                            type="password"
                            hint={
                                'Your password must contain one uppercase letter, one lowercase letter and a number.' +
                                ' Min password length is 8 characters.'
                            }
                        />
                        <Input
                            title="Confirm your password"
                            type="password"
                            name="confirmPassword"
                        />
                        <SubmitButton
                            type="submit"
                            className="mt-5 bg-cta shadow-button hover:bg-cta-600"
                        >
                            Confirm
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </WrapperForm>
    )
}

export default ResetPassword
