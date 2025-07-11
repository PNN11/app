import { FC } from 'react'

interface Props {
    className?: string
}

const copy: FC<Props> = ({ className }) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11 5.21429V4C11 2.89543 10.1046 2 9 2H4C2.89543 2 2 2.89543 2 4V9C2 10.1046 2.89543 11 4 11H5.21429"
                strokeWidth="1.5"
            />
            <rect x="5" y="5" width="9" height="9" rx="2" strokeWidth="1.5" />
        </svg>
    )
}

export default copy
