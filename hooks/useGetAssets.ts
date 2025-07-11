import { useState } from 'react'

import { useQuery, UseQueryResult } from 'react-query'

import { Core } from 'common-types/core'
import { Economics } from 'common-types/economics'
import useServiceStore from 'store/service'

const useGetAssets = (): UseQueryResult<Core.PaginatedResponse<Economics.IAsset>, unknown> => {
    const [page] = useState(0)
    const [limit] = useState(10)

    const swapService = useServiceStore(state => state.swapService)

    return useQuery(['allAssets', page], () =>
        swapService.getAssets({ limit: limit.toString(), offset: (page * 10).toString() })
    )
}

export default useGetAssets
