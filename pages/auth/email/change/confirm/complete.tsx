import { FC } from 'react'

import Link from 'next/link'

import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import { Container } from 'components/common/wrappers/container'

const ConfirmedEmailAddress: FC = () => {
    return (
        <Container>
            <WrapperForm title="Email changed successfully">
                <Link href="/auth/sign-in">
                    <SubmitButton className="mt-5 bg-cta shadow-button">Sign in</SubmitButton>
                </Link>
            </WrapperForm>
        </Container>
    )
}

export default ConfirmedEmailAddress
