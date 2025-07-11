import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useTryOrApproveERC20 from '../../approve/erc-20/useTryOrApprove'
import { useAsyncWrapper } from '../../useAsyncWrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { contractsInfo } from 'services/blockchain/contracts/addresses'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { sendPurchaseNFTEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'

const useBuyNft = (): {
    buyNft: typeof buyNft
    approveFinished: boolean
    approveProcessing: boolean
    buyFinished: boolean
    buyProcessing: boolean
} => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const tryOrApprove = useTryOrApproveERC20()
    const getBlockchainService = useGetRequiredBlockchainService()

    const {
        finished: approveFinished,
        processing: approveProcessing,
        wrap: approveWrap,
        reset: approveReset,
    } = useAsyncWrapper()

    const {
        finished: buyFinished,
        processing: buyProcessing,
        wrap: buyWrap,
        reset: buyReset,
    } = useAsyncWrapper()

    const lazyMintMutation = useMutation(marketplaceService.lazyMint, {
        onError(error: HttpError) {
            toast(error.message)
        },
    })

    const buyNft = async (nft: IMarketplaceToken.TBodyResponse): Promise<TxResult> => {
        if (
            nft.payload.type === 'MINT' &&
            nft.payload.dataTimeStop < Date.now() &&
            nft.payload.dataTimeStop !== 0
        ) {
            throw new Error('NFT sale ended')
        }

        const blockchainService = await getBlockchainService()

        const [approveRes] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'MINT') {
                const addressForApprove =
                    nft.payload.type === 'CREATED'
                        ? nft.collection.payload.address
                        : contractsInfo[nft.currency.chaiId].gallery

                const approveTx = await tryOrApprove({
                    activeWallet,
                    tokenAddress: nft.currency.address,
                    amount: nft.priceAmount,
                    decimals: nft.currency.decimals,
                    approveAddress: addressForApprove,
                })

                if (approveTx === null) return { success: true }

                const approved = await activeWallet.waitForTx(approveTx?.hash)

                return approved
            }
        }, null)()

        if (!approveRes?.success) {
            approveReset()
            throw new Error('Failed to get approve')
        }

        const [buyRes, error] = await buyWrap(async () => {
            if (nft.payload.type === 'CREATED') {
                const token = await lazyMintMutation.mutateAsync({ id: nft._id })

                if (token.collection.payload.type === 'MINT') {
                    const timeStart = await blockchainService.getLastBlockTimeStamp(activeWallet)
                    const tx = await blockchainService.mintERC20({
                        collectionAddress: token.collection.payload.address,
                        currency: token.currency.address,
                        decimals: token.currency.decimals ?? 18,
                        nonce: token.nonce,
                        price: token.priceAmount,
                        signature: token.signature,
                        timeEnd: 0,
                        timeStart,
                        tokenUri: token.payload.metadataURI,
                    })

                    const mintTx = await blockchainService.sendTransaction({ activeWallet, tx })

                    const minted = await activeWallet.waitForTx(mintTx?.hash)

                    if (!minted?.success) {
                        approveReset()
                        buyReset()
                        throw new Error('Failed to mint token')
                    }

                    sendPurchaseNFTEvent(nft, mintTx.hash)

                    return minted
                }
            }

            if (nft.payload.type === 'MINT') {
                const tx = await blockchainService.buyERC20({
                    listingId: nft.payload.lastListingId,
                })

                const buyTx = await blockchainService.sendTransaction({ activeWallet, tx })

                const sold = await activeWallet.waitForTx(buyTx?.hash)

                if (!sold?.success) {
                    approveReset()
                    buyReset()
                    throw new Error('Failed to buy')
                }

                sendPurchaseNFTEvent(nft, buyTx.hash)

                return sold
            }
        }, null)()

        if (error) {
            toast(error.message)

            return
        }

        return buyRes
    }

    return { buyNft, approveFinished, buyFinished, buyProcessing, approveProcessing }
}

export default useBuyNft
