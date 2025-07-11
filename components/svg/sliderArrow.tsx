import { FC } from 'react'

interface SliderArrowProps {
    className?: string
}

const SliderArrow: FC<SliderArrowProps> = ({ className = '' }) => {
    return (
        <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M19 13L25 7M25 7L19 1M25 7L1 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default SliderArrow
