import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumMintInternal } from 'utils/transactions/marketplaceTransactions/mint/internal'
import { MintInternalFunc } from 'utils/types/blockchainHooks'

const mintFuncMap = new Map<Web3Core.EWalletProvider, MintInternalFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumMintInternal],
    [Web3Core.EWalletProvider.OKX, ethereumMintInternal],
    [Web3Core.EWalletProvider.BLOCTO, ethereumMintInternal],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumMintInternal],
])

const useMintInternal = (): MintInternalFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const mintInternalFunc = mintFuncMap.get(activeWallet.providerId)

    if (!mintInternalFunc) {
        throw new Error(`Mint function for ${activeWallet.providerId} doesn't implemented`)
    }

    return mintInternalFunc
}

export default useMintInternal
