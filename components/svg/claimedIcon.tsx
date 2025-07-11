import { FC } from 'react'

type PropsType = {
    className?: string
    width?: string | number
    height?: string | number
    isActive?: boolean
}

export const ClaimedIcon: FC<PropsType> = ({ className, width = 20, height = 20, isActive }) => {
    return (
        <svg
            className={`${className} ${isActive ? 'stroke-base-100' : 'stroke-grey-bright'}`}
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 9.99999C3 13.6819 5.98477 16.6667 9.66667 16.6667C13.3486 16.6667 16.3333 13.6819 16.3333 9.99999C16.3333 6.3181 13.3486 3.33333 9.66667 3.33333C7.82573 3.33333 6.15907 4.07951 4.95264 5.28593L4.23858 5.99999M4.23858 5.99999V3M4.23858 5.99999H7.24004"
                stroke="currentColor"
                strokeWidth="1.38"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-base-100"
            />
            <path
                d="M9.66602 6.33301V9.99967L11.666 11.9997"
                stroke="currentColor"
                strokeWidth="1.38"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-base-100"
            />
        </svg>
    )
}
