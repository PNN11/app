import { Core } from 'common-types/core'
import { Economics } from 'common-types/economics'
import { Game } from 'common-types/game'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'

export type TRankFilter = {
    from: string
    to: string
}

export type ProfileNftTab = {
    profileNftTab: string
}

export type TStatusFilter = IMarketplaceToken.TType[]
export type TSaleStatusFilter = IMarketplaceToken.TStatus
export type TTypeFilter = IMarketplaceToken.ResolutionType
export type TRarityFilter = IMarketplaceToken.RarityVariants[]

export type TPriceFilter = {
    from: string
    to: string
    asset: Pick<Economics.IAsset, '_id' | 'symbol' | 'icon'>
}
export type TGamesFilter = { id: string; title: string }[]
export type TCollectionsFilter = { _id: string; name: string }[]
export type TTraitsFilter = { _id: string; value: string }[]
export type TEventsFilter = IMarketplaceUserActivities.TEvents[]

type SortParams = 'createdAt' | 'priceAmount'

export type TSortFilter = {
    title: string
    sortBy: Partial<Record<SortParams, Core.SortParams>>
}

export type TGameStatusFilter = Game.TGameStatus

export type TGamesWithChallengesFilter = 'With challenges'

export type TGenresFilter = { id: string; title: string }[]

export type TPlatformsFilter = { id: string; title: string }[]

export type TBlockchainsFilter = string[]

export type MarketplaceFilter = {
    status: TStatusFilter
    saleStatus: TSaleStatusFilter
    price: TPriceFilter
    rank: TRankFilter
    games: TGamesFilter
    collections: TCollectionsFilter
    traits: TTraitsFilter
    sort: TSortFilter
    searchText: string
    events: TEventsFilter
    type: TTypeFilter
    rarity: TRarityFilter
}

export type GamesFilter = {
    gameStatus: TGameStatusFilter
    gameWithChallenges: TGamesWithChallengesFilter
    genres: TGenresFilter
    platforms: TPlatformsFilter
    blockchains: TBlockchainsFilter
}
