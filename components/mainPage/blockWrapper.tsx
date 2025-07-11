import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{
    children: ReactNode
}>

const MainPageBlockWrapper: FC<Props> = ({ children, className = '' }) => {
    return <div className={twMerge('mb-29 sm:mb-37', className)}>{children}</div>
}

export default MainPageBlockWrapper
