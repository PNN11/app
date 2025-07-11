import { FC, ReactNode } from 'react'

interface TranslateWrapperProps {
    children: ReactNode
    className?: `group-hover/${string}:${string}`
}

const TranslateWrapper: FC<TranslateWrapperProps> = ({ children, className = '' }) => {
    return <div className={`h-full transition-all duration-300 ${className}`}>{children}</div>
}

export default TranslateWrapper
