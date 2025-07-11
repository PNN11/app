import { FC } from 'react'

import FilterWrapper from './filterWrapper'
import { FromToInputs } from './fromToInputs'
import { MarketplaceFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'

type TRankFilter = Pick<MarketplaceFilter, 'rank'>

const RankFilter: FC = () => {
    const [from, setFrom] = useFilterState<TRankFilter, string>(
        store => store.rank.from,
        value => ({ rank: { from: value } }),
        { defaultValue: '' }
    )

    const [to, setTo] = useFilterState<TRankFilter, string>(
        store => store.rank.to,
        value => ({ rank: { to: value } }),
        { defaultValue: '' }
    )

    return (
        <FilterWrapper>
            <span>Rank</span>
            <FromToInputs
                from={from}
                setFrom={setFrom}
                fromPlaceholder="1"
                min={1}
                to={to}
                setTo={setTo}
                toPlaceholder="10 000"
            />
        </FilterWrapper>
    )
}

export default RankFilter

export const RankFromPreview: FilterPreview<TRankFilter, string> = {
    selector: store => store.rank.from,
    Component: ({ value }) => <div>Min rank: {value}</div>,
}

export const RankToPreview: FilterPreview<TRankFilter, string> = {
    selector: store => store.rank.to,
    Component: ({ value }) => <div>Max rank: {value}</div>,
}
