import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumApprovedAddressERC721 } from 'utils/transactions/marketplaceTransactions/allowance/erc721'
import { AllowanceERC721Func } from 'utils/types/blockchainHooks'

const functionMap = new Map<Web3Core.EWalletProvider, AllowanceERC721Func>([
    [Web3Core.EWalletProvider.METAMASK, ethereumApprovedAddressERC721],
    [Web3Core.EWalletProvider.OKX, ethereumApprovedAddressERC721],
    [Web3Core.EWalletProvider.BLOCTO, ethereumApprovedAddressERC721],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumApprovedAddressERC721],
])

const useAllowenceERC721 = (): AllowanceERC721Func => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const func = functionMap.get(activeWallet.providerId)

    if (!func) {
        throw new Error(
            `ERC-721:Approved address function for ${activeWallet.providerId} not implemented`
        )
    }

    return func
}

export default useAllowenceERC721
