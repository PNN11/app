import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{}>

const ReferralSwapArrow: FC<Props> = ({ className = '' }) => {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M10.666 7.33325L17.3327 13.9999L10.666 20.6666"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ReferralSwapArrow
