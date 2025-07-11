import { FC } from 'react'

interface SwapArrowProps {
    className?: string
}

const SwapArrow: FC<SwapArrowProps> = ({ className }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M4.71039 3.19995V12.9326M4.71039 3.19995L2.40039 5.53578M4.71039 3.19995L7.02039 5.53578M11.2904 13.6V3.86733M11.2904 13.6L8.98039 11.2641M11.2904 13.6L13.6004 11.2641"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default SwapArrow
