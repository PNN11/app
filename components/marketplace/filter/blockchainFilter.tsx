import { FC } from 'react'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { GamesFilter, TBlockchainsFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'

const blockChains = ['Binance', 'Polygon']

const BlockchainFilter: FC = () => {
    const [blockchainFilter, setBlockchainFilter] = useFilterState<
        Pick<GamesFilter, 'blockchains'>,
        TBlockchainsFilter
    >(
        store => store.blockchains,
        value => ({ blockchains: value }),
        {
            defaultValue: [],
            remover: (prev, current) => prev.filter(item => item !== current) ?? [],
        }
    )

    const handleAddBlockchainToFilter = (blockchain: string): void => {
        if (blockchainFilter.find(item => blockchain === item)) {
            setBlockchainFilter(blockchainFilter.filter(item => item !== blockchain) ?? [])

            return
        }

        setBlockchainFilter([...(blockchainFilter ?? []), blockchain])
    }

    return (
        <AccordionFilterWrapper
            items={blockChains}
            itemToKey={item => item}
            itemToLabel={item => item}
            title="Blockchain"
            isChecked={item => !!blockchainFilter.find(blockchain => item === blockchain)}
            onClickItem={handleAddBlockchainToFilter}
        />
    )
}

export default BlockchainFilter

export const BlockchainPreview: FilterPreview<
    Pick<GamesFilter, 'blockchains'>,
    TBlockchainsFilter
> = {
    selector: store => store.blockchains,
    Component: ({ value }) => <div>{value}</div>,
}
