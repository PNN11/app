import { FC } from 'react'

import { setCookie } from 'cookies-next'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import RecaptchaMessage from 'components/common/ui/recaptchaMessage'
import { Container } from 'components/common/wrappers/container'
import useDetectViewInterface from 'hooks/useDetectViewInterface'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { accessTokenKey, refreshTokenKey } from 'utils/constants/auth'
import { HttpError } from 'utils/httpError'
import { getRecaptchaToken } from 'utils/recaptcha/getToken'
import { webViewSignIn } from 'utils/webview/sign-in'
import { isValidEmail } from 'validation/email'
import validation from 'validation/yup'

interface SignInForm<T> {
    email: T
    password: T
}
const initialState: SignInForm<string> = {
    email: '',
    password: '',
}

type Values = typeof initialState

const schema = yupObject().shape({
    email: validation.string.trimmed(true),
    password: validation.string.trimmed(true),
})

const SignIn: FC = () => {
    const router = useRouter()

    const viewInterface = useDetectViewInterface()

    const authService = useServiceStore(store => store.authService)
    const setAccessToken = useUserStore(store => store.setAccessToken)
    const setRefreshToken = useUserStore(store => store.setRefreshToken)
    const setAuthState = useAuthStore(state => state.setAuthState)

    const mutation = useMutation(authService.signIn, {
        onSuccess(data) {
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            setAuthState({ isAuth: true })

            setCookie(refreshTokenKey, data.refreshToken.token, {
                expires: new Date(data.refreshToken.expiresIn),
            })
            setCookie(accessTokenKey, data.accessToken.token, {
                expires: new Date(data.accessToken.expiresIn),
            })

            webViewSignIn({ accessToken: data.accessToken, refreshToken: data.refreshToken })

            if (router.query.referer) {
                const url = new URL(router.query.referer as string, window.location.href)
                const isRelative = window.location.origin === url.origin

                if (isRelative) {
                    router.push(url.pathname)

                    return
                }
            }

            router.push('/profile')
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async (values: Values): Promise<void> => {
        const token = await getRecaptchaToken({ action: 'SignIn' })

        mutation.mutate({ username: values.email, password: values.password, recaptcha: token })
    }

    return (
        <Container>
            <WrapperForm
                title="Sign in"
                classes={{
                    root: `min-h-screen pt-28 pb-14 landscape:pt-5 landscape:lg:pt-28 transition-opacity duration-300 ${
                        viewInterface ? 'opacity-100' : 'opacity-0'
                    }`,
                }}
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {formik => (
                        <Form>
                            <Input title="Username or email" name="email" />
                            <Input
                                title="Your password"
                                type="password"
                                name="password"
                                className="mb-0"
                            >
                                <Link
                                    href={
                                        isValidEmail(formik.values.email)
                                            ? `password/reset?email=${formik.values.email}`
                                            : 'password/reset'
                                    }
                                >
                                    <p className="cursor-pointer text-end text-2xs font-medium text-link underline underline-offset-4 2xs:text-base">
                                        Forgot your password?
                                    </p>
                                </Link>
                            </Input>
                            <SubmitButton isLoading={mutation.isLoading} type="submit">
                                Continue
                            </SubmitButton>
                            {/* <GoogleAuthButton /> */}
                            <div className="mt-3 flex flex-wrap justify-center gap-x-3">
                                <p>Don&apos;t have an account yet?</p>
                                <Link href="/auth/sign-up">
                                    <p className="cursor-pointer font-medium text-link underline underline-offset-4">
                                        Sign up
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

export default SignIn
