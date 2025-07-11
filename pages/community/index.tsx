import { useMemo, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Core } from 'common-types/core'
import { Pages } from 'common-types/pages'
import { Container } from 'components/common/wrappers/container'
import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import BecomeAmbassador from 'components/community/becomeAmbassador'
import GamesCommunity from 'components/community/gamesCommunity'
import CommunityBanner from 'components/community/mainBanner'
import Rewards from 'components/community/rewards'
import Faq from 'components/mainPage/faq/faq'
import GamesBlock from 'components/mainPage/gamesBlock/gamesBlock'
import NewsBlock from 'components/mainPage/newsBlock/newsBlock'
import AmbassadorModal from 'components/modals/partnership/ambassador'
import { useModal } from 'hooks/useModal'
import { communityMock } from 'mock/communityPage'
import { PageService } from 'services/api/mainPage'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const Community: NextPage = () => {
    const [content] = useState(communityMock)
    const pageService = useServiceStore(store => store.pageService)
    const [isOpen, open, close] = useModal()

    const { data } = useQuery(QueryKeys.MAIN_PAGE_DATA, pageService.getMainPageData)

    const { data: faq } = useQuery(QueryKeys.FOR_COMMUNITY_FAQ, () =>
        pageService.getFAQ({ page: 'for_community' })
    )

    const { data: pageContent } = useQuery(QueryKeys.FOR_COMMUNITY_TEXT, () =>
        pageService.getPageContent({ page: 'for_community', limit: '10', offset: '0' })
    )

    const textContent = useMemo(() => pageContent?.docs?.[0], [pageContent])

    return textContent ? (
        <>
            <NegativeTopMarginWrapper>
                <CommunityBanner {...content.banner} {...textContent.banner} onButtonClick={open} />
            </NegativeTopMarginWrapper>
            <GamesBlock
                games={data?.games}
                title={textContent.games.title}
                subTitle={textContent.games.subTitle}
                description={textContent.games.description}
                actionButton={{
                    title: textContent.games.button,
                    link: '/games',
                    variant: 'contained',
                }}
            />
            <Container>
                <Rewards {...textContent.rewards} />
                <BecomeAmbassador {...textContent.becomeAmbassador} onButtonClick={open} />
                <GamesCommunity {...textContent.gamesCommunity} />
            </Container>
            <NewsBlock
                discordData={textContent.discord}
                twitterLink={textContent.twitterPostLink}
                socials={textContent.socials}
            />
            <Faq items={faq} />
            <AmbassadorModal isOpen={isOpen} close={close} />
        </>
    ) : null
}

export const getServerSideProps: GetServerSideProps = async () => {
    const pageService = new PageService()
    const queryClient = new QueryClient()

    await Promise.allSettled([
        queryClient.prefetchQuery(QueryKeys.MAIN_PAGE_DATA, pageService.getMainPageData),
        queryClient.prefetchQuery(QueryKeys.FOR_COMMUNITY_TEXT, () =>
            pageService.getPageContent({ page: 'for_community', limit: '10', offset: '0' })
        ),
        queryClient.prefetchQuery(QueryKeys.FOR_COMMUNITY_FAQ, () =>
            pageService.getFAQ({ page: 'for_community' })
        ),
    ])

    const content = queryClient.getQueryData<Core.PaginatedResponse<Pages.ForCommunityTextContent>>(
        QueryKeys.FOR_COMMUNITY_TEXT
    )

    if (!content?.docs?.length) return { redirect: { destination: '/500', permanent: false } }

    return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Community
