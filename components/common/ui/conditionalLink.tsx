import { AnchorHTMLAttributes } from 'react'

import Link, { LinkProps } from 'next/link'

type Props = {
    condition: boolean
    className?: string
    children: React.ReactNode | React.ReactNode[]
} & LinkProps &
    AnchorHTMLAttributes<HTMLAnchorElement>

export const ConditionalLink: React.FC<Props> = ({ condition, children, ...rest }) => {
    if (condition) return <Link {...rest}>{children}</Link>

    return <span {...rest}>{children}</span>
}
