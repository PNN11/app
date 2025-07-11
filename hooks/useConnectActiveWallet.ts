import { Web3Core } from 'common-types/web3core'
import { WalletAdapter } from 'services/wallets/types'
import useUserStore from 'store/useUserStore'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import useWalletStore from 'store/useWalletStore'

export const useConnectWallet = (): ((
    id: Web3Core.EChainID,
    activeWallet: WalletAdapter
) => Promise<string>) => {
    const userID = useUserStore(s => s.userId)
    const setWalletInfoState = useWalletInfoStore(state => state.setWalletInfoState)
    const setWalletProvider = useWalletInfoStore(state => state.setWalletProvider)
    const setWalletConnectInfoState = useWalletConnectInfoStore(
        state => state.setWalletConnectInfoState
    )

    return async (id, adapter) => {
        const address = await adapter.connect(id)

        if (!address) {
            return ''
        }

        setWalletInfoState({
            walletAddress: address,
            chainId: id,
            isCorrectChain: true,
        })
        setWalletProvider(userID, adapter.providerId)

        setWalletConnectInfoState({ isConnect: true })

        return address
    }
}

const useConnectActiveWallet = (): ((id: Web3Core.EChainID) => Promise<string>) => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const connectWallet = useConnectWallet()

    return async (id: Web3Core.EChainID): Promise<string> => {
        if (activeWallet) {
            return connectWallet(id, activeWallet)
        }

        return ''
    }
}

export default useConnectActiveWallet
