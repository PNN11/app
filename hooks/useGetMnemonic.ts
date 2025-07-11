import { UseQueryResult, useQuery } from 'react-query'

import useConnectActiveWallet from './useConnectActiveWallet'

import { Web3Core } from 'common-types/web3core'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import useWalletStore from 'store/useWalletStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import getChainId from 'utils/environment/getChainId'

const useGetMnemonic = (): UseQueryResult<Web3Core.WalletInfo, unknown> => {
    const userService = useServiceStore(store => store.userService)
    const activeWallet = useWalletStore(store => store.activeWallet)
    const isAuth = useAuthStore(state => state.isAuth)
    const accessToken = useUserStore(state => state.accessToken)
    const connectWallet = useConnectActiveWallet()

    const query = useQuery([QueryKeys.GET_USER_MNEMONIC], userService.getWalletInfo, {
        enabled: isAuth && !!accessToken,
        onSuccess(data) {
            activeWallet.setMnemonic(data.seed)
            connectWallet(getChainId())
        },
        refetchOnWindowFocus: false,
    })

    return query
}

export default useGetMnemonic
