import create from 'zustand'

import { Web3Core } from 'common-types/web3core'
import { CustodialETHWalletAdapter } from 'services/wallets/custodialETHWalletAdapter'
import { WalletAdapter } from 'services/wallets/types'

// const metamask = new MetamaskAdapter()
// const oks = new OkxAdapter()
// const blocto = new BloctoAdapter()
const custodialETHWallet = new CustodialETHWalletAdapter()

const adaptersMap = new Map<Web3Core.EWalletProvider, WalletAdapter>([
    // [Web3Core.EWalletProvider.METAMASK, metamask],
    // [Web3Core.EWalletProvider.OKX, oks],
    // [Web3Core.EWalletProvider.BLOCTO, blocto],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, custodialETHWallet],
])

type UseWalletType = {
    activeWallet: WalletAdapter
    adapters: Map<Web3Core.EWalletProvider, WalletAdapter>
    switchWallet: (activeWallet: WalletAdapter) => void
}

const useWalletStore = create<UseWalletType>(set => ({
    activeWallet: custodialETHWallet,
    adapters: adaptersMap,
    switchWallet: (activeWallet: WalletAdapter) => {
        set({ activeWallet })
    },
}))

export default useWalletStore
