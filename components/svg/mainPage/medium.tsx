import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

const MainPageMediumIcon: FC<WithClassName<{}>> = ({ className = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            className={className}
        >
            <g clipPath="url(#clip0_10562_24103)">
                <path
                    d="M20.4741 18.5169C20.4741 24.173 15.9284 28.7581 10.3212 28.7581C4.71406 28.7581 0.167969 24.172 0.167969 18.5169C0.167969 12.8619 4.71372 8.27539 10.3212 8.27539C15.9287 8.27539 20.4741 12.8609 20.4741 18.5169Z"
                    fill="white"
                />
                <path
                    d="M31.6103 18.5171C31.6103 23.8411 29.3374 28.1587 26.5337 28.1587C23.7299 28.1587 21.457 23.8411 21.457 18.5171C21.457 13.1931 23.7296 8.87549 26.5333 8.87549C29.3371 8.87549 31.6099 13.1918 31.6099 18.5171"
                    fill="white"
                />
                <path
                    d="M36.1682 18.5168C36.1682 23.2858 35.369 27.1542 34.3828 27.1542C33.3966 27.1542 32.5977 23.2868 32.5977 18.5168C32.5977 13.7468 33.3969 9.87939 34.3828 9.87939C35.3686 9.87939 36.1682 13.7464 36.1682 18.5168Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_10562_24103">
                    <rect
                        width="36"
                        height="36"
                        fill="white"
                        transform="translate(0.167969 0.775391)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default MainPageMediumIcon
