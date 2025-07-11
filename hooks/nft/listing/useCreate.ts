import { toast } from 'react-toastify'

import useTryOrApproveERC721 from '../../approve/erc-721/useTryOrApprove'
import { useAsyncWrapper } from '../../useAsyncWrapper'

import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { TxResult } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { ListingNftParams } from 'utils/types/blockchainHooks'

type ListNFT = (params: Omit<ListingNftParams, 'activeWallet'>) => Promise<TxResult>

const useListingNft = (): {
    listingNft: ListNFT
    approveFinished: boolean
    processingApprove: boolean
    listingFinished: boolean
    processingListing: boolean
} => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const approveListing = useTryOrApproveERC721()

    const getBlockchainService = useGetRequiredBlockchainService()
    const {
        finished: approveFinished,
        processing: processingApprove,
        wrap: approveWrap,
        reset: approveReset,
    } = useAsyncWrapper()
    const {
        finished: listingFinished,
        processing: processingListing,
        wrap: listingWrap,
        reset: listingReset,
    } = useAsyncWrapper()

    const listingNft: ListNFT = async ({ nft, txInfo }) => {
        const blockchainService = await getBlockchainService()
        const [approveRes, approveError] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'CREATED') return
            if (nft.payload.type === 'CREATED') return

            const approveTx = await approveListing({
                collectionAddress: nft.collection.payload.address,
                tokenId: nft.payload.tokenId,
            })

            if (approveTx === null) return { success: true }

            return activeWallet.waitForTx(approveTx?.hash)
        }, null)()

        if (!approveRes?.success) {
            toast(ethersContractExecutionError(approveError))
            approveReset()
            listingReset()

            return
        }
        const [listingRes, listingError] = await listingWrap(async () => {
            if (nft.collection.payload.type === 'CREATED') return
            if (nft.payload.type === 'CREATED') return
            const tx = await blockchainService.createListing({
                collectionAddress: nft.collection.payload.address,
                currency: txInfo.coin,
                decimals: nft.currency.decimals,
                listingType: txInfo.listingType,
                minimalBid: txInfo.priceValue,
                timeStart: Math.floor(txInfo.startDate.valueOf() / 1000),
                timeEnd: Math.floor(txInfo.stopDate.valueOf() / 1000),
                tokenId: nft.payload.tokenId,
            })

            const listingTx = await blockchainService.sendTransaction({ activeWallet, tx })

            return activeWallet.waitForTx(listingTx?.hash)
        }, null)()

        if (!listingRes?.success) {
            toast(ethersContractExecutionError(listingError))
            approveReset()
            listingReset()
        }

        return listingRes
    }

    return { listingNft, approveFinished, processingApprove, listingFinished, processingListing }
}

export default useListingNft
