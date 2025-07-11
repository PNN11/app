import { FC } from 'react'

type PropsType = {
    width?: number
    height?: number
    className?: string
}
const CalendarIcon: FC<PropsType> = ({ width = 24, height = 24, className }) => {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.2 0.96C7.66392 0.96 8.04 1.33608 8.04 1.8V3.6H14.76V1.8C14.76 1.33608 15.1361 0.96 15.6 0.96C16.0639 0.96 16.44 1.33608 16.44 1.8V3.6H18C19.9882 3.6 21.6 5.21178 21.6 7.2V9.6V10.8V18C21.6 19.9882 19.9882 21.6 18 21.6H4.8C2.81177 21.6 1.2 19.9882 1.2 18V10.8V9.6V7.2C1.2 5.21177 2.81178 3.6 4.8 3.6H6.36V1.8C6.36 1.33608 6.73608 0.96 7.2 0.96ZM2.64 7.2V9.6H20.16V7.2C20.16 6.00706 19.1929 5.04 18 5.04H4.8C3.60707 5.04 2.64 6.00706 2.64 7.2ZM20.16 10.8H2.64V18C2.64 19.1929 3.60706 20.16 4.8 20.16H18C19.1929 20.16 20.16 19.1929 20.16 18V10.8ZM6.84 13.2C6.37608 13.2 6 13.5761 6 14.04C6 14.5039 6.37608 14.88 6.84 14.88H9.96C10.4239 14.88 10.8 14.5039 10.8 14.04C10.8 13.5761 10.4239 13.2 9.96 13.2H6.84Z"
                fill="#97A2B4"
            />
        </svg>
    )
}

export default CalendarIcon
