import { FC } from 'react'

import Link from 'next/link'

import SubmitButton from '../form/submitButton'
import WrapperForm from '../form/wrapperForm'

const ChangedResetPassword: FC = () => {
    return (
        <WrapperForm title={<div className="text-center">New password set successfully</div>}>
            <Link href="/auth/sign-in">
                <SubmitButton className="bg-pink-brightly shadow-shadowButton mt-5">
                    Sign in
                </SubmitButton>
            </Link>
        </WrapperForm>
    )
}

export default ChangedResetPassword
