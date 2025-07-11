import { Game } from 'common-types/game'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceFilter } from 'components/marketplace/filter/types'

type MarketplaceTokensRequestParamsFromFilters = {
    filters: MarketplaceFilter
    limit: number
    pageParam: number
}

type GameMarketplaceTokensRequestParamsFromFilters = MarketplaceTokensRequestParamsFromFilters & {
    game: Game.IGame
}

type GetRequestParamsFromFiltersFunc<T> = (params: T) => IMarketplaceToken.TGetTokensRequestParams

export const getMarketplaceTokensRequestParamsFromFilters: GetRequestParamsFromFiltersFunc<
    MarketplaceTokensRequestParamsFromFilters
> = ({ filters, limit, pageParam }) => {
    return {
        limit: limit.toString(),
        offset: (pageParam * limit).toString(),
        games: filters?.games?.length ? filters.games.map(game => game.id) : undefined,
        currencies: filters?.price?.asset?._id ? [filters?.price?.asset?._id] : undefined,
        priceAmount: {
            gte: filters.price?.from ? +filters.price.from : undefined,
            lte: filters.price?.to ? +filters.price.to : undefined,
        },
        traits: filters?.traits?.length ? filters.traits.map(trait => trait._id) : undefined,
        types: filters?.status?.length ? filters.status : undefined,
        status: filters.saleStatus ? filters.saleStatus : undefined,
        sort: filters.sort?.sortBy ? filters.sort.sortBy : undefined,
        searchText: filters?.searchText?.length ? filters.searchText : undefined,
        collections: filters?.collections?.length
            ? filters.collections.map(collection => collection._id)
            : undefined,
        rank: {
            gte: filters.rank?.from ? +filters.rank.from : undefined,
            lte: filters.rank?.to ? +filters.rank.to : undefined,
        },
        resolution: filters?.type ? filters.type : undefined,
        rankResolutions: filters.rarity?.length ? filters.rarity : undefined,
        lastDateTimeEnd: filters.saleStatus === 'SALE' ? { gte: Date.now() } : undefined,
    }
}

export const getGameMarketplaceTokensRequestParamsFromFilters: GetRequestParamsFromFiltersFunc<
    GameMarketplaceTokensRequestParamsFromFilters
> = ({ filters, limit, pageParam, game }) => {
    return {
        ...getMarketplaceTokensRequestParamsFromFilters({ filters, limit, pageParam }),
        games: [game.id],
        collections: game.collections.map(i => i._id),
    }
}
