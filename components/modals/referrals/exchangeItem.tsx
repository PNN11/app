import { FC, ReactNode } from 'react'

import { WithClassName } from 'utils/types/common'

interface Props {
    Icon: FC<WithClassName<{}>>
    children: ReactNode
    classes?: { icon?: { wrapper?: string; item?: string } }
    title: string
}

const ReferralRewardsExchangeItem: FC<Props> = ({ Icon, children, classes, title }) => {
    return (
        <div className="flex min-w-[10rem] flex-col items-center">
            <div
                className={`flex w-fit items-center justify-center rounded-full p-2.5 ${
                    classes?.icon?.wrapper ?? ''
                }`}
            >
                <Icon className={`h-10 w-10 ${classes?.icon?.item ?? ''}`} />
            </div>
            <p className="mb-1 text-sm leading-6 text-base-300">{title}</p>
            {children}
        </div>
    )
}

export default ReferralRewardsExchangeItem
