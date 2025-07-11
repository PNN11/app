import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface BadgeProps {
    className?: string
    children: ReactNode
}

const Tag: FC<BadgeProps> = ({ children, className = '' }) => {
    return (
        <div
            className={twMerge(
                'rounded bg-success-100 px-1.25 text-xs tracking-wide text-bg',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Tag
