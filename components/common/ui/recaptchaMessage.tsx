import { FC } from 'react'

import Link from 'next/link'

const RecaptchaMessage: FC = () => {
    return (
        <div className="mt-2 text-center text-sm text-base-300">
            This site is protected by reCAPTCHA and the Google{' '}
            <Link
                target="_blank"
                className="text-link underline"
                href="https://policies.google.com/privacy"
            >
                Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
                target="_blank"
                className="text-link underline"
                href="https://policies.google.com/terms"
            >
                Terms of Service
            </Link>{' '}
            apply.
        </div>
    )
}

export default RecaptchaMessage
