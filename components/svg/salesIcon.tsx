import { FC } from 'react'

type PropsType = {
    className?: string
    width?: string | number
    height?: string | number
    isActive?: boolean
}
const SalesIcon: FC<PropsType> = ({ className, width = 21, height = 20, isActive }) => {
    return (
        <svg
            className={`${className} ${
                isActive ? 'fill-base-100' : 'fill-grey-bright group-hover:fill-base-100'
            }`}
            width={width}
            height={height}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.5 3H3.74441C4.10428 3 4.28421 3 4.43049 3.06525C4.55945 3.12277 4.66961 3.21543 4.74837 3.33262C4.83772 3.46556 4.86855 3.64283 4.93021 3.99738L5.21465 5.63288M5.21465 5.63288L5.87891 9.45239C6.0137 10.2274 6.08109 10.6149 6.28069 10.8941C6.45644 11.1399 6.70213 11.3271 6.98576 11.4313C7.30789 11.5496 7.69939 11.5117 8.48239 11.436L15.7502 10.7326C16.5143 10.6587 16.8964 10.6217 17.1856 10.4498C17.4437 10.2963 17.65 10.0691 17.7779 9.79735C17.9212 9.49299 17.9212 9.10911 17.9212 8.34137V8.34137C17.9212 7.52542 17.9212 7.11744 17.7648 6.80184C17.6254 6.52032 17.4013 6.28952 17.1241 6.14181C16.8132 5.97621 16.4054 5.96414 15.5898 5.94L5.21465 5.63288Z"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1.38"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="8.14318"
                cy="15.4122"
                r="1.5045"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1.38"
            />
            <circle
                cx="15.2887"
                cy="15.4122"
                r="1.5045"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="1.38"
            />
        </svg>
    )
}

export default SalesIcon
