import { FC } from 'react'

import { useQuery } from 'react-query'

import ChallengesBlock from './challengesBlock/challengesBlock'
import GameCharts from './gameCharts/gameCharts'
import Leaderboard from './leaderboard'
import GameOverview from './overview'

import { Game } from 'common-types/game'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import DiscordBlock from 'components/mainPage/discordBlock/discordBlock'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface OverviewProps {
    game: Game.IGame
    setTab: (value: string) => void
    enableLeaderboardRequest: boolean
    enableChallengesRequest: boolean
}

const Overview: FC<OverviewProps> = ({
    game,
    setTab,
    enableLeaderboardRequest,
    enableChallengesRequest,
}) => {
    const pageService = useServiceStore(store => store.pageService)

    const { data } = useQuery(QueryKeys.MAIN_PAGE_DATA, pageService.getMainPageData)

    return (
        <>
            <div className="mt-5">
                <GameOverview game={game} />
            </div>
            <ChallengesBlock
                gameId={game?.id}
                enableRequest={enableChallengesRequest}
                gameAddress={game?.address}
            />
            {/* <GetStartedBlock game={game} /> */}
            {/* <NftsBlock game={game} /> */}
            {game?.view?.isStatistics && <GameCharts game={game} />}
            <Leaderboard gameId={game?.id} enableRequest={enableLeaderboardRequest}>
                <div className="flex justify-center">
                    <SmallButton
                        onClick={() => {
                            window.scrollTo({ top: 0 })
                            setTab('Leaderboard')
                        }}
                        className="w-full sm:w-fit"
                        variant="outlined"
                    >
                        See All
                    </SmallButton>
                </div>
            </Leaderboard>
            {data && (
                <BlockWrapper>
                    <DiscordBlock background="bg-deep-blue" discordData={data.discord} />
                </BlockWrapper>
            )}
        </>
    )
}

export default Overview
