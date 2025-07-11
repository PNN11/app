import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

type ContainerPropsType = {
    children: ReactNode
    className?: string
}

export const Container: FC<ContainerPropsType> = ({ children, className = '' }) => {
    return (
        <div className={twMerge('mx-auto max-w-grid-container px-3 sm:px-12 xl:px-16', className)}>
            {children}
        </div>
    )
}
