import { FC, useEffect, useState } from 'react'

import moment from 'moment'
import { useQuery } from 'react-query'

import FilterContainer from '../marketplace/filterContainer'

import TableHeader from './tableHeader'
import TableRow from './tableRow'

import { Game } from 'common-types/game'
import Table from 'components/common/table'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import EventsFilter from 'components/marketplace/filter/eventsFilter'
import FilterButtons from 'components/marketplace/filter/filterButtons'
import { MarketplaceFilter } from 'components/marketplace/filter/types'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import PriceHistoryBlock from 'components/marketplace/priceHistoryBlock'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { priceHistoryOptions } from 'utils/constants/priceHistoryOptions'

interface ActivitiesProps {
    game: Game.IGame
}

const tableHeaders = ['Event', 'Item', 'Price', 'From', 'To', 'Date']

const Activities: FC<ActivitiesProps> = ({ game }) => {
    const [priceHistoryOption, setPriceHistoryOption] = useState(priceHistoryOptions[0])
    const [page, setPage] = useState(0)
    const [limit] = useState(10)
    const [open, setOpen] = useState(false)

    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const events = useFilterStore(state => (state.filter as MarketplaceFilter).events)

    const {
        data: activities,
        isLoading,
        isError,
    } = useQuery(
        ['collection-activities', game?.id, page, limit, events],
        () =>
            marketplaceService.getCollectionActivities({
                limit: limit.toString(),
                offset: (limit * page).toString(),
                collectionId: game?.collections[0]?._id || '',
                events,
            }),
        { enabled: !!game?.collections[0]?._id }
    )

    const { data: priceHistory, isLoading: isPriceHistoryLoading } = useQuery(
        ['collection-price-history', priceHistoryOption, game?.id],
        () =>
            marketplaceService.getCollectionPriceHistory({
                collectionId: game?.id,
                dateMin: priceHistoryOption.timestamp,
                dateMax: moment().format('MM-DD-YYYY'),
            }),
        { enabled: !!game?.id, keepPreviousData: true }
    )

    useEffect(() => {
        setPage(0)
    }, [events])

    return (
        <>
            <div className="mx-auto grid grid-cols-1 gap-4 px-0 lg:grid-cols-marketplace-container">
                <FilterContainer open={open} setOpen={setOpen} className="lg:top-18">
                    <EventsFilter />
                </FilterContainer>

                <div className="mt-5">
                    <PriceHistoryBlock
                        priceHistoryOption={priceHistoryOption}
                        setPriceHistoryOption={setPriceHistoryOption}
                        priceHistory={priceHistory}
                        isLoading={isPriceHistoryLoading}
                        classes={{ chart: 'mb-7 h-44', wrapper: 'mb-7' }}
                    />
                    <div className="mb-3 overflow-x-auto rounded-5 bg-base-700">
                        <Table>
                            <TableHeader titles={tableHeaders} />
                            <Table.Scroll />
                            <div className="divide-y divide-white/10">
                                <TableSkeletonLoader
                                    isLoading={isLoading}
                                    rowsCount={limit}
                                    columnsCount={6}
                                    classes={{ row: 'h-14 py-4' }}
                                />
                                {!isLoading && !isError && activities?.docs?.length
                                    ? activities.docs.map(activity => (
                                          <TableRow
                                              key={`${activity.from}${
                                                  activity.to
                                              }${+activity.createdAt}`}
                                              activity={activity}
                                          />
                                      ))
                                    : null}
                                {!isLoading && !isError && !activities?.totalDocs ? (
                                    <div className="my-2 text-center">No activities to display</div>
                                ) : null}
                            </div>
                            <Table.Scroll />
                        </Table>
                    </div>
                    <PaginationBlock
                        totalCount={activities?.totalDocs}
                        count={activities?.docs?.length}
                        page={page}
                        setPage={setPage}
                        pageSize={limit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
            <FilterButtons open={open} setOpen={setOpen} />
        </>
    )
}

export default Activities
