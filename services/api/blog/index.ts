import { Core } from 'common-types/core'
import { MainPostResponse, TPost } from 'components/postElements/postElements-types'
import { authAxiosClient } from 'services/axios'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class BlogService extends ApiService {
    getNews: RequestFn<{ limit: string; offset: string }, Core.PaginatedResponse<TPost>> = async ({
        limit,
        offset,
        signal,
    }) => {
        const response = await authAxiosClient.get('/api/v1/leading/blog', {
            params: { limit, offset },
            signal,
        })

        return response.data
    }

    getPost: RequestFn<{ id: string }, TPost> = async ({ id }) => {
        const response = await authAxiosClient.get(`/api/v1/leading/blog/${id}`)

        return response.data
    }

    getMainNews: EmptyRequestFn<MainPostResponse> = async () => {
        const response = await authAxiosClient.get(`/api/v01/leading/main-news`)

        return response.data
    }
}

const blogService = new BlogService()

export default blogService
