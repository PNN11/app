import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface Props {
    children: ReactNode
    className?: string
}

const NegativeTopMarginWrapper: FC<Props> = ({ children, className }) => {
    return <div className={twMerge('-mt-13 lg:-mt-20.25', className)}>{children}</div>
}

export default NegativeTopMarginWrapper
