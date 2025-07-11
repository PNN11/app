import { FC } from 'react'

export type WheelStatItemProps = {
    label: string
    Icon: FC<any>
    value: string | number
    isLoading?: boolean
}

export type WheelRewardStatsProps = {
    alias: string
}
