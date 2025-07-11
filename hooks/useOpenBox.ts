import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumOpenBox } from 'utils/transactions/marketplaceTransactions/ethereumOpenBox'
import { OpenBoxFunc } from 'utils/types/blockchainHooks'

const functionsMap = new Map<Web3Core.EWalletProvider, OpenBoxFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumOpenBox],
    [Web3Core.EWalletProvider.OKX, ethereumOpenBox],
    [Web3Core.EWalletProvider.BLOCTO, ethereumOpenBox],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumOpenBox],
])

const useOpenBox = (): OpenBoxFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const func = functionsMap.get(activeWallet.providerId)

    if (!func) {
        throw new Error(`Open bid function for ${activeWallet.providerId} not implemented`)
    }

    return func
}

export default useOpenBox
