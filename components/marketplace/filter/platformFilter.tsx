import { FC, useMemo, useState } from 'react'

import { useInfiniteQuery } from 'react-query'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { GamesFilter, TPlatformsFilter } from './types'

import { Game } from 'common-types/game'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import useServiceStore from 'store/service'

const PlatformFilter: FC = () => {
    const gameService = useServiceStore(store => store.gameService)
    const [limit] = useState(6)

    const [platformFilter, setPlatformFilter] = useFilterState<
        Pick<GamesFilter, 'platforms'>,
        TPlatformsFilter
    >(
        store => store.platforms,
        value => ({ platforms: value }),
        {
            defaultValue: [],
            remover: (prev, current) => prev.filter(item => item.id !== current.id) ?? [],
        }
    )

    const handleAddPlatformToFilter = (platform: Game.GamePlatform): void => {
        if (platformFilter.find(item => platform.id === item.id)) {
            setPlatformFilter(platformFilter.filter(item => item.id !== platform.id) ?? [])

            return
        }

        setPlatformFilter([...(platformFilter ?? []), { id: platform.id, title: platform.title }])
    }

    const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery(
        'get-games-platforms',
        ({ pageParam = 1, signal }) =>
            gameService.getGamePlatforms({
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

    const platforms = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Game.GamePlatform[]),
        [data]
    )

    return (
        <AccordionFilterWrapper
            isLoading={isLoading}
            isError={isError}
            onReachEnd={fetchNextPage}
            items={platforms}
            itemToKey={item => item.id}
            itemToLabel={item => item.title}
            title="Platform"
            isChecked={item => !!platformFilter.find(platform => item.id === platform.id)}
            onClickItem={handleAddPlatformToFilter}
        />
    )
}

export default PlatformFilter

export const PlatformPreview: FilterPreview<Pick<GamesFilter, 'platforms'>, TPlatformsFilter> = {
    selector: store => store.platforms,
    Component: ({ value }) => <div>{value.title}</div>,
}
