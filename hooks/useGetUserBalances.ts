import { useEffect } from 'react'

import { useQuery } from 'react-query'

import { Economics } from 'common-types/economics'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { retryCount } from 'utils/constants/reactQuery'

type CurrencyWithAmount = Economics.IAsset & { amount: number }

const useGetUserBalances = (): [
    data: CurrencyWithAmount[],
    isLoading: boolean,
    refetch: () => void
] => {
    const userService = useServiceStore(state => state.userService)
    const isAuth = useAuthStore(state => state.isAuth)
    const accessToken = useUserStore(store => store.accessToken)
    const currencies = useUserStore(s => s.currencies)
    const currencyId = currencies.map(el => el._id)

    const { data, refetch, isLoading, remove } = useQuery(
        `${currencyId.join('')}balance`,
        () => userService.getBalance({ currenciesId: currencyId }),
        {
            retry: !!currencyId && retryCount,
            enabled: !!currencyId && isAuth && !!accessToken?.token,
            refetchInterval: 5000,
        }
    )

    useEffect(() => {
        if (!accessToken?.token) remove()
    }, [accessToken, remove])

    const currenciesWithAmount = currencies.map(curr => {
        const amount = data?.find(balance => balance.currencyId === curr._id)?.amount ?? 0

        return { ...curr, amount }
    })

    return [currenciesWithAmount, !isAuth || isLoading, refetch]
}

export default useGetUserBalances
