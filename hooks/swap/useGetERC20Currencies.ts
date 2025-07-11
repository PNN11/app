import React, { useState } from 'react'

import { UseInfiniteQueryResult, useInfiniteQuery } from 'react-query'

import { Economics } from 'common-types/economics'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const useGetERC20Currencies = (
    chainId?: string
): UseInfiniteQueryResult<Economics.AssetsResponse, unknown> & {
    setLimit: React.Dispatch<React.SetStateAction<number>>
} => {
    const [limit, setLimit] = useState(20)
    const swapService = useServiceStore(s => s.swapService)
    const queryRes = useInfiniteQuery(
        [QueryKeys.GET_ERC20_ASSETS, limit, chainId],
        ({ signal, pageParam = 0 }) =>
            swapService.getAssets({
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                isVirtual: false,
                chainId,
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
        }
    )

    return { ...queryRes, setLimit }
}

export default useGetERC20Currencies
