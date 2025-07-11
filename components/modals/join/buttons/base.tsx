import { FC } from 'react'

import Link from 'next/link'

type Props = {
    children?: React.ReactNode
    Icon: FC
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const BaseButton: FC<Props> = ({ href, Icon, className, children }) => {
    return (
        <Link
            href={href}
            className={`flex w-full grow basis-[max-content] items-center justify-center gap-2.5 rounded-2xl py-3 px-8 ${className}`}
        >
            <div className="flex h-6 w-6 items-center justify-center">
                <Icon />
            </div>
            <span className="text-lg leading-5">{children}</span>
        </Link>
    )
}
