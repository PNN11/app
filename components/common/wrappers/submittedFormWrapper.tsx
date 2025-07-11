import { FC, ReactNode } from 'react'

import Link from 'next/link'

import SmallButton from '../ui/buttons/newSmallButton'

import WrapperForm from 'components/authorization/form/wrapperForm'

interface Props {
    children: ReactNode
    submittedComponent: JSX.Element
    submitted: boolean
}

const SubmittedFormWrapper: FC<Props> = ({ children, submittedComponent, submitted }) => {
    if (!submitted) return <div>{children}</div>

    return (
        <WrapperForm classes={{ container: 'mt-10' }} title={submittedComponent}>
            <Link className="block w-full" href="/">
                <SmallButton className="w-full">Go to Main page</SmallButton>
            </Link>
        </WrapperForm>
    )
}

export default SubmittedFormWrapper
