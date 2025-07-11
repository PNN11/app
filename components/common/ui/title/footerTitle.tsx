import { FC, ReactNode } from 'react'

interface FooterTitleProps {
    className?: string
    children: ReactNode
}

const FooterTitle: FC<FooterTitleProps> = ({ children, className = '' }) => {
    return <h5 className={`mb-2 text-lg leading-5 text-base-200 ${className}`}>{children}</h5>
}

export default FooterTitle
