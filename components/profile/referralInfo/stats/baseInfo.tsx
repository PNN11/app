import { FC, ReactNode } from 'react'

import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{
    title: string
    Icon: FC<WithClassName<{}>>
    children: ReactNode
}>

const BaseRewardsInfoItem: FC<Props> = ({ Icon, title, children, className = '' }) => {
    return (
        <div className={`w-full ${className}`}>
            <div className="mb-1 flex w-full items-center gap-1">
                <Icon className="text-cta" />
                <div className="text-custom-lg font-medium">{title}</div>
            </div>
            {children}
        </div>
    )
}

export default BaseRewardsInfoItem
