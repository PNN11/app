import create from 'zustand'
import { persist } from 'zustand/middleware'

import { Web3Core } from 'common-types/web3core'
import getChainId from 'utils/environment/getChainId'

type UseWalletInfoStateType = {
    chainId: Web3Core.EChainID
    isCorrectChain: boolean
    walletAddress: string
    walletProvider: Record<string, Web3Core.EWalletProvider>
    autoConnectEnabled: boolean
}
type UseWalletInfoDispatchType = {
    disconnect: () => void
    setWalletInfoState: (walletInfoState: Partial<UseWalletInfoStateType>) => void
    setWalletProvider: (id: string, provider: Web3Core.EWalletProvider) => void
    getLastProvider: (id?: string) => Web3Core.EWalletProvider
}
type UseWalletInfoStoreType = UseWalletInfoStateType & UseWalletInfoDispatchType

const initialState: UseWalletInfoStateType = {
    chainId: getChainId(),
    isCorrectChain: false,
    walletAddress: '',
    walletProvider: {},
    autoConnectEnabled: true,
}

const useWalletInfoStore = create(
    persist<UseWalletInfoStoreType>(
        (set, get) => ({
            ...initialState,
            disconnect: () => {
                const { walletProvider } = get()

                set({ ...initialState, walletProvider, autoConnectEnabled: false })
            },
            setWalletInfoState: state => {
                set(state)
            },
            getLastProvider(id) {
                if (!id) return Web3Core.EWalletProvider.METAMASK

                const map = get().walletProvider
                const stored = map[id]

                return stored ?? Web3Core.EWalletProvider.METAMASK
            },
            setWalletProvider(id, provider) {
                const _prev = get().walletProvider

                set({ walletProvider: { ..._prev, [id]: provider } })
            },
        }),
        {
            name: 'wallet-info-state',
            version: 1,
        }
    )
)

export default useWalletInfoStore
