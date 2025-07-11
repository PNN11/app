import { ComponentProps, FC } from 'react'

import Link from 'next/link'

import ExternalIcon from 'components/svg/external'

interface IExternalInlineLink extends ComponentProps<typeof Link> {
    children: string
    className?: string
    href: string
}

const ExternalInlineLink: FC<IExternalInlineLink> = ({
    children,
    className = '',
    href,
    target,
}) => {
    return (
        <Link
            href={href}
            target={target}
            className={`flex items-center gap-x-1 text-custom-xs text-cta ${className}`}
        >
            <ExternalIcon />
            <p>{children}</p>
        </Link>
    )
}

export default ExternalInlineLink
