import { GetServerSideProps, NextPage } from 'next'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Core } from 'common-types/core'
import NewsList from 'components/blog/newsList'
import MainPostPreview from 'components/common/postPreview/mainPost'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import { TPost } from 'components/postElements/postElements-types'
import { BlogService } from 'services/api/blog'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const Blog: NextPage = () => {
    const blogService = useServiceStore(store => store.blogService)

    const { data, isLoading } = useQuery(QueryKeys.GET_MAIN_NEWS, blogService.getMainNews)

    return (
        <PageWrapper className="pt-4">
            <Container>
                {!isLoading && data?.[0] && (
                    <div className="xl:mb-20">
                        <MainPostPreview postData={data[0]} />
                    </div>
                )}
                <BlockWrapper>
                    <NewsList />
                </BlockWrapper>
            </Container>
        </PageWrapper>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { gameId = '' } = context.query

    const queryClient = new QueryClient()
    const blogService = new BlogService()

    const allNewsPrefetch = queryClient.prefetchInfiniteQuery(QueryKeys.GET_ALL_NEWS, () =>
        blogService.getNews({
            limit: '8',
            offset: '0',
        })
    )

    const mainNewsPrefetch = queryClient.prefetchQuery(QueryKeys.GET_MAIN_NEWS, () =>
        blogService.getMainNews()
    )

    await Promise.allSettled([allNewsPrefetch, mainNewsPrefetch])

    queryClient.setQueryData(QueryKeys.GET_ALL_NEWS, (data: Core.PaginatedResponse<TPost>) => ({
        ...data,
        pageParams: [1],
    }))

    return {
        props: {
            gameId,
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Blog
