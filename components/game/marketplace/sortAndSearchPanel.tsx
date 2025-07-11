import { FC } from 'react'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import { Dropdown } from 'components/common/ui/dropdown'
import { SearchInput } from 'components/common/ui/searchInput/searchInput'
import { MarketplaceFilter, TSortFilter } from 'components/marketplace/filter/types'

const SortLabel = ({ title }: TSortFilter): JSX.Element => {
    return <span>{title ?? 'Sort by'}</span>
}

type ISearchFilter = {
    searchText: string
}

interface SortAndSearchPanelProps {
    sortParams: TSortFilter[]
    defaultSortParam?: TSortFilter
}

const SortAndSearchPanel: FC<SortAndSearchPanelProps> = ({ sortParams, defaultSortParam }) => {
    const [searchValue, setSearchValue] = useFilterState<ISearchFilter, string>(
        store => store.searchText,
        value => ({ searchText: value }),
        { defaultValue: '' }
    )

    const [sort, setSort] = useFilterState<Pick<MarketplaceFilter, 'sort'>, TSortFilter>(
        store => store.sort,
        value => ({ sort: value }),
        { defaultValue: defaultSortParam ?? sortParams[0] }
    )

    const setActiveItem = (item: TSortFilter): void => {
        setSort(item)
    }

    return (
        <div className="flex w-full flex-col items-center gap-4 sm:max-w-[28rem] sm:flex-row">
            <SearchInput
                value={searchValue}
                setValue={setSearchValue}
                className="w-full sm:w-1/2"
                name="search"
            />
            <Dropdown
                placeholder="Sort by"
                classes={{ wrapper: 'w-full sm:w-1/2' }}
                items={sortParams}
                activeItem={sort}
                setActiveItem={setActiveItem}
                elementToLabel={SortLabel}
            />
        </div>
    )
}

export default SortAndSearchPanel

export const SortPreview: FilterPreview<MarketplaceFilter, TSortFilter> = {
    selector: store => store.sort,
    Component: ({ value }) => <div>{value?.title}</div>,
}
