import { FC } from 'react'

interface BnbIconProps {
    className?: string
}

const BnbIcon: FC<BnbIconProps> = ({ className }) => {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M18.4247 8.76742L16.1934 10.9988L18.4247 13.2301L20.6561 10.9988L18.4247 8.76742Z"
                fill="currentColor"
            />
            <path
                d="M3.57707 8.76864L1.3457 11L3.57707 13.2314L5.80843 11L3.57707 8.76864Z"
                fill="currentColor"
            />
            <path
                d="M11 16.1941L7.30125 12.4953L5.07031 14.7262L11 20.6559L16.9297 14.7262L14.6987 12.4953L11 16.1941Z"
                fill="currentColor"
            />
            <path
                d="M11 5.80593L14.6987 9.50468L16.9297 7.27374L11 1.34406L5.07031 7.27374L7.30125 9.50468L11 5.80593Z"
                fill="currentColor"
            />
            <path
                d="M10.9983 8.79659L8.79492 11L10.9983 13.2034L13.2017 11L10.9983 8.79659Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default BnbIcon
