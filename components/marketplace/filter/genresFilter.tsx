import { FC, useMemo, useState } from 'react'

import { useInfiniteQuery } from 'react-query'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { GamesFilter, TGenresFilter } from './types'

import { Game } from 'common-types/game'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import useServiceStore from 'store/service'

const GenresFilter: FC = () => {
    const gameService = useServiceStore(store => store.gameService)
    const [limit] = useState(6)

    const [genresFilter, setGenresFilter] = useFilterState<
        Pick<GamesFilter, 'genres'>,
        TGenresFilter
    >(
        store => store.genres,
        value => ({ genres: value }),
        {
            defaultValue: [],
            remover: (prev, current) => prev.filter(item => item.id !== current.id) ?? [],
        }
    )

    const handleAddGenreToFilter = (genre: Game.Genre): void => {
        if (genresFilter.find(item => genre.id === item.id)) {
            setGenresFilter(genresFilter.filter(item => item.id !== genre.id) ?? [])

            return
        }

        setGenresFilter([...(genresFilter ?? []), { id: genre.id, title: genre.title }])
    }

    const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery(
        'get-genres',
        ({ pageParam = 1, signal }) =>
            gameService.getGenres({
                limit: limit.toString(),
                offset: ((pageParam - 1) * limit).toString(),
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
        }
    )

    const genres = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Game.Genre[]),
        [data]
    )

    return (
        <AccordionFilterWrapper
            isLoading={isLoading}
            isError={isError}
            items={genres}
            itemToKey={item => item.id}
            itemToLabel={item => item.title}
            title="Genres"
            isChecked={item => !!genresFilter.find(genre => item.id === genre.id)}
            onClickItem={handleAddGenreToFilter}
            onReachEnd={fetchNextPage}
        />
    )
}

export default GenresFilter

export const GenresPreview: FilterPreview<Pick<GamesFilter, 'genres'>, TGenresFilter> = {
    selector: store => store.genres,
    Component: ({ value }) => <div>{value.title}</div>,
}
