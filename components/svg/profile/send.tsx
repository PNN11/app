import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

const SendIcon: FC<WithClassName<{}>> = ({ className = '' }) => {
    return (
        <svg
            className={className}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
        >
            <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
    )
}

export default SendIcon
