import { FC } from 'react'

import FilterWrapper from './filterWrapper'
import { MarketplaceFilter, TSaleStatusFilter, TStatusFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Switch from 'components/common/ui/switch'

const StatusFilter: FC = () => {
    const [status, setStatus] = useFilterState<Pick<MarketplaceFilter, 'status'>, TStatusFilter>(
        store => store.status,
        value => ({ status: value }),
        {
            defaultValue: ['BUY'],
            remover: (prev, current) => prev.filter(item => item !== current) ?? [],
        }
    )

    const [, setSaleStatus] = useFilterState<
        Pick<MarketplaceFilter, 'saleStatus'>,
        TSaleStatusFilter
    >(
        store => store.saleStatus,
        value => ({ saleStatus: value }),
        { defaultValue: 'SALE' }
    )

    const handleSetOnBuyNow = (): void => {
        if (status.find(item => item === 'BUY')) {
            setStatus(status.filter(item => item !== 'BUY'))
            setSaleStatus(undefined)

            return
        }

        setStatus([...(status ?? []), 'BUY'])
        setSaleStatus('SALE')
    }

    const handleSetOnAuction = (): void => {
        if (status.find(item => item === 'AUCTION')) {
            setStatus(status.filter(item => item !== 'AUCTION'))

            return
        }

        setStatus([...(status ?? []), 'AUCTION'])
    }

    return (
        <FilterWrapper>
            <Switch
                checked={!!status?.find(item => item === 'BUY')}
                label="Buy now"
                onChange={handleSetOnBuyNow}
                name="buyNow"
            />
            <Switch
                checked={!!status?.find(item => item === 'AUCTION')}
                label="On Auction"
                onChange={handleSetOnAuction}
                name="auction"
            />
        </FilterWrapper>
    )
}

export default StatusFilter

export const StatusPreview: FilterPreview<Pick<MarketplaceFilter, 'status'>, TStatusFilter> = {
    selector: store => store.status,
    Component: ({ value }) => <div>{value}</div>,
}
