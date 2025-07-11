import { FC, ReactElement, useMemo, useState } from 'react'

import Image from 'next/image'
import { useInfiniteQuery } from 'react-query'

import { FromToInputs } from './fromToInputs'
import { MarketplaceFilter } from './types'

import { Economics } from 'common-types/economics'
import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import AccordionWrapper from 'components/common/ui/accordionWrapper'
import { Dropdown } from 'components/common/ui/dropdown'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { prod } from 'utils/environment'

interface IPriceFilterProps {}

type TPriceFilter = Pick<MarketplaceFilter, 'price'>

const CurrencyLabel = ({
    icon,
    symbol,
}: TPriceFilter['price']['asset']): ReactElement<any, any> => {
    if (!icon && !symbol) return <div>Select currency</div>

    return (
        <div className="flex items-center gap-2">
            <Image src={icon} alt={`${symbol}icon`} width={20} height={20} />
            <div className="text-custom-sl">{symbol}</div>
        </div>
    )
}

const defaultAsset = prod.value(
    {
        _id: '64904c9cc3ab5bab0bbc0fcc',
        symbol: 'MATIC',
        icon: '/images/matic-icon.png',
    },
    { _id: '64905c7809325eae6365c56c', symbol: 'MATIC', icon: '/images/matic-icon.png' }
)

const PriceFilter: FC<IPriceFilterProps> = () => {
    const [limit] = useState(10)
    const mounted = useFilterStore(store => store.mounted)

    const swapService = useServiceStore(state => state.swapService)

    const [from, setFrom] = useFilterState<TPriceFilter, string>(
        store => store.price.from,
        value => ({ price: { from: value } }),
        { defaultValue: '' }
    )

    const [asset, setAsset] = useFilterState<TPriceFilter, TPriceFilter['price']['asset']>(
        store => store.price.asset,
        value => ({ price: { asset: value } }),
        { defaultValue: defaultAsset }
    )

    const [to, setTo] = useFilterState<TPriceFilter, string>(
        store => store.price.to,
        value => ({ price: { to: value } }),
        { defaultValue: '' }
    )

    const { data, fetchNextPage } = useInfiniteQuery(
        QueryKeys.ALL_ASSETS,
        ({ pageParam = 0, signal }) =>
            swapService.getAssets({
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

    const handleSetAsset = (value: Economics.IAsset): void => {
        setAsset({ _id: value._id, symbol: value.symbol, icon: value.icon })
    }

    const assets = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Economics.IAsset[]),
        [data]
    )

    return (
        <AccordionWrapper title="Price" classes={{ title: 'pb-2', wrapper: 'py-2' }}>
            <Dropdown
                items={assets}
                activeItem={asset}
                setActiveItem={handleSetAsset}
                elementToLabel={CurrencyLabel}
                placeholder="Select currency"
                onScrollEnd={fetchNextPage}
                classes={{ wrapper: 'mb-2 px-0.5' }}
            />
            <FromToInputs
                from={from}
                fromPlaceholder="0"
                setFrom={setFrom}
                validate="float"
                min={0}
                setTo={setTo}
                to={to}
                toPlaceholder="10 000"
            />
        </AccordionWrapper>
    )
}

export default PriceFilter

export const PriceFromPreview: FilterPreview<Pick<MarketplaceFilter, 'price'>, string> = {
    selector: store => store.price.from,
    Component: ({ value }) => <div>Min price: {value}</div>,
}

export const PriceToPreview: FilterPreview<Pick<MarketplaceFilter, 'price'>, string> = {
    selector: store => store.price.to,
    Component: ({ value }) => <div>Max price: {value}</div>,
}

export const PriceCurrencyPreview: FilterPreview<
    Pick<MarketplaceFilter, 'price'>,
    TPriceFilter['price']['asset']
> = {
    selector: store => store.price.asset,
    Component: ({ value }) => (
        <div className="flex items-center gap-1">
            <Image width={16} height={16} src={value.icon} alt="filter currency" />
            {value.symbol}
        </div>
    ),
}
