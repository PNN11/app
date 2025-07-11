import { ReactNode, FC } from 'react'

interface PageWrapperProps {
    className?: string
    children: ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
    return <div className={`${className}`}>{children}</div>
}

export default PageWrapper
