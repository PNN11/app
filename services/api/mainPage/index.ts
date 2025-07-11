import { MainPage } from 'common-types/mainPage'
import { Pages } from 'common-types/pages'
import { authAxiosClient } from 'services/axios'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class PageService extends ApiService {
    getFAQ: RequestFn<{ page: Pages.Options }, MainPage.Faq[]> = async ({ page }) => {
        const response = await authAxiosClient.get(`/api/v01/leading/faq`, {
            params: {
                page,
            },
        })

        return response.data
    }

    getMainPageData: EmptyRequestFn<MainPage.GetMainPageDataResponse> = async () => {
        const response = await authAxiosClient.get(`/api/v01/leading`, {
            params: {
                page: 'main_page',
            },
        })

        return response.data
    }

    getPageContent: Pages.PagesRequestFunc = async params => {
        const response = await authAxiosClient.get('/api/v01/text', {
            params,
        })

        return response.data
    }
}

const pageService = new PageService()

export default pageService
