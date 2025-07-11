import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import { accessTokenKey, refreshTokenKey } from 'utils/constants/auth'

import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useUserStore from 'store/useUserStore'
import useWalletInfoStore from 'store/useWalletInfoStore'

export const useDisconnectAndLogout = () => {
    const router = useRouter()
    const clearConnectWalletState = useWalletConnectInfoStore(store => store.disconnect)
    const disconnect = useUserStore(state => state.disconnect)
    const disconnectWallet = useWalletInfoStore(state => state.disconnect)

    const logOut = async (): Promise<void> => {
        deleteCookie(refreshTokenKey)
        deleteCookie(accessTokenKey)
        clearConnectWalletState()
        await disconnect()
        disconnectWallet()
        clearConnectWalletState()
        await router.push('/auth/sign-in')
    }

    const handleDisconnectWallet = (): void => {
        disconnectWallet()
        clearConnectWalletState()
    }

    return { logOut, handleDisconnectWallet }
}
