import { FC } from 'react'

type PropsType = {
    className?: string
    width?: string | number
    height?: string | number
    isActive?: boolean
}

const BidIcon: FC<PropsType> = ({ className, width = 20, height = 20, isActive }) => {
    return (
        <svg
            className={`${className} ${
                isActive ? 'stroke-base-100' : 'stroke-grey-bright group-hover:stroke-base-100'
            }`}
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14 6V5C14 3.89543 13.1046 3 12 3H6C4.89543 3 4 3.89543 4 5V12.3333C4 13.4379 4.89543 14.3333 6 14.3333H9.33333"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <ellipse cx="14" cy="10" rx="2" ry="2" stroke="currentColor" strokeWidth="1.2" />
            <path
                d="M14.0007 13.667C12.7354 13.667 12.0704 14.2674 11.721 14.8984C11.3197 15.6231 12.0056 16.3337 12.834 16.3337H15.1673C15.9957 16.3337 16.6816 15.6231 16.2803 14.8984C15.9309 14.2674 15.2659 13.667 14.0007 13.667Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66602 5.66699H11.3327"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66602 8L9.33268 8"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default BidIcon
