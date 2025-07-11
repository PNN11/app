import { useCallback } from 'react'

import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { contractsInfo } from 'services/blockchain/contracts/addresses'
import { TxBase } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { ApproveListingParams } from 'utils/types/blockchainHooks'

export type TryOrApproveFunction = (
    params: Omit<ApproveListingParams, 'approveAddress' | 'activeWallet'> & {
        approveAddress?: string
    }
) => Promise<TxBase | null>

const useTryOrApproveERC721 = (): TryOrApproveFunction => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const getBlockchainService = useGetRequiredBlockchainService()

    const callback: TryOrApproveFunction = useCallback(
        async ({ collectionAddress, tokenId, approveAddress: _approveAddress }) => {
            const blockChainService = await getBlockchainService()
            const chainId = await activeWallet.getChainId()
            const approveAddress = _approveAddress ?? contractsInfo[chainId].gallery
            const _address = await blockChainService.allowanceERC721({
                collectionAddress,
                tokenId,
                activeWallet,
            })

            if (_address === approveAddress) return null

            const approveTx = await blockChainService.approveERC721({
                collectionAddress,
                tokenId,
                approveAddress,
            })

            const approveResult = await blockChainService.sendTransaction({
                activeWallet,
                tx: approveTx,
            })

            return approveResult
        },
        [activeWallet, getBlockchainService]
    )

    return callback
}

export default useTryOrApproveERC721
