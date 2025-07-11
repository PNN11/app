import { FC } from 'react'

type PropsType = {
    className?: string
}
const TelegramIcon: FC<PropsType> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15.0063 21.6618L14.7001 26.2501C15.1501 26.2501 15.3489 26.0443 15.6001 25.8001L17.7621 23.6978L22.2601 27.021C23.0879 27.4777 23.6853 27.2412 23.8915 26.2524L26.8442 12.338C27.1465 11.126 26.3822 10.5762 25.5903 10.9358L8.25182 17.6214C7.0683 18.0961 7.0752 18.7564 8.03609 19.0506L12.4855 20.4393L22.7865 13.9406C23.2728 13.6457 23.7191 13.8043 23.3528 14.1294L15.0061 21.6616L15.0063 21.6618Z"
                fill="white"
            />
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
        </svg>
    )
}

export default TelegramIcon
