import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import { Container } from 'components/common/wrappers/container'

const ConfirmedEmailAddress: FC = () => {
    const { query } = useRouter()

    return (
        <Container>
            <WrapperForm title="Confirm your email address">
                <>
                    <p className="text-sm">Email {query.email} confirmed successfully</p>
                    <Link href="/auth/sign-in">
                        <SubmitButton type="submit" className="mt-4">
                            Sign in
                        </SubmitButton>
                    </Link>
                </>
            </WrapperForm>
        </Container>
    )
}

export default ConfirmedEmailAddress
