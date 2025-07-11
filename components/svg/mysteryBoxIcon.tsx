import { FC } from 'react'

interface MysteryBoxIconProps {
    className?: string
}
const MysteryBoxIcon: FC<MysteryBoxIconProps> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.2 10.3846H18V7H10M17.2 10.3846V17C17.2 17.5523 16.7523 18 16.2 18H10M17.2 10.3846H10M2.8 10.3846H2V7H10M2.8 10.3846V17C2.8 17.5523 3.24772 18 3.8 18H10M2.8 10.3846H10M10 18V10.3846M10 10.3846V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
            <path
                d="M12.0226 3.28355C12.9247 2.74671 14.1218 2.99463 14.6965 3.83729C15.2711 4.67995 15.0057 5.79825 14.1037 6.33508C13.2016 6.87191 10.6979 7.40161 10.1232 6.55895C9.54855 5.71629 11.1206 3.82038 12.0226 3.28355Z"
                stroke="currentColor"
                strokeWidth="1.2"
            />
            <path
                d="M7.97736 3.28355C7.07531 2.74671 5.8782 2.99463 5.30353 3.83729C4.72886 4.67995 4.99426 5.79825 5.8963 6.33508C6.79835 6.87191 9.30211 7.40161 9.87678 6.55895C10.4514 5.71629 8.87941 3.82038 7.97736 3.28355Z"
                stroke="currentColor"
                strokeWidth="1.2"
            />
        </svg>
    )
}

export default MysteryBoxIcon
