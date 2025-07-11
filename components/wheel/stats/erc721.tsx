/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'

import WheelStatItem from './wheelStatItem'

import { WheelCore } from 'common-types/wheel'

const ERC721Stat: FC<{ drop: WheelCore.Drop; isLoading?: boolean }> = ({ drop, isLoading }) => {
    return (
        <WheelStatItem
            label="NFT"
            value={drop.countDrop}
            // eslint-disable-next-line react/no-unstable-nested-components
            Icon={() => <img src={drop.reward.meta.image} alt={drop.reward.type} />}
            isLoading={isLoading}
        />
    )
}

export default ERC721Stat
