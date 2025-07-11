import { FC } from 'react'

import { GameStatProps } from './stats/base'
import FloorPriceStat from './stats/floorPrice'
import NftCountStat from './stats/nftCount'
import OwnersStat from './stats/owners'
import VolumeStat from './stats/volume'

import { Economics } from 'common-types/economics'
import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'

interface GameStateProps {
    isLoading: boolean
    statistics: IMarketplaceCollection.TResponseBody['statistics']
    currency: Economics.IAsset
    classes?: {
        wrapper?: string
        stat?: GameStatProps['classes']
    }
}

const GameStats: FC<GameStateProps> = ({ isLoading, classes, statistics, currency }) => {
    return (
        <div className={`mb-5 grid grid-cols-2 gap-4 lg:flex lg:gap-3 ${classes?.wrapper ?? ''}`}>
            <FloorPriceStat
                currency={currency}
                isLoading={isLoading}
                value={statistics?.minPrice}
                classes={classes?.stat}
            />
            <VolumeStat
                currency={currency}
                isLoading={isLoading}
                value={statistics?.countBuyToken}
                classes={classes?.stat}
            />
            <NftCountStat
                isLoading={isLoading}
                value={statistics?.countTokens}
                classes={classes?.stat}
            />
            <OwnersStat
                isLoading={isLoading}
                value={statistics?.countOwner}
                classes={classes?.stat}
            />
        </div>
    )
}

export default GameStats
