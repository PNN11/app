import { FC } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import Checkbox from '../../../components/authorization/form/checkbox'
import Input from '../../../components/authorization/form/input'
import SubmitButton from '../../../components/authorization/form/submitButton'
import WrapperForm from '../../../components/authorization/form/wrapperForm'
import ArrowSvg from '../../../components/svg/arrowSvg'

import { Container } from 'components/common/wrappers/container'
import useServiceStore from 'store/service'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

interface Props {
    email: string
}

interface SignUpWithGoogleForm {
    email: string
    name: string
    password: string
    confirmPassword: string
    subscribe: boolean
}

const schema = yup.object().shape({
    email: validation.string.email(true),
    name: validation.string.name('name', true),
    password: validation.string.password('password', true),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const SignUpWithGoogle: FC<Props> = ({ email }) => {
    const { back, push } = useRouter()

    const authService = useServiceStore(state => state.authService)

    const initialState: SignUpWithGoogleForm = {
        email,
        name: '',
        password: '',
        confirmPassword: '',
        subscribe: false,
    }

    const submitForm = async (
        { email, name, password }: SignUpWithGoogleForm,
        { resetForm }: FormikHelpers<SignUpWithGoogleForm>
    ): Promise<void> => {
        try {
            await authService.signUp({
                email,
                user: { password, name },
            })
        } catch (error) {
            if (error instanceof HttpError) toast(error.message)
        }

        resetForm()
        push('/auth/sign-in')
    }

    return (
        <Container>
            <WrapperForm
                title={
                    <div className="flex items-center gap-x-3">
                        <div onClick={() => back()}>
                            <ArrowSvg />
                        </div>
                        <p>Sign up</p>
                    </div>
                }
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form>
                            <Input title="Your Email" type="email" name="email" disabled />
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
                            <SubmitButton className="mt-5 mb-3 bg-cta shadow-button hover:bg-cta-600">
                                Continue
                            </SubmitButton>
                            <div className="mt-5 flex justify-center gap-x-3">
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
    const { email = '' } = context.query

    return { props: { email } }
}

export default SignUpWithGoogle
