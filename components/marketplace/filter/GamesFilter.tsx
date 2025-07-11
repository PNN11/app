import { FC, useMemo } from 'react'

import { useInfiniteQuery } from 'react-query'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { MarketplaceFilter, TGamesFilter } from './types'

import { Game } from 'common-types/game'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

export type GameType = {
    title: string
    icon: string
    _id: string
}

type PropsType = {}

const limit = 10

export const GamesFilter: FC<PropsType> = () => {
    const gameService = useServiceStore(store => store.gameService)
    const [gamesFilter, setGamesFilter] = useFilterState<
        Pick<MarketplaceFilter, 'games'>,
        TGamesFilter
    >(
        store => store.games,
        value => ({ games: value }),
        {
            defaultValue: [],
            remover: (prev, current) => prev.filter(item => item.id !== current.id) ?? [],
        }
    )

    const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
        QueryKeys.ALL_GAMES_FOR_FILTER,
        ({ pageParam = 0, signal }) =>
            gameService.getGames({
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
        }
    )

    const games = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Game.IGame[]),
        [data]
    )

    const handleAddGameToFilter = (game: Game.IGame): void => {
        if (gamesFilter.find(({ id }) => game.id === id)) {
            setGamesFilter(gamesFilter.filter(item => item.id !== game.id) ?? [])

            return
        }

        setGamesFilter([...(gamesFilter ?? []), { id: game.id, title: game.title }])
    }

    return (
        <AccordionFilterWrapper
            isLoading={isLoading}
            isError={isError}
            items={games}
            itemToKey={item => item.id}
            itemToLabel={item => item.title}
            title="Games"
            itemToIcon={item => item.icon}
            isChecked={item => !!gamesFilter.find(({ id }) => item.id === id)}
            onClickItem={handleAddGameToFilter}
            onReachEnd={fetchNextPage}
        />
    )
}

export const GamesPreview: FilterPreview<Pick<MarketplaceFilter, 'games'>, TGamesFilter> = {
    selector: store => store.games,
    Component: ({ value }) => <div>{value.title}</div>,
}
