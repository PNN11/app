import { FC } from 'react'

type PropsType = { width?: number; height?: number; className?: string; stroke?: string }
export const PaginationArrow: FC<PropsType> = ({
    width = 16,
    height = 16,
    className,
    stroke = 'white',
    ...props
}) => {
    return (
        <svg
            {...props}
            width={width}
            height={height}
            className={className}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 6L8 10L4 6"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
