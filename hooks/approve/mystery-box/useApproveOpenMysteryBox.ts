import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumApproveOpenMysteryBox } from 'utils/transactions/marketplaceTransactions/approve/mystery-box'
import { ApproveOpenMysteryBoxFunc } from 'utils/types/blockchainHooks'

const approveMysteryBoxFuncMap = new Map<Web3Core.EWalletProvider, ApproveOpenMysteryBoxFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumApproveOpenMysteryBox],
    [Web3Core.EWalletProvider.OKX, ethereumApproveOpenMysteryBox],
    [Web3Core.EWalletProvider.BLOCTO, ethereumApproveOpenMysteryBox],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumApproveOpenMysteryBox],
])

const useApproveOpenMysteryBox = (): ApproveOpenMysteryBoxFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const approveOpenMysteryBoxFunc = approveMysteryBoxFuncMap.get(activeWallet.providerId)

    if (!approveOpenMysteryBoxFunc) {
        throw new Error(
            `Approve open mystery box function for ${activeWallet.providerId} doesn't implemented`
        )
    }

    return approveOpenMysteryBoxFunc
}

export default useApproveOpenMysteryBox
