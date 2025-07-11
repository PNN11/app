import { FC } from 'react'

type PropsType = {
    width?: number
    height?: number
    className?: string
}
const CLockIcon: FC<PropsType> = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="10" stroke="#97A2B4" strokeWidth="1.44" />
            <path
                d="M12 6.5V12L15 15"
                stroke="#97A2B4"
                strokeWidth="1.44"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CLockIcon
