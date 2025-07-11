import { FC, ReactNode } from 'react'

interface EcosystemWrapperProps {
    children: ReactNode
    className?: string
}

const EcosystemWrapper: FC<EcosystemWrapperProps> = ({ children, className = '' }) => {
    return (
        <div
            className={`grid gap-6 rounded-8 bg-base-800 px-5 py-8 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-0 ${className}`}
            data-aos="fade-zoom-in"
        >
            {children}
        </div>
    )
}

export default EcosystemWrapper
