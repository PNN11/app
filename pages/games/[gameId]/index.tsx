import { FC, useMemo } from 'react'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Game as TGame } from 'common-types/game'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Tabs from 'components/common/tabs'
import { Container } from 'components/common/wrappers/container'
import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import BaseGameInfo from 'components/game/basicInfo'
import ChallengesTab from 'components/game/challengesBlock/challengesTab'
import { GameSwapBlock } from 'components/game/gameSwapBlock/gameSwapBlock'
import LeaderboardTab from 'components/game/leaderboard/tab'
import GameMarketplace from 'components/game/marketplace'
import OverviewTab from 'components/game/overviewTab'
import TabButton from 'components/game/tabButton'
import EShopTab from 'components/profile/eShopTab'
import { useLocation } from 'hooks/useLocation'
import { GameService } from 'services/api/game'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { GameTab, TabsList } from 'utils/types/tabs'

const mock = {
    challengeTitle: 'Challanges live',
}

type PropsType = {
    address: string
}

const Game: FC<PropsType> = ({ address }) => {
    const location = useLocation()
    const gameService = useServiceStore(store => store.gameService)

    const [tab, setTab] = useFilterState<GameTab, string>(
        store => store.gameTab,
        value => ({ gameTab: value })
    )

    const gameData = useQuery([QueryKeys.GAME_DATA, address], () =>
        gameService.getGame({ gameId: address })
    )

    const { data: gameTabs } = useQuery(
        QueryKeys.GET_GAME_TABS,
        () => gameService.getGameTabs({ gameId: gameData?.data?.id }),
        { enabled: !!gameData?.data?.id }
    )

    const url = useMemo(
        () => `${location?.origin}/games/${gameData.data.address}`,
        [location, gameData]
    )

    return (
        <>
            <Head>
                <title>{gameData.data.title}</title>
                <meta property="og:title" content={gameData.data.title} key="og:title" />
                <meta
                    property="og:description"
                    content={gameData.data.description}
                    key="og:description"
                />
                <meta property="og:url" content={url} key="og:url" />
                <meta property="og:image" content={gameData.data.preview} key="og:image" />

                <meta name="twitter:title" content={gameData.data.title} key="twitter:title" />
                <meta
                    name="twitter:description"
                    content={gameData.data.description}
                    key="twitter:description"
                />
                <meta name="twitter:site" content={url} key="twitter:site" />
                <meta name="twitter:image" content={gameData.data.preview} key="twitter:image" />

                <meta name="description" content={gameData.data.description} key="description" />
            </Head>
            <div className="bg-bg">
                <NegativeTopMarginWrapper>
                    <div className="relative mx-auto max-w-grid-container">
                        <Image
                            src={gameData?.data?.banner ?? '/img/games/default-banner.png'}
                            width={1440}
                            height={500}
                            priority
                            alt={gameData?.data?.title}
                            className="absolute inset-x-0 aspect-[14.4/5] min-h-[18.375rem] object-cover object-[15%] sm:object-left md:min-h-[31.25rem]"
                        />
                        <Image
                            src="/img/games/shapes.png"
                            width={1440}
                            height={500}
                            alt={gameData?.data?.title}
                            className="absolute inset-x-0 min-h-[18.375rem] object-cover object-[15%] sm:object-left md:min-h-[31.25rem]"
                        />
                    </div>
                </NegativeTopMarginWrapper>
                <Container className="relative pb-22 lg:pb-9">
                    <div className="relative mb-6 flex flex-col gap-x-4 pt-17.5 pb-11 md:grid md:grid-cols-8 md:items-center md:pt-32 lg:pt-22 xl:grid-cols-12">
                        <div className="contents w-full md:col-span-4 md:block xl:col-span-5">
                            <BaseGameInfo
                                game={{ ...gameData?.data, ...mock }}
                                isLoading={gameData.isLoading}
                            />
                        </div>
                        <GameSwapBlock
                            className="order-1 mt-3 md:order-none md:col-span-4 md:mt-0 xl:col-start-9"
                            game={gameData.data}
                            isLoading={gameData.isLoading}
                        />
                    </div>
                    <Tabs defaultTab={TabsList.OVERVIEW} value={tab} onChange={setTab}>
                        <div className="relative z-[2] -mx-3 flex items-center justify-center border-b border-b-base-300 border-opacity-20 px-4 sm:mx-0 sm:gap-5">
                            <TabButton name={TabsList.OVERVIEW}>{TabsList.OVERVIEW}</TabButton>
                            {gameTabs?.challenges && (
                                <TabButton name={TabsList.CHALLENGES}>
                                    {TabsList.CHALLENGES}
                                </TabButton>
                            )}
                            {gameTabs?.leaderboard && (
                                <TabButton name={TabsList.LEADERBOARD}>
                                    {TabsList.LEADERBOARD}
                                </TabButton>
                            )}
                            {gameTabs?.tokens && (
                                <TabButton name={TabsList.NFT}>{TabsList.NFT}</TabButton>
                            )}
                            <TabButton name={TabsList.E_SHOP}>{TabsList.E_SHOP}</TabButton>
                        </div>
                        <Tabs.Tab name={TabsList.OVERVIEW}>
                            <OverviewTab
                                game={gameData.data}
                                setTab={setTab}
                                enableLeaderboardRequest={
                                    gameTabs?.leaderboard &&
                                    (gameData?.isFetched || gameData?.isFetching)
                                }
                                enableChallengesRequest={gameTabs?.challenges}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab name={TabsList.CHALLENGES}>
                            <ChallengesTab
                                gameId={gameData?.data?.id}
                                gameAddress={gameData?.data?.address}
                            />
                        </Tabs.Tab>
                        <Tabs.Tab name={TabsList.NFT}>
                            <GameMarketplace game={gameData.data} />
                        </Tabs.Tab>
                        <Tabs.Tab name={TabsList.LEADERBOARD}>
                            <div className="mt-6">
                                <LeaderboardTab gameId={gameData?.data?.id} />
                            </div>
                        </Tabs.Tab>
                        <Tabs.Tab name={TabsList.E_SHOP}>
                            <EShopTab gameAlias={gameData.data.alias} />
                        </Tabs.Tab>
                    </Tabs>
                </Container>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { gameId = '' } = context.query

    const queryClient = new QueryClient()
    const gameService = new GameService()

    await queryClient.prefetchQuery([QueryKeys.GAME_DATA, gameId], () =>
        gameService.getGame({ gameId: gameId as string })
    )

    const game = queryClient.getQueryData<TGame.IGame>([QueryKeys.GAME_DATA, gameId])

    if (game && game?.address !== gameId) {
        return { redirect: { destination: `/games/${game.address}`, permanent: false } }
    }

    await queryClient.prefetchQuery(QueryKeys.GET_GAME_TABS, () =>
        gameService.getGameTabs({ gameId: game?.id })
    )

    return {
        props: {
            address: game?.address,
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default Game
