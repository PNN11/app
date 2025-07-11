import { FC, ReactNode } from 'react'

interface EcosystemInfoProps {
    children?: ReactNode
    title: string
    description: string
    className?: string
}

const EcosystemInfo: FC<EcosystemInfoProps> = ({
    children,
    description,
    title,
    className = '',
}) => {
    return (
        <div className={`order-1 lg:order-none lg:py-13 ${className}`}>
            <h2 className="mb-5 text-custom-2.5xl font-medium md:text-custom-5xl md:font-extrabold">
                {title}
            </h2>
            <div className="text-base text-base-200 md:text-xl">{description}</div>
            {children}
        </div>
    )
}

export default EcosystemInfo
