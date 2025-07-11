import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { cancelBidInternal } from 'utils/transactions/marketplaceTransactions/bid/cancelInternal'
import { CancelBidFunc } from 'utils/types/blockchainHooks'

const cancelBidFuncMap = new Map<Web3Core.EWalletProvider, CancelBidFunc>([
    [Web3Core.EWalletProvider.METAMASK, cancelBidInternal],
    [Web3Core.EWalletProvider.OKX, cancelBidInternal],
    [Web3Core.EWalletProvider.BLOCTO, cancelBidInternal],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, cancelBidInternal],
])

const useGetCancelBidInternalFunc = (): CancelBidFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const cancelBidFunc = cancelBidFuncMap.get(activeWallet.providerId)

    if (!cancelBidFunc) {
        throw new Error(`Cancel bid function for ${activeWallet.providerId} doesn't implemented`)
    }

    return cancelBidFunc
}

export default useGetCancelBidInternalFunc
