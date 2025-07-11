import { Transaction } from 'common-types/transaction'

export const isERC20Transaction = (
    transaction: Transaction.Transaction
): transaction is Transaction.WithdrawTransaction | Transaction.PayInTransaction => {
    return transaction.payload.type === 'ERC20'
}

export const isBinanceTransaction = (
    transaction: Transaction.Transaction
): transaction is Transaction.PayInBinanceTransaction => {
    return transaction.payload.type === 'BINANCE'
}

export interface GasPriceResponse {
    status: string
    message: string
    result: {
        LastBlock: string
        SafeGasPrice: string
        ProposeGasPrice: string
        FastGasPrice: string
        suggestBaseFee: string
        gasUsedRatio: string
    }
}
