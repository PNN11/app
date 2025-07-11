import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useTryOrApproveERC20 from '../../approve/erc-20/useTryOrApprove'
import { useAsyncWrapper } from '../../useAsyncWrapper'
import useMintInternal from '../mint/useGetInternalFunc'

import useGetBuyInternalFunc from './useGetBuyInternalFunc'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { TxResult } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'
import { sendPurchaseNFTEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'
import { withdrawValidationSchema } from 'utils/zod/validation'

const useBuyInternalNft = (): {
    buyInternalNft: (nft: IMarketplaceToken.TBodyResponse) => Promise<TxResult>
    approveFinished: boolean
    buyFinished: boolean
    buyProcessing: boolean
    approveProcessing: boolean
    withdrawalProccesing: boolean
} => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const swapService = useServiceStore(state => state.swapService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const mintToken = useMintInternal()
    const buy = useGetBuyInternalFunc()

    const tryOrApprove = useTryOrApproveERC20()

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
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const withdraw = useMutation(swapService.withdrawal, {
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const buyInternalNft = async (nft: IMarketplaceToken.TBodyResponse): Promise<TxResult> => {
        if (
            nft.payload.type === 'MINT' &&
            nft.payload.dataTimeStop < Date.now() &&
            nft.payload.dataTimeStop !== 0
        ) {
            toast('NFT sale ended')

            return
        }

        const [approveRes] = await approveWrap(async () => {
            if (nft.collection.payload.type === 'MINT') {
                const addressForApprove =
                    nft.payload.type === 'CREATED'
                        ? nft.collection.payload.address
                        : process.env.NEXT_PUBLIC_GALLERY_CONTRACT

                const approveTx = await tryOrApprove({
                    activeWallet,
                    tokenAddress: process.env.NEXT_PUBLIC_MAIN_TOKEN,
                    amount: nft.priceAmount,
                    decimals: nft.currency.decimals ?? 18,
                    approveAddress: addressForApprove,
                })

                if (approveTx === null) return { success: true }

                const approved = await activeWallet.waitForTx(approveTx?.hash)

                return approved
            }
        }, null)()

        if (!approveRes?.success) {
            toast('Failed to get approve')
            approveReset()
            buyReset()

            return
        }

        const withdrawalRes = await withdraw.mutateAsync({ amount: nft.priceAmount })

        if (!withdrawValidationSchema.safeParse(withdrawalRes).success) {
            return
        }

        const [buyRes, error] = await buyWrap(async () => {
            if (nft.payload.type === 'CREATED') {
                const token = await lazyMintMutation.mutateAsync({ id: nft._id })

                if (token.collection.payload.type === 'MINT') {
                    const mintTx = await mintToken({
                        activeWallet,
                        collectionAddress: token.collection.payload.address,
                        currency: token.currency.address ?? process.env.NEXT_PUBLIC_MAIN_TOKEN,
                        decimals: token.currency.decimals ?? 18,
                        nonce: withdrawalRes.payload.nonce,
                        price: token.priceAmount,
                        signature: withdrawalRes.payload.signature,
                        timeEnd: 0,
                        timeStart: Math.floor(Date.now() / 1000),
                        tokenUri: token.payload.metadataURI,
                        nonceCollection: token.nonce,
                        signatureCollection: token.signature,
                    })

                    const minted = await activeWallet.waitForTx(mintTx?.hash)

                    if (!minted?.success) {
                        approveReset()
                        throw new Error('Failed to mint token')
                    }

                    sendPurchaseNFTEvent(nft, mintTx.hash)

                    return minted
                }
            }

            if (nft.payload.type === 'MINT') {
                const buyTx = await buy({
                    listingId: nft.payload.lastListingId,
                    activeWallet,
                    decimals: nft.currency.decimals,
                    amount: nft.priceAmount,
                    nonce: withdrawalRes.payload.nonce,
                    signature: withdrawalRes.payload.signature,
                })

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

    return {
        buyInternalNft,
        approveFinished,
        buyFinished,
        buyProcessing,
        approveProcessing,
        withdrawalProccesing: withdraw.isLoading,
    }
}

export default useBuyInternalNft
