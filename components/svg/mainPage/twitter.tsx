import { FC } from 'react'

import { WithClassName } from 'utils/types/common'

const MainPageTwitter: FC<WithClassName<{}>> = ({ className = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            className={className}
        >
            <path
                d="M4.57033 5.77539L15.708 20.6675L4.5 32.7754H7.02247L16.835 22.1747L24.7633 32.7754H33.3474L21.5831 17.0456L32.0154 5.77539H29.4929L20.456 15.5384L13.1544 5.77539H4.57033ZM8.27981 7.63344H12.2233L29.6373 30.917H25.6938L8.27981 7.63344Z"
                fill="#F6F6F6"
            />
        </svg>
    )
}

export default MainPageTwitter
