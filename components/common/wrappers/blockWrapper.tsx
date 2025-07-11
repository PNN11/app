import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

type BlockWrapperPropsType = {
    children: ReactNode
    className?: string
    id?: string
}

export const BlockWrapper: FC<BlockWrapperPropsType> = ({ children, className = '', id }) => {
    return (
        <div id={id} className={twMerge('mb-20 text-base-100 xl:mb-45', className)}>
            {children}
        </div>
    )
}
