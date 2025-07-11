/* eslint-disable react/jsx-no-useless-fragment */
import { FC } from 'react'

import BinanceExpiredBadge from './badges/binance/expired'
import BinanceFailedBadge from './badges/binance/failed'
import BinancePendingBadge from './badges/binance/pending'
import BinanceSuccessBadge from './badges/binance/success'
import { BinanceBadgeProps } from './badges/binance/types'

import { Transaction } from 'common-types/transaction'
import { isBinanceTransaction } from 'utils/types/transactions'

interface Props {
    transaction: Transaction.PayInBinanceTransaction
}

type IApproveWrapperBinance = ({ transaction }: Props) => JSX.Element

const components = new Map<Transaction.PayInPaymentStatusCode, FC<BinanceBadgeProps>>([
    [Transaction.PayInPaymentStatusCode.FAILED, BinanceFailedBadge],
    [Transaction.PayInPaymentStatusCode.PENDING, BinancePendingBadge],
    [Transaction.PayInPaymentStatusCode.EXPIRED, BinanceExpiredBadge],
    [Transaction.PayInPaymentStatusCode.COMPLETE, BinanceSuccessBadge],
    [Transaction.PayInPaymentStatusCode.RECEIVED, null],
])

const BinanceBadge: IApproveWrapperBinance = ({ transaction }) => {
    if (!isBinanceTransaction(transaction)) throw new Error('Invalid transaction type')

    const Component = components.get(transaction.payload.status)

    if (!Component) {
        if (!components.has(transaction.payload.status))
            console.error(
                `Binance badge doesn't have component for status:${transaction.payload.status}`
            )

        return <></>
    }

    return <Component transaction={transaction} />
}

export default BinanceBadge
