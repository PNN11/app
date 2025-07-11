import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useTryOrApproveERC20 from '../../approve/erc-20/useTryOrApprove'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { contractsInfo } from 'services/blockchain/contracts/addresses'
import { TChainIds } from 'services/wallets/blockchainProvider'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { HttpError } from 'utils/httpError'

const useBidNft = (): {
    bidNft: typeof bidNft
    getLastBidLoading: boolean
    approveFinished: boolean
    approveProcessing: boolean
    bidFinished: boolean
    bidProcessing: boolean
} => {
    const {
        finished: approveFinished,
        processing: approveProcessing,
        wrap: approveWrap,
        reset: approveReset,
    } = useAsyncWrapper()
    const {
        finished: bidFinished,
        processing: bidProcessing,
        wrap: bidWrap,
        reset: bidReset,
    } = useAsyncWrapper()

    const marketplaceService = useServiceStore(store => store.marketplaceService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const approve = useTryOrApproveERC20()

    const getBlockchainService = useGetRequiredBlockchainService()

    const getLastBidMutation = useMutation(marketplaceService.getLastBid, {
        onError(error: HttpError) {
            toast(error.message)
        },
    })

    const bidNft = async (
        nft: IMarketplaceToken.TBodyResponse,
        bidPrice: number
    ): Promise<TxResult> => {
        let bidAmount = bidPrice
        const lastBid = await getLastBidMutation.mutateAsync({ id: nft._id })
        const blockchainService = await getBlockchainService()

        if (lastBid?.amountPrice) {
            bidAmount = bidPrice - lastBid.amountPrice
        }

        const [approveRes] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'MINT') {
                const approveTx = await approve({
                    activeWallet,
                    tokenAddress: nft.currency.address,
                    amount: bidAmount,
                    decimals: nft.currency.decimals ?? 18,
                    approveAddress: contractsInfo[nft.currency.chaiId as TChainIds].gallery,
                })

                if (approveTx === null) return { success: true }

                return activeWallet.waitForTx(approveTx?.hash)
            }
        }, null)()

        if (!approveRes?.success) {
            toast('Failed to get approve')
            approveReset()

            return
        }

        const [res] = await bidWrap(async () => {
            if (
                nft.collection.payload.type === MarketplaceCollectionType.MINT &&
                nft.payload.type === MarketplaceCollectionType.MINT
            ) {
                const tx = await blockchainService.bidERC20({
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
            approveReset()
            bidReset()
        }

        return res
    }

    return {
        bidNft,
        approveFinished,
        approveProcessing,
        bidFinished,
        bidProcessing,
        getLastBidLoading: getLastBidMutation?.isLoading,
    }
}

export default useBidNft
