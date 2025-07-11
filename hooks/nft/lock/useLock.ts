import { toast } from 'react-toastify'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useTryOrApproveERC721 from 'hooks/approve/erc-721/useTryOrApprove'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { contractsInfo } from 'services/blockchain/contracts/addresses'
import { TxResult } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { ethersContractExecutionError } from 'utils/errors/ethers'

type LockNftFunc = (nft: IMarketplaceToken.TBodyResponse) => Promise<TxResult>

const useLockNft = (): {
    lockNft: LockNftFunc
    processing: boolean
    approveProcessing: boolean
} => {
    const activeWallet = useWalletStore(store => store.activeWallet)

    const { wrap, processing, reset } = useAsyncWrapper()
    const {
        wrap: approveWrap,
        processing: approveProcessing,
        reset: approveReset,
    } = useAsyncWrapper()
    const approveToken = useTryOrApproveERC721()
    const getBlockchainService = useGetRequiredBlockchainService()

    const lockNft: LockNftFunc = async nft => {
        const blockchainService = await getBlockchainService()
        const [approveRes, approveError] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'CREATED' || nft.payload.type === 'CREATED') {
                return
            }
            const approveTx = await approveToken({
                collectionAddress: nft.collection.payload.address,
                tokenId: nft.payload.tokenId,
                approveAddress: contractsInfo[nft.payload.chainId].staking,
            })

            if (approveTx === null) return { success: true }

            const approveTxRes = await activeWallet.waitForTx(approveTx?.hash)

            return approveTxRes
        }, null)()

        if (approveError || !approveRes?.success) {
            toast(ethersContractExecutionError(approveError ?? approveRes?.error))
            approveReset()

            return
        }

        const [res, error] = await wrap(async () => {
            if (nft.collection.payload.type === 'CREATED' || nft.payload.type === 'CREATED') {
                return
            }
            const tx = await blockchainService.lock({
                collectionAddress: nft.collection.payload.address,
                tokenId: nft.payload.tokenId,
                walletAddress: await activeWallet.getAddress(),
            })

            const lockTx = await blockchainService.sendTransaction({ activeWallet, tx })

            if (lockTx?.hash)
                toast.success(
                    'Transaction in progress, you can close this window, NFT will staked after transaction will include to next block.'
                )

            const txRes = await activeWallet.waitForTx(lockTx?.hash)

            return txRes
        }, null)()

        if (error || !res?.success) {
            toast(ethersContractExecutionError(error ?? res?.error))
            approveReset()
            reset()

            return
        }

        return res
    }

    return { lockNft, processing, approveProcessing }
}

export default useLockNft
