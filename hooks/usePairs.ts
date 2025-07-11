import { useMemo } from 'react'

import { InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query'

import { Economics } from '../common-types/economics/index'

import useServiceStore from 'store/service'

const usePairs = (
    _asset: string,
    limit: number
): [
    Economics.IAsset[],
    Economics.IPair[],
    () => Promise<InfiniteQueryObserverResult<Economics.AssetsPairResponse, unknown>>
] => {
    const swapService = useServiceStore(state => state.swapService)

    // const { data } = useQuery(
    //     `${_asset}${limit}${offset}pairs`,
    //     () => swapService.getPairs({ limit, offset, fromCurrency: _asset }),
    //     { enabled: !!_asset }
    // )

    const { data, fetchNextPage } = useInfiniteQuery(
        [_asset, limit, 'pairs'],
        ({ pageParam = 0, signal }) =>
            swapService.getPairs({
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                fromCurrency: _asset,
                signal,
            }),
        {
            enabled: !!_asset,
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
        }
    )

    const pairs = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Economics.IPair[]),
        [data]
    )

    const assetPairs = useMemo(() => pairs?.map(item => item.toCurrency), [pairs])

    return [assetPairs, pairs, fetchNextPage]
}

export default usePairs
