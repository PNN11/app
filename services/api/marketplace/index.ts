import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import { authAxiosClient } from 'services/axios'
import { RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class MarketplaceService extends ApiService {
    getToken: RequestFn<{ id: string }, IMarketplaceToken.TBodyResponse> = async ({ id }) => {
        const response = await authAxiosClient.get(`/api/v1/marketplace/token/${id}`)

        return response.data
    }

    getTokens: RequestFn<
        IMarketplaceToken.TGetTokensRequestParams,
        IMarketplaceToken.TBodyResponses
    > = async ({ signal, limit, offset, ...params }) => {
        const response = await authAxiosClient.post(
            `/api/v1/marketplace/token?limit=${limit}&offset=${offset}`,
            { ...params },
            { signal }
        )

        return response.data
    }

    getTokensForClaim: RequestFn<
        { limit: string; offset: string },
        IMarketplaceToken.TBodyResponses
    > = async ({ offset, limit, signal }) => {
        const response = await authAxiosClient.get(
            `/api/v1/marketplace/token/claim?limit=${limit}&offset=${offset}`,
            { signal }
        )

        return response.data
    }

    getCollection: RequestFn<{ collectionId: string }, IMarketplaceCollection.TResponseBody> =
        async ({ collectionId }) => {
            const response = await authAxiosClient.get(
                `/api/v1/marketplace/collection/${collectionId}`
            )

            return response.data
        }

    getCollections: RequestFn<
        { limit: string; offset: string; searchText?: string },
        IMarketplaceCollection.TResponsesBody
    > = async ({ limit, offset, searchText, signal }) => {
        const response = await authAxiosClient.get('/api/v1/marketplace/collection', {
            params: {
                limit,
                offset,
                searchText,
            },
            signal,
        })

        return response.data
    }

    getStakingCollections: RequestFn<
        { limit: string; offset: string; searchText?: string },
        IMarketplaceCollection.TResponsesBody
    > = async ({ limit, offset, searchText, signal }) => {
        const response = await authAxiosClient.get('/api/v1/marketplace/collection', {
            params: {
                limit,
                offset,
                searchText,
                isStakingNFT: 'true',
            },
            signal,
        })

        return response.data
    }

    getTokenActivities: RequestFn<
        {
            limit: string
            offset: string
            tokenId: string
            event?: IMarketplaceUserActivities.TEvents
        },
        IMarketplaceUserActivities.TBodyResponses
    > = async ({ limit, offset, tokenId, event, signal }) => {
        const response = await authAxiosClient.get(
            `/api/v1/marketplace/token/${tokenId}/activities`,
            {
                params: {
                    limit,
                    offset,
                    event,
                },
                signal,
            }
        )

        return response.data
    }

    getCollectionActivities: RequestFn<
        {
            limit: string
            offset: string
            collectionId: string
            event?: IMarketplaceUserActivities.TEvents
            events?: IMarketplaceUserActivities.TEvents[]
        },
        IMarketplaceUserActivities.TBodyResponses
    > = async ({ limit, offset, collectionId, event, events }) => {
        const response = await authAxiosClient.get(
            `/api/v1/marketplace/collection/${collectionId}/activities`,
            {
                params: {
                    limit,
                    offset,
                    event,
                    events,
                },
            }
        )

        return response.data
    }

    getUserActivities: RequestFn<
        {
            limit: string
            offset: string
            event?: IMarketplaceUserActivities.TEvents
            events?: IMarketplaceUserActivities.TEvents[]
            userId: string
            dateMin?: string
            dateMax?: string
        },
        IMarketplaceUserActivities.TBodyResponses
    > = async ({ limit, offset, event, events, userId, dateMax, dateMin, signal }) => {
        const response = await authAxiosClient.get(
            `/api/v1/marketplace/user/${userId}/activities`,
            {
                params: {
                    limit,
                    offset,
                    event,
                    events,
                    dateMax,
                    dateMin,
                },
                signal,
            }
        )

        return response.data
    }

    getCollectionPriceHistory: RequestFn<
        {
            collectionId: string
            dateMin: string
            dateMax: string
        },
        IMarketplaceCollection.PriceHistoryResponse
    > = async ({ collectionId, dateMax, dateMin }) => {
        const response = await authAxiosClient.post(
            `/api/v1/marketplace/collection/${collectionId}/price-history`,
            { dateMax, dateMin }
        )

        return response.data
    }

    getTokenPriceHistory: RequestFn<
        {
            tokenId: string
            dateMin: string
            dateMax: string
        },
        IMarketplaceCollection.PriceHistoryResponse
    > = async ({ tokenId, dateMax, dateMin }) => {
        const response = await authAxiosClient.post(
            `/api/v1/marketplace/token/${tokenId}/price-history`,
            { dateMax, dateMin }
        )

        return response.data
    }

    lazyMint: RequestFn<{ id: string }, IMarketplaceToken.TBodyMintResponse> = async ({ id }) => {
        const response = await authAxiosClient.post(`/api/v1/marketplace/token/${id}/lazy-mint`)

        return response.data
    }

    getLastBid: RequestFn<{ id: string }, { amountPrice: number }> = async ({ id }) => {
        const response = await authAxiosClient.get(`/api/v1/marketplace/token/${id}/last-bid`)

        return response.data
    }

    getTokenByTokenId: RequestFn<
        { collection: string; id: string },
        IMarketplaceToken.TBodyResponse
    > = async ({ collection, id }) => {
        const response = await authAxiosClient.get(
            `/api/v1/marketplace/token/web3/${collection}/${id}`
        )

        return response.data
    }

    getStakedTokens: RequestFn<
        { collectionId: string; userId: string; limit: string; offset: string },
        IMarketplaceToken.TBodyResponses
    > = async ({ collectionId, limit, offset, userId, signal }) => {
        const response = await authAxiosClient.post(
            `/api/v1/marketplace/token`,
            { isStaked: true, collectionId, userId },
            {
                params: {
                    limit,
                    offset,
                },
                signal,
            }
        )

        return response.data
    }

    getStakingEndTime: RequestFn<{ tokenId: string }, { lockTimeEndAt: string }> = async ({
        tokenId,
    }) => {
        const response = await authAxiosClient.get(`/api/v1/marketplace/token/staking/${tokenId}`)

        return response.data
    }
}
