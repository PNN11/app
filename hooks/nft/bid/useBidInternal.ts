import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useTryOrApproveERC20 from '../../approve/erc-20/useTryOrApprove'

import useGetBidInternalFunc from './useGetBidInternalFunc'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { HttpError } from 'utils/httpError'
import { withdrawValidationSchema } from 'utils/zod/validation'

const useBidInternalNft = (): {
    bidInternalNft: typeof bidInternalNft
    getLastBidLoading: boolean
    approveFinished: boolean
    approveProcessing: boolean
    bidFinished: boolean
    bidProcessing: boolean
    withdrawalProcessing: boolean
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
    const swapService = useServiceStore(store => store.swapService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const approve = useTryOrApproveERC20()
    const bid = useGetBidInternalFunc()

    const getLastBidMutation = useMutation(marketplaceService.getLastBid, {
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const withdraw = useMutation(swapService.withdrawal, {
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const bidInternalNft = async (
        nft: IMarketplaceToken.TBodyResponse,
        bidPrice: number
    ): Promise<TxResult> => {
        let bidAmount = bidPrice
        const lastBid = await getLastBidMutation.mutateAsync({ id: nft._id })

        if (lastBid?.amountPrice) {
            bidAmount = bidPrice - lastBid.amountPrice
        }

        const [approveRes] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'MINT') {
                const approveTx = await approve({
                    activeWallet,
                    tokenAddress: process.env.NEXT_PUBLIC_MAIN_TOKEN,
                    amount: bidAmount,
                    decimals: nft.currency.decimals ?? 18,
                    approveAddress: process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
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

        const withdrawalRes = await withdraw.mutateAsync({ amount: bidAmount })

        if (!withdrawValidationSchema.safeParse(withdrawalRes).success) {
            return
        }

        const [res] = await bidWrap(async () => {
            if (nft.collection.payload.type === 'MINT' && nft.payload.type === 'MINT') {
                const bidTx = await bid({
                    activeWallet,
                    bidPrice: bidAmount,
                    listingId: nft.payload.lastListingId,
                    decimals: nft.currency.decimals,
                    signature: withdrawalRes.payload.signature,
                    nonce: withdrawalRes.payload.nonce,
                })

                const betMaded = await activeWallet.waitForTx(bidTx?.hash)

                return betMaded
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
        bidInternalNft,
        approveFinished,
        approveProcessing,
        bidFinished,
        bidProcessing,
        getLastBidLoading: getLastBidMutation?.isLoading,
        withdrawalProcessing: withdraw.isLoading,
    }
}

export default useBidInternalNft
