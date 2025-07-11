import { useQuery, UseQueryResult } from 'react-query'

import { Core } from 'common-types/core'
import { Game } from 'common-types/game'
import useServiceStore from 'store/service'

const useGamesQuery = ({
    limit = '10',
    offset = '0',
}: {
    limit?: string
    offset?: string
}): UseQueryResult<Core.PaginatedResponse<Game.IGame>, unknown> => {
    const gameService = useServiceStore(state => state.gameService)
    const games = useQuery('all-games', () => gameService.getGames({ limit, offset }))

    return games
}

export default useGamesQuery
