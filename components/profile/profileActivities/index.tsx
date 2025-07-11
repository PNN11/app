import { FC, useState } from 'react'

import moment from 'moment'
import { useQuery } from 'react-query'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import Table from 'components/common/table'
import { Dropdown } from 'components/common/ui/dropdown'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import TableHeader from 'components/game/activities/tableHeader'
import TableRow from 'components/game/activities/tableRow'
import { tabList } from 'components/marketplace/nft/Activity/itemActivity'
import ProfileActivityTabButton from 'components/marketplace/nft/Activity/tokenActivityTabButton'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { priceHistoryOptions as timePeriods } from 'utils/constants/priceHistoryOptions'

const tableHeaders = ['Event', 'Item', 'Price (FTM)', 'From', 'To', 'Date']

const TimePeriodOptionLabel = ({ label }: { label: string }): JSX.Element => {
    return <span>{label}</span>
}

const ProfileActivities: FC = () => {
    const [page, setPage] = useState(0)
    const [limit] = useState(10)
    const [activeTab, setActiveTab] = useState('All')
    const [event, setEvent] = useState<IMarketplaceUserActivities.TEvents>(undefined)
    const [timePeriod, setTimePeriod] = useState(timePeriods[0])

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const userId = useUserStore(state => state.userId)

    const {
        data: profileActivities,
        isLoading,
        isError,
    } = useQuery(['profile-activities', userId, page, limit, event, timePeriod], ({ signal }) =>
        marketplaceService.getUserActivities({
            limit: limit.toString(),
            offset: (limit * page).toString(),
            event,
            userId,
            dateMin: timePeriod.timestamp,
            dateMax: moment().format('MM-DD-YYYY'),
            signal,
        })
    )

    return (
        <>
            <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center justify-center gap-x-2 ">
                    {tabList.map(({ Icon, title, event }) => {
                        return (
                            <ProfileActivityTabButton
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
                            </ProfileActivityTabButton>
                        )
                    })}
                </div>
                <Dropdown
                    items={timePeriods}
                    activeItem={timePeriod}
                    setActiveItem={setTimePeriod}
                    elementToLabel={TimePeriodOptionLabel}
                    classes={{ wrapper: `w-full md:w-55` }}
                />
            </div>
            <div className="mb-5 overflow-x-auto rounded-5 bg-base-700">
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
                        {!isLoading && !isError && profileActivities?.docs?.length
                            ? profileActivities.docs.map(activity => (
                                  <TableRow
                                      key={`${activity.from}${activity.to}${+activity.createdAt}`}
                                      activity={activity}
                                  />
                              ))
                            : null}
                        {!isLoading && !isError && !profileActivities.totalDocs ? (
                            <div className="my-2 text-center">No activities to display</div>
                        ) : null}
                    </div>
                    <Table.Scroll />
                </Table>
            </div>
            <PaginationBlock
                totalCount={profileActivities?.totalDocs}
                count={profileActivities?.docs?.length}
                page={page}
                setPage={setPage}
                pageSize={limit}
                isLoading={isLoading}
            />
        </>
    )
}

export default ProfileActivities
