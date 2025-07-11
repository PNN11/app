import { FC } from 'react'

type PropsType = {
    className?: string
    width?: string | number
    height?: string | number
    isActive?: boolean
}
const TransfersIcon: FC<PropsType> = ({ className, width = 21, height = 20, isActive }) => {
    return (
        <svg
            className={`${className} ${
                isActive ? 'stroke-base-100' : 'stroke-grey-bright group-hover:stroke-base-100'
            }`}
            width={width}
            height={height}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.5837 6.24992H4.25033M17.5837 6.24992L14.667 3.33325M17.5837 6.24992L14.667 9.16659M3.41699 13.7499H16.7503M3.41699 13.7499L6.33366 10.8333M3.41699 13.7499L6.33366 16.6666"
                stroke="currentColor"
                strokeWidth="1.38"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default TransfersIcon
