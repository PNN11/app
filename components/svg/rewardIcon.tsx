import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{}>

const RewardIcon: FC<Props> = ({ className = '' }) => {
    return (
        <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M6.125 3.125H14.875L19.25 8.125L10.5 17.5L1.75 8.125L6.125 3.125Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.3345 8.125L10.4993 17.5L6.66406 8.125L10.4993 3.125L14.3345 8.125Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.75 8.125H19.25"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default RewardIcon
