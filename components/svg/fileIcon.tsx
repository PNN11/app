import { FC } from 'react'

interface FileIconProps {
    className?: string
}

const FileIcon: FC<FileIconProps> = ({ className = '' }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.0851 17.0873H4.58044C4.11991 17.0873 3.74658 16.7139 3.74658 16.2534V7.08101"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="6.24756"
                y="3.74609"
                width="9.1724"
                height="10.8401"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    )
}

export default FileIcon
