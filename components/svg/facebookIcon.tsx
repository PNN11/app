import { FC } from 'react'

interface FacebookIconProps {
    className?: string
}

const FacebookIcon: FC<FacebookIconProps> = ({ className }) => {
    return (
        <svg
            width="16"
            height="30"
            viewBox="0 0 16 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M14.9516 16.7476L15.7808 11.3592H10.5936V7.86408C10.5936 6.38956 11.3169 4.95146 13.6402 4.95146H16V0.364078C16 0.364078 13.8594 0 11.8137 0C7.53973 0 4.74886 2.58131 4.74886 7.25243V11.3592H0V16.7476H4.74886L4.74886 29.7148C5.70228 29.8641 6.67763 30 7.67123 30C8.66484 30 9.64018 29.9657 10.5936 29.8164L10.5936 16.7476H14.9516Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default FacebookIcon
