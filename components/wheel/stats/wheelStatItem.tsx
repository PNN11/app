import { FC } from 'react'

import { WheelStatItemProps } from './types'

import Skeleton from 'components/common/skeleton'

const WheelStatItem: FC<WheelStatItemProps> = ({ Icon, label, value, isLoading = false }) => {
    return (
        <div className="flex items-center">
            <p className="mr-2 text-base">{label}:</p>
            <Skeleton isLoading={isLoading} classes={{ skeleton: 'w-10 rounded h-7' }}>
                <p className="text-custom-2.5xl font-medium">{value}</p>
            </Skeleton>
            <p className="ml-1 max-w-[2rem] overflow-hidden rounded-full">
                <Icon />
            </p>
        </div>
    )
}

export default WheelStatItem
