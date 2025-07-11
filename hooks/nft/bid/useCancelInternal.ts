import { toast } from 'react-toastify'

import useTryOrApproveERC20 from '../../approve/erc-20/useTryOrApprove'
import { useAsyncWrapper } from '../../useAsyncWrapper'

import useGetCancelBidInternalFunc from './useGetCancelInternalFunc'

import { TxResult } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { CancelBidInternalFunc } from 'utils/types/blockchainHooks'

const useCancelBidInternal = (): {
    cancelBidInternal: CancelBidInternalFunc
    approveFinished: boolean
    cancelBidFinished: boolean
    cancelBidProcessing: boolean
    approveProcessing: boolean
} => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const cancelBid = useGetCancelBidInternalFunc()

    const tryOrApprove = useTryOrApproveERC20()

    const {
        finished: approveFinished,
        processing: approveProcessing,
        wrap: approveWrap,
        reset: approveReset,
    } = useAsyncWrapper()

    const {
        finished: cancelBidFinished,
        processing: cancelBidProcessing,
        wrap: cancelBidWrap,
        reset: cancelBidReset,
    } = useAsyncWrapper()

    const cancelBidInternal: CancelBidInternalFunc = async ({
        amount,
        decimals,
        lastListingId,
    }): Promise<TxResult> => {
        const [approveRes] = await approveWrap(async () => {
            const approveTx = await tryOrApprove({
                activeWallet,
                tokenAddress: process.env.NEXT_PUBLIC_MAIN_TOKEN,
                amount,
                decimals,
                approveAddress: process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            })

            if (approveTx === null) return { success: true }

            const approved = await activeWallet.waitForTx(approveTx?.hash)

            return approved
        }, null)()

        if (!approveRes?.success) {
            toast('Failed to get approve')
            approveReset()

            return
        }

        const [cancelBidRes] = await cancelBidWrap(async () => {
            const cancelBidTx = await cancelBid({
                activeWallet,
                listingId: lastListingId,
            })

            const canceled = await activeWallet.waitForTx(cancelBidTx?.hash)

            if (!canceled?.success) {
                toast('Failed to cancel bid')
                approveReset()
                cancelBidReset()
            }

            return canceled
        }, null)()

        return cancelBidRes
    }

    return {
        cancelBidInternal,
        approveFinished,
        approveProcessing,
        cancelBidFinished,
        cancelBidProcessing,
    }
}

export default useCancelBidInternal
