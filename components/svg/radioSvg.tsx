import { FC } from 'react'

type PropsType = {
    className?: string
    width?: number | string
    height?: number | string
    isSelected: boolean
}
const RadioSvg: FC<PropsType> = ({ width = 17, className, height = 18, isSelected }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 17 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="9" cy="9" r="5.5" stroke={`${isSelected ? '#FF5385' : '#97A2B4'}`} />
            <circle
                cx="9"
                cy="9"
                r="4"
                fill={`${isSelected ? '#FF5385' : '#97A2B4'}`}
                className={`${isSelected ? '' : 'hidden'}`}
            />
        </svg>
    )
}

export default RadioSvg
