/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import WheelStatItem from './wheelStatItem'

import { WheelCore } from 'common-types/wheel'

const CurrencyStat: FC<{ drop: WheelCore.Drop; isLoading?: boolean }> = ({ drop, isLoading }) => {
    return (
        <WheelStatItem
            label={
                // @ts-ignore
                drop.reward.currency.symbol
            }
            isLoading={isLoading}
            value={drop.countDrop}
            // eslint-disable-next-line react/no-unstable-nested-components
            Icon={() => <img src={drop.reward.meta.image} alt={drop.reward.type} />}
        />
    )
}

export default CurrencyStat
