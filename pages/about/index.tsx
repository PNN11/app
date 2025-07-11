import { useMemo } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Core } from 'common-types/core'
import { Pages } from 'common-types/pages'
import Advisors from 'components/about/advisors'
import AboutUsMainScreen from 'components/about/mainBlock'
import Team from 'components/about/team'
import TransitionGames from 'components/about/transitionGames'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import { mockHomePageText } from 'mock/HomePage'
import { PageService } from 'services/api/mainPage'
import { useJoin } from 'store/join'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { TextContentType } from 'utils/types/TextContentType'

import 'aos/dist/aos.css'

type AboutProps = {
    dictionary: TextContentType
}

const About: NextPage<AboutProps> = () => {
    const pageService = useServiceStore(store => store.pageService)

    const { data: pageContent } = useQuery(QueryKeys.ABOUT_US_TEXT, () =>
        pageService.getPageContent({ page: 'about_us', limit: '10', offset: '0' })
    )

    const textContent = useMemo(() => pageContent?.docs?.[0], [pageContent])

    useJoin()

    return (
        <PageWrapper>
            {textContent && (
                <Container className="overflow-hidden">
                    <AboutUsMainScreen {...textContent.banner} />
                    <TransitionGames />
                    <Team {...textContent.team} />
                    <Advisors {...textContent.advisors} />
                </Container>
            )}
        </PageWrapper>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const dictionary = await Promise.resolve(mockHomePageText)

    const pageService = new PageService()
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(QueryKeys.ABOUT_US_TEXT, () =>
        pageService.getPageContent({ page: 'about_us', limit: '10', offset: '0' })
    )

    const content = queryClient.getQueryData<Core.PaginatedResponse<Pages.AboutUsTextContent>>(
        QueryKeys.ABOUT_US_TEXT
    )

    if (!content?.docs?.length) return { redirect: { destination: '/500', permanent: false } }

    return { props: { dictionary, dehydratedState: dehydrate(queryClient) } }
}

export default About
