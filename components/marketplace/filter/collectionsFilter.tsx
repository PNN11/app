import { FC, useMemo } from 'react'

import { useInfiniteQuery } from 'react-query'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { MarketplaceFilter, TCollectionsFilter } from './types'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { prod } from 'utils/environment'

export type GameType = {
    title: string
    icon: string
    _id: string
}

type PropsType = {}

const limit = 10

const defaultCollection = prod.value({
    _id: '64c7ee82f5ea4a7b650ef161',
    name: 'Arena Games Genesis',
})

export const CollectionsFilter: FC<PropsType> = () => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const mounted = useFilterStore(store => store.mounted)
    const [collectionsFilter, setCollectionsFilter] = useFilterState<
        Pick<MarketplaceFilter, 'collections'>,
        TCollectionsFilter
    >(
        store => store.collections,
        value => ({ collections: value }),
        {
            defaultValue: defaultCollection ? [defaultCollection] : [],
            remover: (prev, current) => prev.filter(item => item._id !== current._id) ?? [],
        }
    )

    const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
        QueryKeys.ALL_COLLECTIONS,
        ({ pageParam = 0, signal }) =>
            marketplaceService.getCollections({
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
            refetchOnWindowFocus: false,
            enabled: mounted,
        }
    )

    const collections = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as IMarketplaceCollection.TResponseBody[]),
        [data]
    )

    const handleAddCollectionToFilter = (
        collection: IMarketplaceCollection.TResponseBody
    ): void => {
        if (collectionsFilter.find(({ _id }) => collection._id === _id)) {
            setCollectionsFilter(
                collectionsFilter.filter(item => item._id !== collection._id) ?? []
            )

            return
        }

        setCollectionsFilter([
            ...(collectionsFilter ?? []),
            {
                _id: collection._id,
                name: (collection.payload as IMarketplaceCollection.TPayloadCreated).name,
            },
        ])
    }

    return (
        <AccordionFilterWrapper
            defaultOpenState
            isLoading={isLoading}
            isError={isError}
            items={collections}
            itemToKey={item => item._id}
            itemToLabel={item => (item.payload as IMarketplaceCollection.TPayloadCreated).name}
            title="Collections"
            itemToIcon={item => (item.payload as IMarketplaceCollection.TPayloadCreated).logo}
            isChecked={item => !!collectionsFilter.find(({ _id }) => item._id === _id)}
            onClickItem={handleAddCollectionToFilter}
            onReachEnd={fetchNextPage}
            renderIf={item => item._id !== '64ef2d91f3c09bb4463b4916'}
        />
    )
}

export const CollectionsPreview: FilterPreview<
    Pick<MarketplaceFilter, 'collections'>,
    TCollectionsFilter
> = {
    selector: store => store.collections,
    Component: ({ value }) => <div>{value.name}</div>,
}
