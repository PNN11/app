import { FC } from 'react'

import moment from 'moment'

import BinanceFailedBadge from '../badges/binance/failed'
import BinancePendingBadge from '../badges/binance/pending'
import BinanceSuccessBadge from '../badges/binance/success'

import { Transaction } from 'common-types/transaction'
import { getCurrencySymbol } from 'components/common/nftCard/currency/symbol'
import { maskInfo } from 'utils/mask-info'
import { numberFormatter } from 'utils/math/formatNumber'

interface ITableRow {
    transaction: Transaction.Transaction
}

const TableRow: FC<ITableRow> = ({ transaction }) => {
    return (
        <div className="grid-cols-minmax grid w-full min-w-max gap-x-4 py-2 px-5 text-base ">
            <div className="flex items-center space-x-2 capitalize">
                <span>{transaction.type.toLowerCase()}</span>
                {/* TODO: Сори на говно код, нужно было быстро задачу закрыть */}
                {/* Ссылка на ветку с правками */}
                {/* https://git.ldtc.space/arenavs/app/-/tree/feat/transaction-amount-to-display  */}
                {transaction.payload.status === 'FAILED' && <BinanceFailedBadge />}
                {transaction.payload.status === 'PENDING' && <BinancePendingBadge />}
                {transaction.payload.status === 'COMPLETE' && <BinanceSuccessBadge />}
            </div>
            <p className="">{maskInfo(transaction.from)}</p>
            <p className="">{maskInfo(transaction.to)}</p>
            <p className="flex space-x-2">
                {/* <Image src={icon || '/img/coin.svg'} alt="coin" width={16} height={16} /> */}
                <span>
                    {numberFormatter(transaction.amount, 0, 3)}{' '}
                    {getCurrencySymbol(transaction.currency)}
                </span>
            </p>
            <p>{moment(transaction.createdAt).fromNow()}</p>
        </div>
    )
}

export default TableRow
