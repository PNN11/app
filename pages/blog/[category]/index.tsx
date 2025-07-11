import { GetServerSideProps, NextPage } from 'next'
import { QueryClient } from 'react-query'

import PostPage from './[post]'

import { TPost } from 'components/postElements/postElements-types'
import { BlogService } from 'services/api/blog'
import { QueryKeys } from 'utils/constants/reactQuery'

interface PageProps {
    address: string
}

const BlogCategoryPage: NextPage<PageProps> = ({ address }) => {
    return <PostPage address={address} />
}

export default BlogCategoryPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { category } = query

    const queryClient = new QueryClient()
    const blogService = new BlogService()

    await queryClient.prefetchQuery([QueryKeys.GET_BLOG_POST, category], () =>
        blogService.getPost({ id: category as string })
    )

    const post = queryClient.getQueryData<TPost>([QueryKeys.GET_BLOG_POST, category])

    if (post) {
        if (post.status !== 'published') {
            return {
                redirect: {
                    destination: '/404',
                    permanent: false,
                },
            }
        }

        if (post.category === 'all' && category === post.address) {
            return { props: { address: category } }
        }

        return {
            redirect: {
                destination: `/blog/${post.category}/${post.address}`,
                statusCode: 301,
            },
        }
    }

    return { redirect: { destination: '/404', permanent: false } }
}
