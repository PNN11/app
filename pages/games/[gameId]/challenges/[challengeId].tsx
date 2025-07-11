import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Game } from 'common-types/game'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import PostContentWrapper from 'components/common/wrappers/postContentWrapper'
import PostPreview from 'components/postElements/postPreview'
import RichTextPreview from 'components/postElements/richTextPreview'
import { useLocation } from 'hooks/useLocation'
import { GameService } from 'services/api/game'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface ChallengePageProps {
    challenge: Game.Challenge
    challengeId: string
    gameId: string
}

const ChallengePage: NextPage<ChallengePageProps> = ({ challengeId, gameId }) => {
    const location = useLocation()
    const gameService = useServiceStore(store => store.gameService)

    const { data, isLoading, isError } = useQuery([QueryKeys.GET_CHALLENGE, challengeId], () =>
        gameService.getChallenge({
            challengeId,
            gameId,
        })
    )

    return (
        <>
            <Head>
                <title>{data.title}</title>
                <meta property="og:title" content={data.title} key="og:title" />
                <meta property="og:description" content={data.description} key="og:description" />
                <meta property="og:url" content={location?.href} key="og:url" />
                <meta property="og:image" content={data.preview.url} key="og:image" />

                <meta name="twitter:title" content={data.title} key="twitter:title" />
                <meta
                    name="twitter:description"
                    content={data.description}
                    key="twitter:description"
                />
                <meta name="twitter:site" content={location?.href} key="twitter:site" />
                <meta name="twitter:image" content={data.preview.url} key="twitter:image" />

                <meta name="description" content={data.description} key="description" />
            </Head>
            <PageWrapper>
                <Container>
                    {!isLoading && !isError && data && (
                        <PostContentWrapper>
                            <PostPreview
                                title={data.title}
                                createdAt={new Date(data.createdAt)?.valueOf()}
                                description={data.description}
                                preview={data.preview.url}
                            />
                            <RichTextPreview content={data.content} />
                        </PostContentWrapper>
                    )}
                </Container>
            </PageWrapper>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { challengeId, gameId } = query

    const queryClient = new QueryClient()
    const gameService = new GameService()

    await queryClient.prefetchQuery([QueryKeys.GAME_DATA, gameId], () =>
        gameService.getGame({ gameId: gameId as string })
    )

    const game = queryClient.getQueryData<Game.IGame>([QueryKeys.GAME_DATA, gameId])

    await queryClient.prefetchQuery([QueryKeys.GET_CHALLENGE, challengeId], () =>
        gameService.getChallenge({
            challengeId: challengeId as string,
            gameId: game?.id as string,
        })
    )

    return { props: { challengeId, gameId: game?.id, dehydratedState: dehydrate(queryClient) } }
}

export default ChallengePage
