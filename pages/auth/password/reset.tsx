import { FC, useState } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'

import WrapperForm from '../../../components/authorization/form/wrapperForm'
import ArrowSvg from '../../../components/svg/arrowSvg'

import { CheckEmail } from 'components/authorization/reserPassword/checkEmail'
import { ResetYourPassword } from 'components/authorization/reserPassword/resetYourPassword'
import { Container } from 'components/common/wrappers/container'
import authService from 'services/api/auth'
import { passwordRecoveryTokenKey } from 'utils/constants/auth'
import { defaultNextAttemptDelay } from 'utils/date/nextAttempt'
import { HttpError } from 'utils/httpError'

interface ResetPasswordProps {
    email: string
    code: string
    requestFailed?: boolean
    nextAttempt?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ResetPassword: FC<ResetPasswordProps> = ({ code, email, requestFailed, nextAttempt }) => {
    const router = useRouter()
    const [emailAddress, setEmailAddress] = useState<string>(email)
    const [nextAttemptTime, setNextAttemptTime] = useState(Date.now() + nextAttempt)

    const handleChangeEmailAdress = (email: string, nextAttempt: number): void => {
        setEmailAddress(email)
        setNextAttemptTime(nextAttempt)
    }

    return (
        <Container>
            <WrapperForm
                title={
                    <div className="flex items-center gap-x-3">
                        <div onClick={() => router.back()}>
                            <ArrowSvg />
                        </div>
                        <p>Reset your password</p>
                    </div>
                }
            >
                {emailAddress ? (
                    <CheckEmail
                        nextAttempt={nextAttemptTime}
                        emailAddress={emailAddress}
                        code={code}
                    />
                ) : (
                    <ResetYourPassword onSubmit={handleChangeEmailAdress} />
                )}
            </WrapperForm>
        </Container>
    )
}

export const getServerSideProps = async ({
    query,
    req,
    res,
}: GetServerSidePropsContext): Promise<
    | { props: { email?: string; code?: string; requestFailed?: boolean; nextAttempt?: number } }
    | { redirect: { destination: string } }
> => {
    const { email = '', code = '' } = query

    const nextAttempt = defaultNextAttemptDelay

    if (email && !code) {
        try {
            await authService.password.sendCode({ email } as { email: string })
        } catch (error) {
            if (error instanceof HttpError && error.status === 409) {
                return { props: { email: email as string, nextAttempt } }
            }

            return { props: { requestFailed: true } }
        }
    }

    if (email && code) {
        try {
            const { accessToken } = await authService.password.confirm({ email, code } as {
                email: string
                code: string
            })

            if (accessToken) {
                setCookie(passwordRecoveryTokenKey, accessToken.token, { req, res })

                return {
                    redirect: {
                        destination: `/auth/password/new?email=${email}`,
                    },
                }
            }
        } catch (error) {
            return { props: { requestFailed: true } }
        }
    }

    return { props: { email, code, nextAttempt } as { email: string; code: string } }
}

export default ResetPassword
