import { FC } from 'react'

import { setCookie } from 'cookies-next'
import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Input from '../form/input'

import SubmitButton from 'components/authorization/form/submitButton'
import { useTimer } from 'hooks/useTimer'
import useServiceStore from 'store/service'
import { passwordRecoveryTokenKey } from 'utils/constants/auth'
import { getDefaultNextAttemptTime } from 'utils/date/nextAttempt'
import { HttpError } from 'utils/httpError'
import { timeFormat } from 'utils/timer/timeFormat'

type CheckEmailPropsType = {
    emailAddress: string
    code: string
    nextAttempt?: number
}

type CheckEmailForm = {
    code: string
}

const schema = yup.object().shape({
    code: yup.string().matches(/\d+/, 'Please enter valid code'),
})

export const CheckEmail: FC<CheckEmailPropsType> = ({ emailAddress, code, nextAttempt }) => {
    const { timer, setTimestamp } = useTimer(nextAttempt)
    const authService = useServiceStore(state => state.authService)

    const router = useRouter()

    const confirmMutation = useMutation(authService.password.confirm, {
        onSuccess(data) {
            setCookie(passwordRecoveryTokenKey, data.accessToken.token)
            router.push(`/auth/password/new?email=${emailAddress}`)
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const resendMutation = useMutation(authService.password.sendCode, {
        onSuccess() {
            setTimestamp(getDefaultNextAttemptTime())
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const initialState: CheckEmailForm = {
        code,
    }

    const submitForm = async (
        { code }: CheckEmailForm,
        { resetForm }: FormikHelpers<CheckEmailForm>
    ): Promise<void> => {
        await confirmMutation.mutateAsync({ code, email: emailAddress })
        resetForm()
    }
    const onResendClick = (): void => {
        resendMutation.mutate({ email: emailAddress })
    }

    return (
        <div className="flex flex-col justify-center gap-4 text-sm">
            <p>Check your email {emailAddress} for code to reset your password.</p>
            <Formik
                onSubmit={submitForm}
                validateOnMount
                validationSchema={schema}
                initialValues={initialState}
            >
                {() => (
                    <Form>
                        <Input title="Code" name="code" />
                        <SubmitButton
                            type="submit"
                            className="bg-cta shadow-button hover:bg-cta-600"
                        >
                            Continue
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
            <div className="text-custom-base md:whitespace-nowrap md:text-center">
                Didn&apos;t get the email? Check your spam folder or resend.
                {Date.now() < timer + Date.now() ? (
                    <span className="ml-2 font-medium text-link">Resend {timeFormat(timer)}</span>
                ) : (
                    <button
                        type="button"
                        className="ml-2 cursor-pointer font-medium text-link underline"
                        onClick={onResendClick}
                    >
                        Resend
                    </button>
                )}
            </div>
        </div>
    )
}
