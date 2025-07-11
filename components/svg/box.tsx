import { FC } from 'react'

interface BoxIconProps {
    className?: string
}

const BoxIcon: FC<BoxIconProps> = ({ className = '' }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12 1.5L21 6.5V17.5L12 22.5L3 17.5V6.5L12 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 11.5L21 6.5M12 11.5L3 6.5M12 11.5V22.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default BoxIcon
