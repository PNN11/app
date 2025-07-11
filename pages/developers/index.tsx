import { useMemo, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Core } from 'common-types/core'
import { Pages } from 'common-types/pages'
import { Container } from 'components/common/wrappers/container'
import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import Advantages from 'components/developers/advantages'
import ForDevelopersBanner from 'components/developers/banner'
import BecomePartner from 'components/developers/becomePartner'
import FeaturesForGames from 'components/developers/featuresForGames'
import ScholarshipProgram from 'components/developers/scholarship'
import SubmitGame from 'components/developers/submitGame'
import Testimonials from 'components/developers/testimonials'
import Faq from 'components/mainPage/faq/faq'
import GameFormModal from 'components/modals/partnership/gameForm'
import { useModal } from 'hooks/useModal'
import { partnersPageMock } from 'mock/partnersPage'
import { PageService } from 'services/api/mainPage'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const ForDevelopersPage: NextPage = () => {
    const [content] = useState(partnersPageMock)
    const pageService = useServiceStore(store => store.pageService)
    const { data: faq } = useQuery(QueryKeys.FOR_PARTNERS_FAQ, () =>
        pageService.getFAQ({ page: 'for_partners' })
    )

    const { data: pageContent } = useQuery(QueryKeys.FOR_PARTNERS_TEXT, () =>
        pageService.getPageContent({ page: 'for_partners', limit: '10', offset: '0' })
    )

    const textContent = useMemo(() => pageContent?.docs?.[0], [pageContent])

    const advantagesCards = useMemo(() => {
        if (textContent) {
            return [
                {
                    ...textContent.advantages.cards.firstCard,
                    image: content.advantages.cards.firstCard.image,
                },
                {
                    ...textContent.advantages.cards.secondCard,
                    image: content.advantages.cards.secondCard.image,
                },
                {
                    ...textContent.advantages.cards.thirdCard,
                    image: content.advantages.cards.thirdCard.image,
                },
                {
                    ...textContent.advantages.cards.fourthCard,
                    image: content.advantages.cards.fourthCard.image,
                },
                {
                    ...textContent.advantages.cards.fifthCard,
                    image: content.advantages.cards.fifthCard.image,
                },
            ]
        }
    }, [textContent, content])

    const featuresForGamesCards = useMemo(() => {
        if (textContent) {
            return {
                firstCard: {
                    ...textContent.featuresForGames.cards.firstCard,
                    ...content.featuresForGames.cards.firstCard,
                },
                secondCard: {
                    ...textContent.featuresForGames.cards.secondCard,
                    ...content.featuresForGames.cards.secondCard,
                },
                thirdCard: {
                    ...textContent.featuresForGames.cards.thirdCard,
                    ...content.featuresForGames.cards.thirdCard,
                },
                fourthCard: {
                    ...textContent.featuresForGames.cards.fourthCard,
                    ...content.featuresForGames.cards.fourthCard,
                },
            }
        }
    }, [textContent, content])

    const testimonialsCards = useMemo(() => {
        if (textContent) {
            return [
                {
                    logo: content.testimonials.cards.firstCard.logo,
                    text: textContent.testimonials.cards.firstCard.testimonial,
                    author: textContent.testimonials.cards.firstCard.author,
                },
                {
                    logo: content.testimonials.cards.secondCard.logo,
                    text: textContent.testimonials.cards.secondCard.testimonial,
                    author: textContent.testimonials.cards.secondCard.author,
                },
                {
                    logo: content.testimonials.cards.thirdCard.logo,
                    text: textContent.testimonials.cards.thirdCard.testimonial,
                    author: textContent.testimonials.cards.thirdCard.author,
                },
            ]
        }
    }, [textContent, content])

    const [isOpen, open, close] = useModal()

    return textContent ? (
        <PageWrapper className="md:mt-13">
            <NegativeTopMarginWrapper>
                <ForDevelopersBanner
                    {...content.banner}
                    {...textContent.banner}
                    onButtonCLick={open}
                />
            </NegativeTopMarginWrapper>
            <Container>
                <Advantages
                    {...textContent.advantages}
                    cards={advantagesCards}
                    onButtonClick={open}
                />
                <FeaturesForGames {...textContent.featuresForGames} cards={featuresForGamesCards} />
                <BecomePartner
                    title={textContent.becomePartner.title}
                    card={{
                        ...textContent.becomePartner.card,
                        actionButton: textContent.becomePartner.card.button,
                        image: content.becomePartner.image,
                    }}
                    onButtonClick={open}
                />
                <ScholarshipProgram
                    {...textContent.scholarship}
                    image={content.scholarship.image}
                    onButtonClick={open}
                />
                <Testimonials {...textContent.testimonials} cards={testimonialsCards} />
                <SubmitGame {...textContent.submitGame} onButtonClick={open} />
                <Faq items={faq} />
            </Container>
            <GameFormModal isOpen={isOpen} close={close} />
        </PageWrapper>
    ) : null
}

export const getServerSideProps: GetServerSideProps = async () => {
    const pageService = new PageService()
    const queryClient = new QueryClient()

    await Promise.allSettled([
        queryClient.prefetchQuery(QueryKeys.FOR_PARTNERS_FAQ, () =>
            pageService.getFAQ({ page: 'for_partners' })
        ),
        queryClient.prefetchQuery(QueryKeys.FOR_PARTNERS_TEXT, () =>
            pageService.getPageContent({ page: 'for_partners', limit: '10', offset: '0' })
        ),
    ])

    const content = queryClient.getQueryData<Core.PaginatedResponse<Pages.ForPartnersTextContet>>(
        QueryKeys.FOR_PARTNERS_TEXT
    )

    if (!content?.docs?.length) return { redirect: { destination: '/500', permanent: false } }

    return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default ForDevelopersPage
