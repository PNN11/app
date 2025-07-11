import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import PostContentWrapper from 'components/common/wrappers/postContentWrapper'
import { TPost } from 'components/postElements/postElements-types'
import PostPreview from 'components/postElements/postPreview'
import RichTextPreview from 'components/postElements/richTextPreview'
import { useLocation } from 'hooks/useLocation'
import { BlogService } from 'services/api/blog'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

interface PostPageProps {
    address: string
}
const PostPage: NextPage<PostPageProps> = ({ address }) => {
    const blogService = useServiceStore(store => store.blogService)
    const location = useLocation()

    const { data: post, isLoading } = useQuery([QueryKeys.GET_BLOG_POST, address], () =>
        blogService.getPost({ id: address })
    )

    const title = post?.seo?.title ?? post?.title

    const description = post?.seo?.metaDescription ?? post?.description

    const keywords = post?.seo?.keywords?.join(',')

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={post?.title} key="og:title" />
                <meta property="og:description" content={description} key="og:description" />
                <meta property="og:url" content={location?.href} key="og:url" />
                <meta property="og:image" content={post?.preview} key="og:image" />

                <meta name="twitter:title" content={post?.title} key="twitter:title" />
                <meta name="twitter:description" content={description} key="twitter:description" />
                <meta name="twitter:site" content={location?.href} key="twitter:site" />
                <meta name="twitter:image" content={post?.preview} key="twitter:image" />

                <meta name="description" content={description} key="description" />
                <meta name="keywords" content={keywords} />
            </Head>
            <PageWrapper>
                <Container>
                    <PostContentWrapper>
                        {!isLoading && post && (
                            <>
                                <PostPreview
                                    createdAt={post.createdAt}
                                    description={post.description}
                                    preview={post.preview}
                                    title={post.title}
                                    previewAlt={post?.previewAltText}
                                />
                                <RichTextPreview content={post?.content} />
                            </>
                        )}
                    </PostContentWrapper>
                </Container>
            </PageWrapper>
        </>
    )
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { category, post } = query

    const queryClient = new QueryClient()
    const blogService = new BlogService()

    await queryClient.prefetchQuery([QueryKeys.GET_BLOG_POST, post], () =>
        blogService.getPost({ id: post as string })
    )

    const postData = queryClient.getQueryData<TPost>([QueryKeys.GET_BLOG_POST, post])

    if (!postData || postData.status !== 'published') {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    }

    if (!category && postData) {
        return {
            redirect: {
                destination: `/blog/${postData.category}/${postData.address}`,
                permanent: false,
            },
        }
    }

    return { props: { address: post, dehydratedState: dehydrate(queryClient) } }
}
