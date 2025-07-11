import { FC } from 'react'

import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import Input from 'components/authorization/form/input'
import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import { Container } from 'components/common/wrappers/container'
import ArrowSvg from 'components/svg/arrowSvg'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

interface ChangeEmailForm<T> {
    email: T
}

const initialState: ChangeEmailForm<string> = {
    email: '',
}

type Values = typeof initialState

const schema = yupObject().shape({
    email: validation.string.email(true),
})

type PropsType = {
    profileEmail: string
}

const ChangeEmail: FC<PropsType> = ({ profileEmail }) => {
    const { push, back } = useRouter()
    const disconnect = useUserStore(state => state.disconnect)
    const emailChangeToken = useUserStore(state => state.emailChangeToken)

    const authService = useServiceStore(state => state.authService)

    const change = useMutation(authService.email.change, {
        onSuccess(data, { email }) {
            push({ pathname: '/auth/email/change/confirm/complete', query: { email } })
            disconnect()
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async ({ email }: Values): Promise<void> => {
        await change.mutateAsync({ email, accessToken: emailChangeToken?.token })
    }

    return (
        <Container>
            <WrapperForm
                title={
                    <div className="flex items-center gap-x-3">
                        <div onClick={() => back()}>
                            <ArrowSvg />
                        </div>
                        <p>Change email</p>
                    </div>
                }
            >
                <Formik
                    onSubmit={submitForm}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={{ email: profileEmail }}
                >
                    {() => (
                        <Form>
                            <Input title="Enter new email" type="email" name="email" />
                            <SubmitButton type="submit" className="mt-5 mb-3">
                                Confirm
                            </SubmitButton>
                        </Form>
                    )}
                </Formik>
            </WrapperForm>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { email = '' } = context.query

    return { props: { profileEmail: email } }
}

export default ChangeEmail
