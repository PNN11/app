import { FC } from 'react'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { MarketplaceFilter, TRarityFilter } from './types'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'

export type RarityItemType = {
    title: string
    value: IMarketplaceToken.RarityVariants
}

const rarityItems: RarityItemType[] = [
    {
        title: 'Legendary',
        value: 'legendary',
    },
    {
        title: 'Epic',
        value: 'epic',
    },
    {
        title: 'Rare',
        value: 'rare',
    },
    {
        title: 'Uncommon',
        value: 'uncommon',
    },
    {
        title: 'Common',
        value: 'common',
    },
]

const RarityFilter: FC = () => {
    const [rarity, setRarity] = useFilterState<Pick<MarketplaceFilter, 'rarity'>, TRarityFilter>(
        store => store.rarity,
        value => ({ rarity: value }),
        {
            defaultValue: [],
            remover: (value, current) => value.filter(item => item !== current),
        }
    )

    const handleAddEventToFilter = (event: RarityItemType): void => {
        if (rarity.includes(event.value)) {
            setRarity(rarity.filter(item => item !== event.value))

            return
        }

        setRarity([...(rarity ?? []), event.value])
    }

    return (
        <AccordionFilterWrapper
            items={rarityItems}
            itemToKey={item => item.title}
            itemToLabel={item => item.title}
            title="Rarity"
            isChecked={item => rarity.includes(item.value)}
            onClickItem={handleAddEventToFilter}
        />
    )
}

export default RarityFilter

export const RarityPreview: FilterPreview<Pick<MarketplaceFilter, 'rarity'>, TRarityFilter> = {
    selector: store => store.rarity,
    Component: ({ value }) => <div className="capitalize">{value}</div>,
}
