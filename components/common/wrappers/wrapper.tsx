import { FC, ReactNode } from 'react'

interface WelcomeCardWrapperProps {
    className?: string
    animationDelay?: number
    children: ReactNode
}

const CardWithBorderWrapper: FC<WelcomeCardWrapperProps> = ({
    animationDelay = 0,
    className = '',
    children,
}) => {
    return (
        <div
            className={`h-full rounded-xl border border-base-700 ${className}`}
            data-aos="fade-up"
            data-aos-delay={animationDelay}
        >
            {children}
        </div>
    )
}

export default CardWithBorderWrapper
