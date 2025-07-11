import { FC, memo } from 'react'

import { twMerge } from 'tailwind-merge'

import GameCardSkeletonLoading from './gameCard'
import NftCardSkeletonLoader from './nftCard'

export interface SkeletonLoadingCardsProps {
    count: number
    type: TCards
    classes?: { wrapper?: string }
}

export type TCards = 'game' | 'nft'

const cardsMap = new Map<TCards, FC>([
    ['game', GameCardSkeletonLoading],
    ['nft', NftCardSkeletonLoader],
])

const Cards: FC<SkeletonLoadingCardsProps> = ({ count, type, classes }) => {
    const Card = cardsMap.get(type)

    if (!Card) {
        console.error(`There is no component for this type ${type}`)

        return null
    }

    return (
        <div
            className={twMerge(
                `mb-4 grid grid-cols-1 gap-3 2xs:grid-cols-2 sm:grid-cols-nft-card-marketplace`,
                classes?.wrapper
            )}
        >
            {Array(count)
                .fill(undefined)
                .map((value, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Card key={i} />
                ))}
        </div>
    )
}

const SkeletonLoadingCards = memo(Cards)

export default SkeletonLoadingCards
