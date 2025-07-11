import { FC, useEffect, useMemo } from 'react'

import { useQuery } from 'react-query'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { MarketplaceFilter, TCollectionsFilter, TTraitsFilter } from './types'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'

export type GameType = {
    title: string
    icon: string
    _id: string
}

type PropsType = {
    gameCollections?: TCollectionsFilter
}

const getCollectionId = (collections: TCollectionsFilter): string => {
    if (!collections?.length) return
    if (collections.length > 1) return

    return collections[0]._id
}

export const TraitsFilter: FC<PropsType> = ({ gameCollections }) => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const collections: TCollectionsFilter = useFilterStore(s => s.filter.collections)
    const collectionId = useMemo(
        () => getCollectionId(gameCollections ?? collections),
        [gameCollections, collections]
    )

    const {
        data: collection,
        isError,
        isLoading,
    } = useQuery(
        ['get-collection', collectionId],
        () =>
            marketplaceService.getCollection({
                collectionId,
            }),
        { enabled: !!collectionId }
    )

    const [traitsFilter, setTraitsFilter] = useFilterState<
        Pick<MarketplaceFilter, 'traits'>,
        TTraitsFilter
    >(
        store => store.traits,
        value => ({ traits: value }),
        {
            defaultValue: [],
            remover: (prev, current) => prev.filter(item => item._id !== current._id) ?? [],
        }
    )

    const handleAddTraitToFilter = (trait: IMarketplaceCollection.MarketplaceTokenTrait): void => {
        if (traitsFilter.find(({ _id }) => trait._id === _id)) {
            setTraitsFilter(traitsFilter.filter(item => item._id !== trait._id) ?? [])

            return
        }

        setTraitsFilter([...(traitsFilter ?? []), { _id: trait._id, value: trait.value }])
    }

    useEffect(() => {
        if (!collectionId && traitsFilter?.length) setTraitsFilter(undefined)
    }, [setTraitsFilter, traitsFilter, collectionId])

    return (
        <AccordionFilterWrapper
            isLoading={isLoading}
            isError={isError}
            defaultOpenState
            disabled
            items={collection?.traits}
            itemToKey={item => item._id}
            itemToLabel={item => item.value}
            title="Traits"
            isChecked={item => !!traitsFilter.find(({ _id }) => item._id === _id)}
            onClickItem={handleAddTraitToFilter}
            renderIf={item => item.value && item.value !== '0'}
        />
    )
}

export const TraitsPreview: FilterPreview<Pick<MarketplaceFilter, 'traits'>, TTraitsFilter> = {
    selector: store => store.traits,
    Component: ({ value }) => <div>{value.value}</div>,
}
