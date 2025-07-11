import { useMemo, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Core } from 'common-types/core'
import { Pages } from 'common-types/pages'
import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import ArenaPasses from 'components/ino/arenaPasses'
import INOBanner from 'components/ino/banner'
import GenesisCollection from 'components/ino/genesisCollection'
import Privileges from 'components/ino/privileges'
import RegisterToWhitelist from 'components/ino/registerWhitelist'
import Faq from 'components/mainPage/faq/faq'
import { inoPageMock } from 'mock/inoPage'
import { PageService } from 'services/api/mainPage'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const INOPage: NextPage = () => {
    const [content] = useState(inoPageMock)

    const pageService = useServiceStore(store => store.pageService)
    const { data: faq } = useQuery(QueryKeys.INO_FAQ, () => pageService.getFAQ({ page: 'ino' }))

    const { data: pageContent } = useQuery(QueryKeys.INO_TEXT, () =>
        pageService.getPageContent({ page: 'ino', limit: '10', offset: '0' })
    )

    const textContent = useMemo(() => pageContent?.docs?.[0], [pageContent])

    const passes = useMemo(
        () =>
            textContent.arenaPasses.passes.map((item, index) => ({
                ...item.pass,
                image: content.arenaPasses.passes[index].image,
            })),
        [textContent, content]
    )

    const genesisCollectionCard = useMemo(() => {
        const description = textContent.genesisCollection.card.description.map((point, index) => ({
            ...point,
            icon: content.genesisCollection.card.description.points[index].icon,
        }))

        return {
            ...textContent.genesisCollection.card,
            image: content.genesisCollection.image,
            description,
        }
    }, [textContent, content])

    const perks = useMemo(() => {
        const description = textContent.privileges.perks.description.map((item, index) => ({
            ...item,
            icon: content.privileges.perks.description.points[index].icon,
        }))

        return {
            ...textContent.privileges.perks,
            description,
            image: content.privileges.perks.image,
            imageMobile: content.privileges.perks.imageMobile,
        }
    }, [textContent, content])

    const journey = useMemo(() => {
        const description = textContent.privileges.journey.description.map((item, index) => ({
            ...item,
            icon: content.privileges.journey.description.points[index].icon,
        }))

        return {
            ...textContent.privileges.journey,
            description,
            image: content.privileges.journey.image,
        }
    }, [textContent, content])

    return (
        <div>
            <NegativeTopMarginWrapper>
                <INOBanner {...content.banner} {...textContent.banner} />
            </NegativeTopMarginWrapper>
            <ArenaPasses
                title={textContent.arenaPasses.title}
                description={textContent.arenaPasses.description}
                passes={passes}
            />
            <GenesisCollection
                title={textContent.genesisCollection.title}
                description={textContent.genesisCollection.description}
                card={genesisCollectionCard}
            />
            <Privileges title={textContent.privileges.title} perks={perks} journey={journey} />
            <RegisterToWhitelist
                socials={textContent.socials}
                {...textContent.registerToWhitelist}
            />
            <Faq items={faq} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const pageService = new PageService()
    const queryClient = new QueryClient()

    await Promise.allSettled([
        queryClient.prefetchQuery(QueryKeys.INO_FAQ, () => pageService.getFAQ({ page: 'ino' })),
        queryClient.prefetchQuery(QueryKeys.INO_TEXT, () =>
            pageService.getPageContent({ page: 'ino', limit: '10', offset: '0' })
        ),
    ])

    const content = queryClient.getQueryData<Core.PaginatedResponse<Pages.INOPageTextContent>>(
        QueryKeys.INO_TEXT
    )

    if (!content?.docs?.length) return { redirect: { destination: '/500', permanent: false } }

    return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default INOPage
