import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import { Container } from 'components/common/wrappers/container'
import ArrowSvg from 'components/svg/arrowSvg'
import { useTimer } from 'hooks/useTimer'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { getDefaultNextAttemptTime } from 'utils/date/nextAttempt'
import { HttpError } from 'utils/httpError'
import { timeFormat } from 'utils/timer/timeFormat'
import validation from 'validation/yup'

interface Props {
    code: string
}

type ConfirmForm = {
    code: string
}
const schema = yupObject().shape({
    code: validation.string.required(),
})

const ConfirmEmailAddress: FC<Props> = ({ code }) => {
    const router = useRouter()
    const { email, nextAttemptTime } = router.query
    const { timer, setTimestamp } = useTimer(Number(nextAttemptTime))
    const setEmailChangeToken = useUserStore(state => state.setEmailChangeToken)

    const authService = useServiceStore(store => store.authService)

    const sendCodeForEmailChange = useMutation(authService.email.sendCodeForChange, {
        async onSuccess() {
            setTimestamp(getDefaultNextAttemptTime())
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const confirm = useMutation(authService.email.confirmChange, {
        onSuccess(data) {
            setEmailChangeToken(data?.accessToken)
            router.push('/auth/email/change')
        },
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const onResendClick = async (): Promise<void> => {
        sendCodeForEmailChange.mutate({})
    }

    const submitForm = async (
        { code }: ConfirmForm,
        { resetForm }: FormikHelpers<ConfirmForm>
    ): Promise<void> => {
        await confirm.mutateAsync({ code, email: email as string })

        resetForm()
    }

    return (
        <Container>
            <WrapperForm
                title={
                    <div className="flex items-center gap-x-3">
                        <div onClick={() => router.back()}>
                            <ArrowSvg />
                        </div>
                        <p>Change email</p>
                    </div>
                }
            >
                <div className="text-sm">
                    <p className="pb-4">Check your email {email} for code to change your email.</p>
                    <Formik
                        onSubmit={submitForm}
                        validateOnMount
                        initialValues={{ code }}
                        validationSchema={schema}
                    >
                        {() => (
                            <Form>
                                <Input title="Code" name="code" />
                                <SubmitButton type="submit" className="mb-3 mt-5">
                                    Continue
                                </SubmitButton>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-custom-base md:whitespace-nowrap md:text-center">
                        Didn&apos;t get the email? Check your spam folder or resend.
                        {timer > 0 ? (
                            <span className="ml-2 font-medium text-link">
                                Resend {timeFormat(timer)}
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={onResendClick}
                                className="ml-2 font-medium text-link underline"
                            >
                                Resend
                            </button>
                        )}
                    </p>
                </div>
            </WrapperForm>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { code = '' } = context.query

    return { props: { code } }
}

export default ConfirmEmailAddress
