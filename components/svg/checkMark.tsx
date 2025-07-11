import { FC } from 'react'

interface Props {
    className?: string
}

const CheckMark: FC<Props> = ({ className = '' }) => {
    return (
        <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g clipPath="url(#clip0_7639_63510)">
                <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                <path
                    d="M15 25.2727L22.7647 34L37 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_7639_63510">
                    <rect width="52" height="52" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default CheckMark
