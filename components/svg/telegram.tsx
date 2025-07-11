import { FC } from 'react'

interface TelegramIconProps {
    className?: string
}
const Telegram: FC<TelegramIconProps> = ({ className = '' }) => {
    return (
        <svg
            width="38"
            height="32"
            viewBox="0 0 38 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M15.3442 20.9166L14.7657 29.5834C15.6157 29.5834 15.9913 29.1947 16.4657 28.7334L20.5496 24.7624L29.0457 31.0395C30.6093 31.9022 31.7378 31.4555 32.1273 29.5878L37.7047 3.30498C38.2757 1.01559 36.832 -0.0227749 35.3362 0.656318L2.58568 13.2848C0.350149 14.1814 0.363183 15.4286 2.17819 15.9844L10.5827 18.6076L30.0401 6.33214C30.9586 5.77513 31.8016 6.07459 31.1097 6.68868L15.3437 20.9163L15.3442 20.9166Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default Telegram
