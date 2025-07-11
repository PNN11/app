import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

const bgMap = new Map<IMarketplaceToken.RarityVariants, string>([
    ['common', 'bg-rarity-common'],
    ['uncommon', 'bg-rarity-uncommon'],
    ['rare', 'bg-rarity-rare'],
    ['epic', 'bg-rarity-epic'],
    ['legendary', 'bg-rarity-legendary'],
])

interface RarityBadgeProps {
    rankResolution: IMarketplaceToken.RarityVariants
    resolution: IMarketplaceToken.ResolutionType
}

const RarityBadge: FC<RarityBadgeProps> = ({ resolution, rankResolution }) => {
    if (resolution !== 'TOKEN_ERC721') return

    const background = bgMap.get(rankResolution)

    if (!background) {
        console.warn(`Rarity badge doesn't have variant for ${rankResolution}`)

        return null
    }

    return (
        <div className={`flex h-max items-center gap-1.25 rounded-2xl px-2 py-1 ${background}`}>
            <div className="text-custom-xs capitalize">{rankResolution.toLowerCase()}</div>
        </div>
    )
}

export default RarityBadge
