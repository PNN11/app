import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumBidInternal } from 'utils/transactions/marketplaceTransactions/bid/internal'
import { BidInternalFunc } from 'utils/types/blockchainHooks'

const bidFuncMap = new Map<Web3Core.EWalletProvider, BidInternalFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumBidInternal],
    [Web3Core.EWalletProvider.OKX, ethereumBidInternal],
    [Web3Core.EWalletProvider.BLOCTO, ethereumBidInternal],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumBidInternal],
])

const useGetBidInternalFunc = (): BidInternalFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const bidInternalFunc = bidFuncMap.get(activeWallet.providerId)

    if (!bidInternalFunc) {
        throw new Error(`Bid function for ${activeWallet.providerId} doesn't implemented`)
    }

    return bidInternalFunc
}

export default useGetBidInternalFunc
