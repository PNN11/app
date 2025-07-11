import { FC } from 'react'

import ApproveWrapper from './approveWrapper'
import BinanceBadge from './approveWrapperBinance'

import { Transaction } from 'common-types/transaction'

interface ITypeMapper {
    transaction: Transaction.Transaction
}

const map = new Map<
    Transaction.PayloadType,
    (props: { transaction: Transaction.Transaction }) => JSX.Element
>([
    [Transaction.PayloadType.ERC20, ApproveWrapper],
    [Transaction.PayloadType.BINANCE, BinanceBadge],
])

const TypeMapper: FC<ITypeMapper> = ({ transaction }) => {
    const Component = map.get(transaction.payload.type)

    if (!Component) return null

    return <Component transaction={transaction} />
}

export default TypeMapper
