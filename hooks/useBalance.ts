import { useEffect } from 'react'

import { useQuery } from 'react-query'

import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { retryCount } from 'utils/constants/reactQuery'

const useBalance = (
    currencyId: string
): [balance: number, isLoading: boolean, refetch: () => void] => {
    const swapService = useServiceStore(state => state.swapService)
    const isAuth = useAuthStore(state => state.isAuth)
    const accessToken = useUserStore(store => store.accessToken)

    const {
        data = [],
        refetch,
        isLoading,
        remove,
    } = useQuery(
        `${currencyId}balance`,
        () => swapService.getBalance({ currenciesId: [currencyId] }),
        {
            retry: !!currencyId && retryCount,
            enabled: !!currencyId && isAuth && !!accessToken?.token,
            refetchInterval: 5000,
        }
    )

    useEffect(() => {
        if (!accessToken?.token) remove()
    }, [accessToken, remove])

    return [data[0]?.amount ?? 0, !isAuth || isLoading, refetch]
}

export default useBalance
