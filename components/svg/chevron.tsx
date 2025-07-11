import { FC } from 'react'

interface ChevronProps {
    className?: string
}

const Chevron: FC<ChevronProps> = ({ className = '' }) => {
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
                d="M7.19995 14.3999L12 9.5999L16.8 14.3999"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default Chevron
