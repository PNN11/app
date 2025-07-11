import { FC } from 'react'

import { useQuery } from 'react-query'

import ChallengesList from './challengesList'

import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface ChallengesBlockProps {
    gameId: string
    enableRequest: boolean
    gameAddress: string
}

const ChallengesBlock: FC<ChallengesBlockProps> = ({ gameId, enableRequest, gameAddress }) => {
    const gameService = useServiceStore(store => store.gameService)

    const { data, isLoading } = useQuery(
        [QueryKeys.GET_CHALLENGES, gameId],
        () => gameService.getChallenges({ gameId, limit: '4', page: 1 }),
        {
            enabled: !!gameId && enableRequest,
        }
    )

    return data?.docs?.length ? (
        <BlockWrapper>
            <>
                <BlockTitle>Challenges</BlockTitle>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <ChallengesList
                        gameAddress={gameAddress}
                        isLoading={isLoading}
                        list={data?.docs}
                    />
                </div>
            </>
        </BlockWrapper>
    ) : null
}

export default ChallengesBlock
