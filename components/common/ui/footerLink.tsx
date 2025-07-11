import { FC, ReactNode } from 'react'

import Link from 'next/link'

interface FooterLinkProps {
    className?: string
    href: string
    children: ReactNode
}

const FooterLink: FC<FooterLinkProps> = ({ href, className = '', children }) => {
    return (
        <Link className={`block text-base font-medium ${className}`} href={href}>
            {children}
        </Link>
    )
}

export default FooterLink
