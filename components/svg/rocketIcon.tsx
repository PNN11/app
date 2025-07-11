import { FC } from 'react'

interface RocketIconProps {
    className?: string
}

const RocketIcon: FC<RocketIconProps> = ({ className }) => {
    return (
        <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11.8781 8.02154H8.24204L4 12.2442H9.20844M15.8865 18.8157C15.1856 19.0753 14.4462 19.2713 13.6711 19.4009L8.64604 14.456C9.65605 8.02154 15.3121 4 23.9982 4C24.0859 11.607 21.0194 16.915 15.8865 18.8157ZM15.8865 18.8157L15.9463 24L20.1393 19.7292L20.0976 16.11"
                stroke="currentColor"
            />
            <circle cx="16.5" cy="11.5" r="2" stroke="currentColor" />
            <path
                d="M7.33333 16.5C5.25022 19 8.16675 21.9167 10.6668 19.9841"
                stroke="currentColor"
            />
        </svg>
    )
}

export default RocketIcon
