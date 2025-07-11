import { FC } from 'react'

type PropsType = {
    className?: string
}
const MediumIcon: FC<PropsType> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2127_10852)">
                <path
                    d="M20.0374 17.8277C20.0374 21.5984 17.0069 24.6552 13.2688 24.6552C9.53073 24.6552 6.5 21.5977 6.5 17.8277C6.5 14.0577 9.5305 11 13.2688 11C17.0072 11 20.0374 14.057 20.0374 17.8277Z"
                    fill="#FCFCFC"
                />
                <path
                    d="M27.4622 17.8277C27.4622 21.377 25.947 24.2554 24.0778 24.2554C22.2086 24.2554 20.6934 21.377 20.6934 17.8277C20.6934 14.2783 22.2084 11.3999 24.0776 11.3999C25.9467 11.3999 27.462 14.2774 27.462 17.8277"
                    fill="#FCFCFC"
                />
                <path
                    d="M30.4995 17.8276C30.4995 21.0069 29.9667 23.5858 29.3092 23.5858C28.6517 23.5858 28.1191 21.0076 28.1191 17.8276C28.1191 14.6476 28.652 12.0693 29.3092 12.0693C29.9665 12.0693 30.4995 14.6473 30.4995 17.8276Z"
                    fill="#FCFCFC"
                />
            </g>
            <rect
                x="0.611111"
                y="0.611111"
                width="34.7778"
                height="34.7778"
                rx="11.3889"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1.22222"
            />
            <defs>
                <clipPath id="clip0_2127_10852">
                    <rect width="24" height="24" fill="white" transform="translate(6.5 6)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default MediumIcon
