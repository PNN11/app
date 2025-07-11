import { FC } from 'react'

interface OkxWalletIconProps {
    classname?: string
}

const OkxWalletIcon: FC<OkxWalletIconProps> = ({ classname }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classname}
        >
            <path d="M5 5V8.38235H8.38235V5H5Z" fill="white" />
            <path d="M8.38235 11.6176H5V15H8.38235V11.6176Z" fill="white" />
            <path d="M8.38235 8.38235V11.6176H11.6176V8.38235H8.38235Z" fill="white" />
            <path d="M11.6176 11.6176V15H15V11.6176H11.6176Z" fill="white" />
            <path d="M11.6176 8.38235H15V5H11.6176V8.38235Z" fill="white" />
        </svg>
    )
}

export default OkxWalletIcon
