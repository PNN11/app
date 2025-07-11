import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { useAsyncWrapper } from '../../useAsyncWrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { sendPurchaseNFTEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'

const useBuyNativeNft = (): {
    buyNativeNft: typeof buyNativeNft
    buyFinished: boolean
    buyProcessing: boolean
} => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const getBlockchainService = useGetRequiredBlockchainService()

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

    const buyNativeNft = async (nft: IMarketplaceToken.TBodyResponse): Promise<TxResult> => {
        if (
            nft.payload.type === 'MINT' &&
            nft.payload.dataTimeStop < Date.now() &&
            nft.payload.dataTimeStop !== 0
        ) {
            toast('NFT sale ended')

            return
        }

        const blockchainService = await getBlockchainService()

        const [buyRes, error] = await buyWrap(async () => {
            if (nft.payload.type === 'CREATED') {
                const token = await lazyMintMutation.mutateAsync({ id: nft._id })

                if (token.collection.payload.type === 'MINT') {
                    const timeStart = await blockchainService.getLastBlockTimeStamp(activeWallet)
                    const tx = await blockchainService.mintNative({
                        collectionAddress: token.collection.payload.address,
                        currency: token.currency.address,
                        decimals: token.currency.decimals,
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
                        buyReset()
                        throw new Error('Failed to mint token')
                    }

                    return minted
                }
            }

            if (nft.payload.type === 'MINT') {
                const tx = await blockchainService.buyNative({
                    listingId: nft.payload.lastListingId,
                    amount: nft.priceAmount,
                    decimals: nft.currency.decimals,
                })

                const buyTx = await blockchainService.sendTransaction({ activeWallet, tx })

                const sold = await activeWallet.waitForTx(buyTx?.hash)

                if (!sold?.success) {
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

    return { buyNativeNft, buyFinished, buyProcessing }
}

export default useBuyNativeNft
