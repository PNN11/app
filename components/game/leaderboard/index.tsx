/* eslint-disable react/no-array-index-key */
import { FC, ReactNode } from 'react'

import TableHeader from './table/tableHeader'
import TableRow from './table/tableRow'

import Table from 'components/common/table'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import useGetLeaderboard from 'hooks/useGetLeaderboard'

interface ILeaderboard {
    gameId: string
    className?: string
    enableRequest: boolean
    children?: ReactNode
}

const Leaderboard: FC<ILeaderboard> = ({ gameId, className, enableRequest, children }) => {
    const { data, isError, isLoading } = useGetLeaderboard({ enableRequest, gameId })

    return data?.top || data?.center || data?.bottom || isLoading ? (
        <BlockWrapper className={className}>
            <>
                <BlockTitle>Leaderboard</BlockTitle>
                <div className="mb-10 rounded-5 bg-base-700">
                    <Table>
                        <TableHeader />
                        <TableSkeletonLoader
                            columnsCount={2}
                            rowsCount={20}
                            isLoading={isLoading}
                            classes={{ row: 'border-t border-t-base-100/10' }}
                        />
                        <Table.Scroll />
                        {isError ? (
                            <div className="px-10 py-3 text-center">
                                {' '}
                                There was an error during fetching entries
                            </div>
                        ) : null}
                        {!isLoading && !isError && (
                            <div className="separate-leaderboard">
                                {data?.top ? (
                                    <div>
                                        {data.top.map(({ position, score, username }) => (
                                            <TableRow
                                                key={`leaderboardList${username}`}
                                                place={position}
                                                username={username}
                                                score={score}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                                {data?.center ? (
                                    <div className="before:px-10 before:py-2 after:bg-base-100/10">
                                        {data.center.map(({ position, score, username }) => (
                                            <TableRow
                                                key={`leaderboardList${username}`}
                                                place={position}
                                                username={username}
                                                score={score}
                                            />
                                        ))}
                                    </div>
                                ) : null}
                                {data?.bottom ? (
                                    <div className="before:px-10 before:py-2 after:bg-base-100/10">
                                        {data.bottom.map(({ position, score, username }) => (
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
                        <Table.Scroll />
                    </Table>
                </div>
                {children}
            </>
        </BlockWrapper>
    ) : null
}

export default Leaderboard
