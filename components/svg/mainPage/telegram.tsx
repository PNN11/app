import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

const MainPageTelegram: FC<WithClassName<{}>> = ({ className = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            className={className}
        >
            <path
                d="M15.5148 22.5023L15.118 28.3154C15.7011 28.3154 15.9587 28.0547 16.2842 27.7453L19.0857 25.0818L24.9141 29.2921C25.9867 29.8707 26.7609 29.5711 27.0281 28.3184L30.8542 10.6895C31.2459 9.15396 30.2555 8.4575 29.2294 8.91299L6.76238 17.3833C5.22879 17.9848 5.23773 18.8213 6.48284 19.1941L12.2484 20.9535L25.5962 12.72C26.2264 12.3464 26.8047 12.5472 26.33 12.9591L15.5145 22.5021L15.5148 22.5023Z"
                fill="white"
            />
        </svg>
    )
}

export default MainPageTelegram
