import { FC, useEffect, useState } from 'react'

import { deleteCookie, setCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'

import ChangedResetPassword from 'components/authorization/resetPasswordFromEmail/changedResetPassword'
import ResetPassword from 'components/authorization/resetPasswordFromEmail/resetPassword'
import { Container } from 'components/common/wrappers/container'
import { passwordRecoveryTokenKey } from 'utils/constants/auth'

interface Props {
    email: string
    token: string
}

const ResetPasswordFromEmail: FC<Props> = ({ email, token }) => {
    const [isChanged, setIsChanged] = useState<boolean>(false)

    useEffect(() => {
        if (token) setCookie(passwordRecoveryTokenKey, token)
    }, [token])

    return (
        <Container>
            {isChanged ? (
                <ChangedResetPassword />
            ) : (
                <ResetPassword email={email} setIsChanged={setIsChanged} />
            )}
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
    const { email = '' } = query

    const token = req.cookies[passwordRecoveryTokenKey]

    if (!token) {
        return { redirect: { destination: '/auth/password/reset', permanent: false } }
    }

    deleteCookie(passwordRecoveryTokenKey, { req, res })

    return { props: { email: email as string, token } }
}

export default ResetPasswordFromEmail
