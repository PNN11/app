import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { etheruemBuyInternal } from 'utils/transactions/marketplaceTransactions/buy/internal'
import { BuyInternalFunc } from 'utils/types/blockchainHooks'

const buyFuncMap = new Map<Web3Core.EWalletProvider, BuyInternalFunc>([
    [Web3Core.EWalletProvider.METAMASK, etheruemBuyInternal],
    [Web3Core.EWalletProvider.OKX, etheruemBuyInternal],
    [Web3Core.EWalletProvider.BLOCTO, etheruemBuyInternal],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, etheruemBuyInternal],
])

const useGetBuyInternalFunc = (): BuyInternalFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const buyInternalFunc = buyFuncMap.get(activeWallet.providerId)

    if (!buyInternalFunc) {
        throw new Error(`Buy function for ${activeWallet.providerId} doesn't implemented`)
    }

    return buyInternalFunc
}

export default useGetBuyInternalFunc
