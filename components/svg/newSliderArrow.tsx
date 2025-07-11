import { FC } from 'react'

interface SliderArrowProps {
    className?: string
}

const SliderArrow: FC<SliderArrowProps> = ({ className = '' }) => {
    return (
        <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M1.4545 0.909088L8.54541 8L1.4545 15.0909"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default SliderArrow
