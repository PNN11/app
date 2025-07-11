import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{}>

const StakingIcon: FC<Props> = ({ className = '' }) => {
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
                d="M10 10C13.797 10 16.875 8.32107 16.875 6.25C16.875 4.17893 13.797 2.5 10 2.5C6.20304 2.5 3.125 4.17893 3.125 6.25C3.125 8.32107 6.20304 10 10 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.125 6.25V10C3.125 12.0711 6.20304 13.75 10 13.75C13.797 13.75 16.875 12.0711 16.875 10V6.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.125 10V13.75C3.125 15.8211 6.20304 17.5 10 17.5C13.797 17.5 16.875 15.8211 16.875 13.75V10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default StakingIcon
