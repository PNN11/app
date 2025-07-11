import { FC, ReactNode } from 'react'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{
    children: ReactNode
}>

const StepCardWrapper: FC<Props> = ({ children, className = '' }) => {
    return <div className={`rounded-lg border border-base-700 p-4 ${className}`}>{children}</div>
}

export default StepCardWrapper
