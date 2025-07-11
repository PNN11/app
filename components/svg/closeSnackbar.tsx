import { FC } from 'react'

const CloseSnackbar: FC = () => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="16" cy="16" r="15.5" stroke="#E27171" />
            <path
                d="M12 12L16 16M16 16L20 12M16 16L12 20M16 16L20 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default CloseSnackbar
