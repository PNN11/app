import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { HttpError } from 'utils/httpError'

const useBidNftNative = (): {
    bidNative: typeof bidNative
    getLastBidLoading: boolean
    bidFinished: boolean
    bidProcessing: boolean
} => {
    const {
        finished: bidFinished,
        processing: bidProcessing,
        wrap: bidWrap,
        reset: bidReset,
    } = useAsyncWrapper()

    const marketplaceService = useServiceStore(store => store.marketplaceService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const getBlockchainService = useGetRequiredBlockchainService()

    const getLastBidMutation = useMutation(marketplaceService.getLastBid, {
        onError(error: HttpError) {
            toast(error.message)
        },
    })

    const bidNative = async (
        nft: IMarketplaceToken.TBodyResponse,
        bidPrice: number
    ): Promise<TxResult> => {
        let bidAmount = bidPrice
        const lastBid = await getLastBidMutation.mutateAsync({ id: nft._id })
        const blockchainService = await getBlockchainService()

        if (lastBid?.amountPrice) {
            bidAmount = bidPrice - lastBid.amountPrice
        }

        const [res] = await bidWrap(async () => {
            if (
                nft.collection.payload.type === MarketplaceCollectionType.MINT &&
                nft.payload.type === MarketplaceCollectionType.MINT
            ) {
                const tx = await blockchainService.bidNative({
                    bidPrice: bidAmount,
                    listingId: nft.payload.lastListingId,
                    decimals: nft.currency.decimals,
                })

                const bidTx = await blockchainService.sendTransaction({ activeWallet, tx })

                const bidTxResult = await activeWallet.waitForTx(bidTx?.hash)

                return bidTxResult
            }
        }, null)()

        if (!res?.success) {
            toast('Failed to bid!')

            bidReset()
        }

        return res
    }

    return {
        bidNative,
        bidFinished,
        bidProcessing,
        getLastBidLoading: getLastBidMutation?.isLoading,
    }
}

export default useBidNftNative
