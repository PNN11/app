import { FC, ReactNode } from 'react'

interface WarningBadgeProps {
    className?: string
    children: ReactNode
}

const WarningBadge: FC<WarningBadgeProps> = ({ children, className = '' }) => {
    return <div className={`rounded-xl bg-error/10 p-4 text-base ${className}`}>{children}</div>
}

export default WarningBadge
