import { FC } from 'react'

import FilterWrapper from './filterWrapper'
import { MarketplaceFilter, TSaleStatusFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Switch from 'components/common/ui/switch'

const SaleStatusFilter: FC = () => {
    const [saleStatus, setSaleStatus] = useFilterState<
        Pick<MarketplaceFilter, 'saleStatus'>,
        TSaleStatusFilter
    >(
        store => store.saleStatus,
        value => ({ saleStatus: value })
    )

    const handleChangeStatus = (): void => {
        if (saleStatus === 'SALE') {
            setSaleStatus(undefined)

            return
        }
        setSaleStatus('SALE')
    }

    return (
        <FilterWrapper>
            <Switch
                checked={saleStatus === 'SALE'}
                label="Only active tokens"
                onChange={handleChangeStatus}
            />
        </FilterWrapper>
    )
}

export default SaleStatusFilter

export const SaleStatusPreview: FilterPreview<Pick<MarketplaceFilter, 'saleStatus'>, string> = {
    selector: store => store.saleStatus,
    Component: ({ value }) => <div>{value}</div>,
}
