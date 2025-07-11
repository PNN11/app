import { FC } from 'react'

import { CurrencySymbol } from './currency/symbol'

import { Economics } from 'common-types/economics'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import RarityBadge from 'components/mysteryBox/rarityBadge'

interface PriceAndRankInfoProps {
    rankResolution: IMarketplaceToken.RarityVariants
    resolution: IMarketplaceToken.ResolutionType
    name: string
    rank: number
    priceAmount: number
    currency: Pick<Economics.IAsset, 'symbol'>
}

const PriceAndRankInfo: FC<PriceAndRankInfoProps> = ({
    name,
    priceAmount,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rank,
    resolution,
    rankResolution,
    currency,
}) => {
    return (
        <>
            <div className="mb-1 flex items-center justify-between gap-4">
                <div className="font-medium">{name}</div>
                {rankResolution && (
                    <RarityBadge resolution={resolution} rankResolution={rankResolution} />
                )}
            </div>
            <div className="flex items-center justify-between">
                <div>
                    {priceAmount ? (
                        <>
                            {priceAmount} <CurrencySymbol asset={currency} />
                        </>
                    ) : null}
                </div>
                {/* {resolution === 'TOKEN_ERC721' && rank ? <div>Rank {rank}</div> : null} */}
            </div>
        </>
    )
}

export default PriceAndRankInfo
