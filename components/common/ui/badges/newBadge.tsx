import { FC, ReactNode } from 'react'

interface BadgeProps {
    className?: string
    children: ReactNode
}

const Badge: FC<BadgeProps> = ({ children, className = '' }) => {
    return <div className={`rounded-2.5 px-2 text-sm leading-6 ${className}`}>{children}</div>
}

export default Badge
