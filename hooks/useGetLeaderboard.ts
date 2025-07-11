import { UseQueryResult, useQuery } from 'react-query'

import { Game } from 'common-types/game'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'

type Params = { enableRequest: boolean; gameId: string }

const useGetLeaderboard = ({
    enableRequest,
    gameId,
}: Params): UseQueryResult<Game.TLeaderboard> => {
    const gameService = useServiceStore(store => store.gameService)
    const isAuth = useAuthStore(state => state.isAuth)

    const result = useQuery(
        `game-leaderboard-${gameId}`,
        ({ signal }) =>
            gameService.getLeaderboard({ game: gameId, limit: '10', offset: '0', signal }),
        { enabled: isAuth && enableRequest }
    )

    return result
}

export default useGetLeaderboard
