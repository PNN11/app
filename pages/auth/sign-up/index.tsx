import { FC } from 'react'

import { AxiosError } from 'axios'
import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Checkbox from '../../../components/authorization/form/checkbox'
import Input from '../../../components/authorization/form/input'
import SubmitButton from '../../../components/authorization/form/submitButton'
import WrapperForm from '../../../components/authorization/form/wrapperForm'

import RecaptchaMessage from 'components/common/ui/recaptchaMessage'
import { Container } from 'components/common/wrappers/container'
import useServiceStore from 'store/service'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'
import { getRecaptchaToken } from 'utils/recaptcha/getToken'
import validation from 'validation/yup'

interface SignUpForm {
    referralCode: string
    email: string
    name: string
    password: string
    confirmPassword: string
    subscribe: boolean
}

interface Props {
    referral: string
}

const schema = yup.object().shape({
    email: validation.string.email(true),
    name: validation.string.name('name', true),
    password: validation.string.password('password', true),
    confirmPassword: validation.string
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const SignUp: FC<Props> = ({ referral }) => {
    const router = useRouter()

    const authService = useServiceStore(state => state.authService)

    const initialState: SignUpForm = {
        referralCode: referral || '',
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
    }

    const sendCodeMutation = useMutation(authService.email.sendCode, {
        async onSuccess(data, variables) {
            router.push(`/auth/email/confirm?email=${variables.email}`)
        },
        onError(error: HttpError) {
            toast(error.message)
        },
    })
    const mutation = useMutation(authService.signUp, {
        onSuccess(data, variables) {
            sendAnalyticsEvent({
                event: 'registration',
                options: { method: 'email' },
            })

            sendCodeMutation.mutate({ email: variables.email })
        },
        onError(error) {
            const err = error as AxiosError

            toast(err.message)
        },
    })

    const submitForm = async ({
        password,
        email,
        name,
        referralCode,
        subscribe,
    }: SignUpForm): Promise<void> => {
        const token = await getRecaptchaToken({ action: 'SignUp' })
        const params: {
            email: string
            user: { password: string; name: string }
            referralCode?: string
            isSubscribeNewsletter: boolean
            recaptcha: string
        } = {
            email,
            user: { password, name },
            isSubscribeNewsletter: subscribe,
            recaptcha: token,
        }

        if (referralCode) {
            params.referralCode = referralCode
        }

        await mutation.mutateAsync(params)
    }

    return (
        <Container>
            <WrapperForm
                title="Sign up"
                classes={{
                    root: 'min-h-screen pt-28 pb-14 landscape:pt-5 landscape:lg:pt-28',
                }}
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form>
                            <Input
                                title="Referral code (optional)"
                                name="referralCode"
                                disabled={!!referral}
                            />
                            <Input
                                title="Your Email"
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <Input title="User Name" name="name" autoComplete="username" />
                            <Input
                                title="Your password"
                                type="password"
                                name="password"
                                hint={
                                    'Your password must contain one uppercase letter, one lowercase letter and a number.' +
                                    ' Min password length is 8 characters.'
                                }
                            />
                            <Input
                                title="Confirm your password"
                                type="password"
                                name="confirmPassword"
                                className="mb-0"
                            />
                            <Checkbox
                                label="Subscribe to email newsletter"
                                id="subscribe"
                                name="subscribe"
                                classes={{ container: 'my-[1.4375rem]' }}
                            />
                            <SubmitButton isLoading={mutation.isLoading} type="submit">
                                Register
                            </SubmitButton>
                            {/* <GoogleAuthButton title="Sign up with Google" /> */}

                            <div className="mt-5 flex flex-wrap justify-center gap-x-3">
                                <p>Already have an account?</p>
                                <Link href="/auth/sign-in">
                                    <p className="cursor-pointer font-medium text-link underline underline-offset-4">
                                        Sign in
                                    </p>
                                </Link>
                            </div>
                            <RecaptchaMessage />
                        </Form>
                    )}
                </Formik>
            </WrapperForm>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: any }> => {
    const { referral = '' } = context.query

    return { props: { referral } }
}

export default SignUp
