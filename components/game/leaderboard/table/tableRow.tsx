import { FC } from 'react'

import Skeleton from 'components/common/skeleton'
import { Crown } from 'components/game/leaderboard/table/crown'
import useUserStore from 'store/useUserStore'

interface ITableRow {
    place: number
    username?: string
    score: number
    isLoading?: boolean
}

const TableRow: FC<ITableRow> = ({ place, username, score, isLoading }) => {
    const playername = useUserStore(store => store.userName)

    return (
        <div
            className={`flex justify-between gap-x-4 border-t border-t-base-100/10 py-2 px-10 text-base ${
                playername === username ? 'bg-base-600' : ''
            }`}
        >
            {username ? (
                <>
                    <Skeleton isLoading={isLoading}>
                        <div className="flex w-full gap-x-1 text-base-100">
                            <Crown place={place} />
                            <p>
                                <span className="mr-2 text-base-100">{place}</span>
                                {playername === username ? (
                                    <span className="text-base-100">You</span>
                                ) : (
                                    <span className="text-link">{username}</span>
                                )}
                            </p>
                        </div>
                    </Skeleton>
                    <Skeleton isLoading={isLoading}>
                        <p className={`w-full `}>{score}</p>
                    </Skeleton>
                </>
            ) : (
                <div className="w-full text-center">...</div>
            )}
        </div>
    )
}

export default TableRow
