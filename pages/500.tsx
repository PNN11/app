import { NextPage } from 'next'
import Link from 'next/link'

import SubmitButton from 'components/authorization/form/submitButton'

const NotFoundPage: NextPage = () => {
    return (
        <div className="min-h-screen px-5 text-center">
            <h1 className="pt-36 text-8xl font-bold 2xs:text-custom-9xl">500</h1>
            <h2 className="text-5xl font-medium uppercase 2xs:text-custom-7xl">Server</h2>
            <h2 className="mb-20 text-5xl font-medium uppercase 2xs:text-custom-7xl">Error</h2>
            <Link className="inline-block w-32" href="/">
                <SubmitButton className="py-2 px-3">Go to home</SubmitButton>
            </Link>
        </div>
    )
}

export default NotFoundPage
