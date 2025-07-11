import { Core } from 'common-types/core'
import { Game } from 'common-types/game'
import { authAxiosClient } from 'services/axios'
import { RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class GameService extends ApiService {
    getGame: RequestFn<{ gameId: string }, Game.IGame> = async ({ gameId }) => {
        const response = await authAxiosClient.get(`/api/v1/game/${gameId}`)

        return response.data
    }

    getGames: RequestFn<Game.GetGamesRequestParams, Core.PaginatedResponse<Game.IGame>> = async ({
        limit,
        offset,
        signal,
        ...params
    }) => {
        const response = await authAxiosClient.post(
            `/api/v1/game?limit=${limit}&offset=${offset}`,
            { ...params },
            { signal }
        )

        return response.data
    }

    getMyGames: RequestFn<{ limit: string; offset: string }, Core.PaginatedResponse<Game.IGame>> =
        async ({ limit, offset, signal }) => {
            const response = await authAxiosClient.get('/api/v1/user/my-games', {
                params: {
                    limit,
                    offset,
                },
                signal,
            })

            return response.data
        }

    getLeaderboard: RequestFn<
        Core.PaginatedRequestBaseParams & { game: string; defaultAroundPlayerLimit?: string },
        Game.TLeaderboard
    > = async ({ game, limit, offset, signal, defaultAroundPlayerLimit }) => {
        const response = await authAxiosClient.get<Game.TLeaderboard>(
            `/api/v1/game/${game}/leaderboard`,
            {
                params: {
                    limit,
                    offset,
                    defaultAroundPlayerLimit,
                },
                signal,
            }
        )

        return response.data
    }

    getTotalEarned: RequestFn<Game.GameStatisticsRequestParams, Game.TotalEarnedResponse> = async ({
        gameId,
        date,
    }) => {
        const response = await authAxiosClient.post(
            `/api/v1/game/${gameId}/statistics-total-earned`,
            { date }
        )

        return response.data
    }

    getTotalSpent: RequestFn<Game.GameStatisticsRequestParams, Game.TotalSpentResponse> = async ({
        gameId,
        date,
    }) => {
        const response = await authAxiosClient.post(
            `/api/v1/game/${gameId}/statistics-total-spent`,
            { date }
        )

        return response.data
    }

    getTotalPlayers: RequestFn<Game.GameStatisticsRequestParams, Game.PlayersStaticticsResponse> =
        async ({ gameId, date }) => {
            const response = await authAxiosClient.post(
                `/api/v1/game/${gameId}/statistics-total-user-with-activity`,
                { date }
            )

            return response.data
        }

    getNewPlayers: RequestFn<Game.GameStatisticsRequestParams, Game.PlayersStaticticsResponse> =
        async ({ gameId, date }) => {
            const response = await authAxiosClient.post(
                `/api/v1/game/${gameId}/statistics-total-user-with-first-game`,
                { date }
            )

            return response.data
        }

    getChallenges: RequestFn<
        { gameId: string; limit: string; page: number },
        Game.GetChallengesResponse
    > = async ({ gameId, limit, page, signal }) => {
        const response = await authAxiosClient.get(`/api/v01/game/${gameId}/challenges`, {
            params: { limit, page },
            signal,
        })

        return response.data
    }

    getChallenge: RequestFn<{ gameId: string; challengeId: string }, Game.Challenge> = async ({
        gameId,
        challengeId,
    }) => {
        const response = await authAxiosClient.get(
            `/api/v01/game/${gameId}/challenge/${challengeId}`
        )

        return response.data
    }

    getGenres: RequestFn<Core.PaginatedRequestBaseParams, Game.GetGenresResponse> = async ({
        limit,
        offset,
        signal,
    }) => {
        const response = await authAxiosClient.get('/api/v01/game/genres', {
            params: { limit, offset },
            signal,
        })

        return response.data
    }

    getGamePlatforms: RequestFn<Core.PaginatedRequestBaseParams, Game.GetGamePlatformsResponse> =
        async ({ limit, offset, signal }) => {
            const response = await authAxiosClient.get('/api/v01/game/platforms', {
                params: { limit, offset },
                signal,
            })

            return response.data
        }

    getGameTabs: RequestFn<{ gameId: string }, Game.GetGameTabsResponse> = async ({ gameId }) => {
        const response = await authAxiosClient.get(`/api/v1/game/${gameId}/tab-view`)

        return response.data
    }

    getMyGameAssets: RequestFn<Core.PaginatedRequestBaseParams, Game.GetMyGameAssetsResponse> =
        async ({ limit, offset, signal }) => {
            const response = await authAxiosClient.get(`/api/v1/game-asset`, {
                params: { limit, offset },
                signal,
            })

            return response.data
        }

    getAllGameAssets: RequestFn<
        Core.PaginatedRequestBaseParams & { gameAlias?: string },
        Game.GetMyGameAssetsResponse
    > = async ({ gameAlias, limit, offset, signal }) => {
        const response = await authAxiosClient.get(`/api/v1/game-asset/all`, {
            params: { gameAlias, limit, offset },
            signal,
        })

        return response.data
    }

    mintGameAsset: RequestFn<
        {
            assetId: string
        },
        Game.MintGameAssetResponse
    > = async ({ assetId }) => {
        const response = await authAxiosClient.post(`/api/v1/game-asset/${assetId}/mint`)

        return response.data
    }

    buyGameAssetWithInternalBalance: RequestFn<{ gameAssetId: string }, { ok: boolean }> = async ({
        gameAssetId,
    }) => {
        const response = await authAxiosClient.post(`/api/v1/game-asset/${gameAssetId}/buy`)

        return response.data
    }
}
