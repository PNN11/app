import { FC } from 'react'

type PropsType = {
    width?: number
    height?: number
    className?: string
}
const CloseSvg: FC<PropsType> = ({ width = 24, height = 24, className = '' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M5 5L12 12M12 12L19 19M12 12L19 5M12 12L5 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CloseSvg
