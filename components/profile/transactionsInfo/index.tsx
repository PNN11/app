import { FC, useState } from 'react'

import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import WrapperBlock from '../wrapperBlock'

import TableRow from './table/tableRow'

import Table from 'components/common/table'
import TableHeader from 'components/marketplace/nft/table/tableHeader'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { HttpError } from 'utils/httpError'

const limit = 10
const tableHeaderTitles = ['Event', 'From', 'To', 'Amount', 'Date']
const TransactionsInfo: FC = () => {
    const swapService = useServiceStore(store => store.swapService)
    const isAuth = useAuthStore(state => state.isAuth)
    const accessToken = useUserStore(store => store.accessToken)

    const [page, setPage] = useState(0)

    const { data, isLoading } = useQuery(
        ['transactions', page, accessToken?.token],
        ({ signal }) =>
            swapService.getTransactions({
                limit,
                offset: page * limit,
                signal,
            }),
        {
            onError(error) {
                if (error instanceof HttpError) toast(error.message)
            },
            enabled: isAuth,
            refetchInterval: 10000,
            refetchOnWindowFocus: false,
        }
    )

    return (
        <WrapperBlock title="Transactions">
            <div className="divide-y divide-white/10 rounded-5 bg-base-700">
                <Table>
                    <TableHeader titles={tableHeaderTitles} />
                    <Table.Scroll />
                    <div className="grid w-full min-w-max grid-cols-1 divide-y divide-white/10 ">
                        {!isAuth || isLoading
                            ? Array(limit)
                                  .fill(undefined)
                                  .map((item, index) => (
                                      <div
                                          className="grid grid-cols-4 gap-4 py-2 px-5 text-base"
                                          key={+index}
                                      >
                                          <p className="skeleton-loading w-full" />
                                          <p className="skeleton-loading w-full" />
                                          <p className="skeleton-loading w-full" />
                                          <p className="skeleton-loading w-full" />
                                      </div>
                                  ))
                            : null}
                        {!isLoading && data?.totalDocs === 0 ? (
                            <div className="py-2 text-center">No transactions</div>
                        ) : null}
                        {!isLoading && data?.totalDocs > 0
                            ? data?.docs.map((item, index) => (
                                  <TableRow key={`transactionsList${+index}`} transaction={item} />
                              ))
                            : null}
                    </div>
                    <Table.Scroll />
                </Table>
                <PaginationBlock
                    totalCount={data?.totalDocs}
                    count={data?.docs?.length}
                    page={page}
                    setPage={setPage}
                    pageSize={limit}
                    isLoading={isLoading}
                    className="py-3 px-5 text-custom-xs"
                />
            </div>
        </WrapperBlock>
    )
}

export default TransactionsInfo
