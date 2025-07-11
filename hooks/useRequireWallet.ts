import { useCallback } from 'react'

import { Web3Core } from 'common-types/web3core'
import { WalletAdapter } from 'services/wallets/types'
import useUserStore from 'store/useUserStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import useWalletStore from 'store/useWalletStore'

export const useRequireOrBindWallet = (
    adapter: WalletAdapter
): ((callback: () => void, chainId: Web3Core.EChainID) => Promise<void>) => {
    const walletAddress = useWalletInfoStore(state => state.walletAddress)
    const wallets = useUserStore(state => state.wallets)

    // const { bindWallet, checkBindWallet } = useBindWallet(adapter)

    const func = useCallback(
        async (callback: () => void, chainId: Web3Core.EChainID) => {
            let address = walletAddress
            const currentAddress = await adapter.getAddress()
            // TODO: add check for existence of wallet extension/provider
            // Okx fails when trying to getChainId if not istalled

            if (!address || currentAddress !== address) {
                address = await adapter.connect(chainId)
            }

            console.log({ address1: address })
            console.log({ adapter })

            const currentChain = await adapter.getChainId()

            if (!!chainId && currentChain !== chainId) {
                address = await adapter.connect(chainId)
            }

            console.log({ address })

            if (!address) {
                console.log('NO address')

                return
            }

            // if (checkBindWallet(address, chainId)) {
            //     callback()

            //     return
            // }

            // const binded = await bindWallet(address, chainId)

            // if (binded) {
            //     callback()
            // }
            callback()
        },
        [wallets]
    )

    return func
}

const useRequireWallet = (): ((callback: any, chainId: Web3Core.EChainID) => Promise<void>) => {
    const activeWallet = useWalletStore(s => s.activeWallet)
    const func = useRequireOrBindWallet(activeWallet)

    return async (callback: any, chainId: Web3Core.EChainID) => func(callback, chainId)
}

export default useRequireWallet
