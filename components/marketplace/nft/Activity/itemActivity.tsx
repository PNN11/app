import { FC, useState } from 'react'

import { useQuery } from 'react-query'

import TableHeader from '../table/tableHeader'
import TableRow from '../table/tableRow'

import TokenActivityTabButton from './tokenActivityTabButton'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import Table from 'components/common/table'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import { ListingsIcon } from 'components/svg/listingsIcon'
import MintedIcon from 'components/svg/mintedIcon'
import SalesIcon from 'components/svg/salesIcon'
import TransfersIcon from 'components/svg/transfersIcon'
import useServiceStore from 'store/service'

interface ItemActivityProps {
    tokenId: string
}

export type ActivityTabsList = {
    title: string
    Icon?: FC
    event?: IMarketplaceUserActivities.TEvents
}[]

export const tabList: ActivityTabsList = [
    {
        title: 'All',
        Icon: undefined,
        event: undefined,
    },
    {
        title: 'Listings',
        Icon: ListingsIcon,
        event: 'LIST',
    },
    {
        title: 'Sales',
        Icon: SalesIcon,
        event: 'SALE',
    },
    {
        title: 'Transfers',
        Icon: TransfersIcon,
        event: 'TRANSFER',
    },
    {
        title: 'Minted',
        Icon: MintedIcon,
        event: 'MINTED',
    },
    {
        title: 'Bids',
        Icon: TransfersIcon,
        event: 'BID',
    },
]

const tableHeaders = ['Event', 'Price', 'From', 'To', 'Date']

const ItemActivity: FC<ItemActivityProps> = ({ tokenId }) => {
    const [page, setPage] = useState(0)
    const [limit] = useState(15)
    const [activeTab, setActiveTab] = useState('All')
    const [event, setEvent] = useState<IMarketplaceUserActivities.TEvents>(undefined)

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const {
        data: activities,
        isLoading,
        isError,
    } = useQuery(
        ['token-activities', tokenId, page, event, limit],
        ({ signal }) =>
            marketplaceService.getTokenActivities({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                tokenId,
                event,
                signal,
            }),
        {
            enabled: !!tokenId,
        }
    )

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-center gap-x-2">
                {tabList.map(({ Icon, title, event }) => {
                    return (
                        <TokenActivityTabButton
                            onClick={() => {
                                setActiveTab(title)
                                setEvent(event)
                            }}
                            active={activeTab === title}
                            name={title}
                            key={title}
                        >
                            {Icon ? <Icon /> : null}
                            <p>{title}</p>
                        </TokenActivityTabButton>
                    )
                })}
            </div>

            <div className="mb-3 overflow-x-auto rounded-5 bg-base-700">
                <Table>
                    <TableHeader titles={tableHeaders} />
                    <Table.Scroll />
                    <div className="divide-y divide-white/10">
                        <TableSkeletonLoader
                            isLoading={isLoading}
                            rowsCount={limit}
                            columnsCount={5}
                            classes={{ row: 'h-10' }}
                        />
                        {!isLoading && !isError && activities.docs.length
                            ? activities.docs.map(activity => (
                                  <TableRow
                                      key={`${activity.from}${activity.to}${+activity.createdAt}`}
                                      activity={activity}
                                  />
                              ))
                            : null}
                        {!isLoading && !isError && !activities.totalDocs ? (
                            <div className="my-2 text-center">No activities to display</div>
                        ) : null}
                    </div>
                    <Table.Scroll />
                </Table>
            </div>
            <PaginationBlock
                totalCount={activities?.totalDocs}
                page={page}
                setPage={setPage}
                pageSize={limit}
                count={activities?.docs?.length}
                isLoading={isLoading}
            />
        </div>
    )
}

export default ItemActivity
