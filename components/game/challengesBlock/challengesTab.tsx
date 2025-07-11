import { FC, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

import ChallengesList from './challengesList'

import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface ChallengesTabProps {
    gameId: string
    gameAddress: string
}

const ChallengesTab: FC<ChallengesTabProps> = ({ gameId, gameAddress }) => {
    const gameService = useServiceStore(store => store.gameService)
    const [limit] = useState(8)

    const [skip, setSkip] = useState(true)

    const { ref, inView } = useInView({ threshold: 0, skip })

    const { data, isError, isLoading, fetchNextPage } = useInfiniteQuery(
        [QueryKeys.GET_ALL_CHALLENGES, gameId],
        ({ pageParam = 1, signal }) =>
            gameService.getChallenges({
                limit: limit.toString(),
                gameId,
                page: pageParam,
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage?.nextPage) return lastPage?.nextPage
            },
            enabled: !!gameId,
            onSuccess() {
                setSkip(false)
            },
        }
    )

    useEffect(() => {
        if (inView) fetchNextPage()
    }, [inView, fetchNextPage])

    return (
        <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {!isLoading &&
                    !isError &&
                    data?.pages &&
                    data.pages.map(page => (
                        <ChallengesList
                            gameAddress={gameAddress}
                            isLoading={isLoading}
                            list={page?.docs}
                            key={page.page}
                        />
                    ))}
            </div>
            <div ref={ref} />
        </>
    )
}

export default ChallengesTab
