import { FC } from 'react'

interface IArrowSvg {
    className?: string
}

const ArrowSvg: FC<IArrowSvg> = ({ className = '' }) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`cursor-pointer ${className}`}
        >
            <path
                d="M4 16H28M4 16L12 8M4 16L12 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ArrowSvg
