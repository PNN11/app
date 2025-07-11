import { useEffect } from 'react'

import useConnectActiveWallet from './useConnectActiveWallet'

import { Web3Core } from 'common-types/web3core'
import useUserStore from 'store/useUserStore'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import getChainId from 'utils/environment/getChainId'

export const useConnectWalletAfterAccountsChanged = (): void => {
    const disconnect = useWalletInfoStore(state => state.disconnect)
    const _disconnect = useWalletConnectInfoStore(state => state.disconnect)
    const isConnect = useWalletConnectInfoStore(state => state.isConnect)
    const userId = useUserStore(state => state.userId)
    const walletProvider = useWalletInfoStore(state => state.walletProvider)

    const connectWallet = useConnectActiveWallet()

    useEffect(() => {
        const accountsChangedHandler = (accounts: string[]): void => {
            if (!accounts?.length) {
                disconnect()
                _disconnect()

                return
            }
            connectWallet(getChainId())
        }

        if (
            // @ts-ignore
            window?.ethereum &&
            isConnect &&
            walletProvider[userId] === Web3Core.EWalletProvider.METAMASK
        ) {
            // @ts-ignore
            window.ethereum.on('accountsChanged', accountsChangedHandler)
        }

        if (
            // @ts-ignore
            window?.okxwallet &&
            isConnect &&
            walletProvider[userId] === Web3Core.EWalletProvider.OKX
        ) {
            // @ts-ignore
            window.okxwallet.on('accountsChanged', accountsChangedHandler)
        }

        return () => {
            // @ts-ignore
            window.ethereum?.removeListener('accountsChanged', accountsChangedHandler)
            // @ts-ignore
            window.okxwallet?.removeListener('accountsChanged', accountsChangedHandler)
        }
    }, [walletProvider, userId, isConnect])
}
