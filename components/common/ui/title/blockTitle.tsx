import { FC, ReactNode } from 'react'

interface BlockTitleProps {
    className?: string
    children: ReactNode
}

const BlockTitle: FC<BlockTitleProps> = ({ children, className = '' }) => {
    return <h5 className={`mb-4 text-custom-3xl font-medium ${className}`}>{children}</h5>
}

export default BlockTitle
