import { ReactNode, FC } from 'react'

interface NftInfoWrapperProps {
    children: ReactNode
    className?: string
}

const NftInfoWrapper: FC<NftInfoWrapperProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`grow rounded-b-xl bg-base-700 px-3 pt-1 pb-3 transition-all duration-300 group-hover:bg-base-600 sm:px-4 sm:pb-4 sm:pt-2 ${className}`}
        >
            {children}
        </div>
    )
}

export default NftInfoWrapper
