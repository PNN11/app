import { FC } from 'react'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

import TableHeader from './table/tableHeader'
import TableRow from './table/tableRow'

import Table from 'components/common/table'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import { QueryKeys } from 'utils/constants/reactQuery'

interface Props {
    gameId: string
}

const limit = 15

const LeaderboardTab: FC<Props> = ({ gameId }) => {
    const gameService = useServiceStore(store => store.gameService)
    const isAuth = useAuthStore(state => state.isAuth)

    const { ref } = useInView({
        onChange: inView => {
            if (inView) fetchNextPage()
        },
    })

    const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        [QueryKeys.FULL_LEADERBOARD, gameId],
        ({ signal, pageParam = 0 }) =>
            gameService.getLeaderboard({
                game: gameId,
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                signal,
                defaultAroundPlayerLimit: '1',
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage?.pagination?.hasNextPage) return lastPage.pagination.nextPage
            },
            enabled: isAuth,
        }
    )

    const topList = data?.pages?.map(page => page?.top)?.flat()

    return (
        <BlockWrapper>
            <>
                <BlockTitle>Leaderboard</BlockTitle>
                <div className="mb-10 rounded-5 bg-base-700">
                    <Table>
                        <TableHeader />

                        <Table.Scroll />
                        {isError ? (
                            <div className="px-10 py-3 text-center">
                                {' '}
                                There was an error during fetching entries
                            </div>
                        ) : null}
                        {!isLoading && !isError && (
                            <div className="separate-leaderboard">
                                {topList?.length ? (
                                    <div>
                                        {topList.map(({ position, score, username }) => (
                                            <TableRow
                                                key={`leaderboardList${username}`}
                                                place={position}
                                                username={username}
                                                score={score}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        )}
                        <TableSkeletonLoader
                            columnsCount={2}
                            rowsCount={20}
                            isLoading={isLoading || isFetchingNextPage}
                            classes={{ row: 'border-t border-t-base-100/10' }}
                        />
                        <div ref={ref} />
                        <Table.Scroll />
                    </Table>
                </div>
            </>
        </BlockWrapper>
    )
}

export default LeaderboardTab
