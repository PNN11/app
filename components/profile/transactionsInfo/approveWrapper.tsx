import { FC } from 'react'

import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import BinanceExpiredBadge from './badges/binance/expired'
import BinanceFailedBadge from './badges/binance/failed'
import BinanceSuccessBadge from './badges/binance/success'
import PendingBadge from './pendingBadge'

import { Transaction } from 'common-types/transaction'
import useRequireWallet from 'hooks/useRequireWallet'
import { useWithdraw } from 'hooks/useWithdraw'
import useWalletStore from 'store/useWalletStore'
import { IMetamaskError } from 'utils/types/error'
import { isERC20Transaction } from 'utils/types/transactions'

interface Props {
    transaction: Transaction.WithdrawTransaction | Transaction.PayInTransaction
}

type IApproveWrapper = ({ transaction }: Props) => JSX.Element

const components = new Map<
    Transaction.PayInPaymentStatusCode | Transaction.WithdrawalStatusCode,
    FC
>([
    [Transaction.PayInPaymentStatusCode.FAILED, BinanceFailedBadge],
    [Transaction.PayInPaymentStatusCode.EXPIRED, BinanceExpiredBadge],
    [Transaction.PayInPaymentStatusCode.COMPLETE, BinanceSuccessBadge],
    [Transaction.PayInPaymentStatusCode.RECEIVED, null],
    [Transaction.WithdrawalStatusCode.INIT, null],
    [Transaction.WithdrawalStatusCode.SUCCESS, BinanceSuccessBadge],
])

const ApproveWrapper: IApproveWrapper = ({ transaction }) => {
    if (!isERC20Transaction(transaction)) {
        throw new Error('Invalid transaction type')
    }

    const activeWallet = useWalletStore(store => store.activeWallet)
    const requireWallet = useRequireWallet()
    const withdraw = useWithdraw()

    const withdrawMutation = useMutation(withdraw, {
        onError(e: IMetamaskError) {
            toast(e.reason)
        },
    })

    const handleApproveRejectedTransactions = (): void => {
        withdrawMutation.mutate({
            params: {
                amount: transaction.amount,
                nonce: transaction?.payload?.nonce,
                signature: transaction?.payload.signature,
            },
            activeWallet,
        })
    }

    const handleClick = (): Promise<void> =>
        requireWallet(() => handleApproveRejectedTransactions(), transaction.payload.chainId)

    if (transaction.payload.status !== Transaction.PayInPaymentStatusCode.PENDING) {
        const Component = components.get(transaction.payload.status)

        if (!Component) {
            console.warn(
                `Erc20 transaction badge doesn't have component for status:${transaction.payload.status}`
            )

            return null
        }

        return <Component />
    }

    return <PendingBadge onClick={handleClick} />
}

export default ApproveWrapper
