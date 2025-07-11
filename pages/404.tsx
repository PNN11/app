import { NextPage } from 'next'
import Link from 'next/link'

import SubmitButton from 'components/authorization/form/submitButton'

const NotFoundPage: NextPage = () => {
    return (
        <div className="min-h-screen px-5 text-center">
            <h1 className="pt-36 text-8xl font-bold 2xs:text-custom-9xl">404</h1>
            <h2 className="mb-20 text-5xl font-medium uppercase 2xs:text-custom-7xl">Error</h2>
            <p className="mb-1 text-2xl font-semibold uppercase">LOOKS LIKE YOU`RE LOST</p>
            <p className="mb-7 text-xl opacity-50">The page you are looking for not found</p>
            <Link className="inline-block" href="/">
                <SubmitButton className="py-2 px-3">Go to main page</SubmitButton>
            </Link>
        </div>
    )
}

export default NotFoundPage
