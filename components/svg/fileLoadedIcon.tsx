import { FC } from 'react'

interface Props {
    className?: string
}

const FileLoadedIcon: FC<Props> = ({ className = '' }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M21 6L9 18L3 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default FileLoadedIcon
