import { FC, useEffect } from 'react'

import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Input from '../../../components/authorization/form/input'
import SubmitButton from '../../../components/authorization/form/submitButton'
import WrapperForm from '../../../components/authorization/form/wrapperForm'

import { Container } from 'components/common/wrappers/container'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { HttpError } from 'utils/httpError'
import { getRecaptchaToken } from 'utils/recaptcha/getToken'
import validation from 'validation/yup'

interface SignUpForm {
    email: string
}

interface Props {
    referral: string
}

const schema = yup.object().shape({
    email: validation.string.email(true),
})

const SignUp: FC<Props> = ({ referral }) => {
    const router = useRouter()

    const authService = useServiceStore(state => state.authService)
    const setAccessToken = useUserStore(store => store.setAccessToken)
    const setRefreshToken = useUserStore(store => store.setRefreshToken)

    const initialState: SignUpForm = {
        email: '',
    }

    const refferalValid = /\w\d{7}/.test(referral)

    const mutation = useMutation(authService.conferenceSignUp, {
        onSuccess(data) {
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            router.push('/profile')
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async ({ email }: SignUpForm): Promise<void> => {
        const token = await getRecaptchaToken({ action: 'SignUp' })
        const params: {
            email: string
            referralCode: string
            recaptcha: string
        } = {
            email,
            referralCode: referral,
            recaptcha: token,
        }

        await mutation.mutateAsync(params)
    }

    useEffect(() => {
        if (!refferalValid) toast('Refferal code is invalid, please check your link')
    }, [])

    return (
        <Container>
            <WrapperForm title="Sign up">
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form>
                            <Input
                                title="Enter your email to create an account"
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <SubmitButton
                                disabled={!refferalValid}
                                isLoading={mutation.isLoading}
                                type="submit"
                            >
                                Continue
                            </SubmitButton>
                            <div className="mt-5 flex flex-wrap justify-center gap-x-3">
                                <p>Already have an account?</p>
                                <Link href="/auth/sign-in">
                                    <p className="cursor-pointer font-medium text-link underline underline-offset-4">
                                        Sign in
                                    </p>
                                </Link>
                            </div>
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
