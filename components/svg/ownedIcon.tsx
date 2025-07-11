import { FC } from 'react'

type PropsType = {
    className?: string
    width?: string | number
    height?: string | number
    isActive?: boolean
}

export const OwnedIcon: FC<PropsType> = ({ className, width = 20, height = 20, isActive }) => {
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
                d="M5.625 3.125H14.375L18.75 8.125L10 17.5L1.25 8.125L5.625 3.125Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-base-100"
            />
            <path
                d="M13.8345 8.125L9.9993 17.5L6.16406 8.125L9.9993 3.125L13.8345 8.125Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-base-100"
            />
            <path
                d="M1.25 8.125H18.75"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-base-100"
            />
        </svg>
    )
}
