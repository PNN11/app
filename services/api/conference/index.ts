import axiosClient, { authAxiosClient } from 'services/axios'
import { RequestFn } from 'utils/types/api'

export class ConferenceService {
    getRewardById: RequestFn<
        { id: string },
        { id: string; name: string; reward: { currencyId: string; count: number } }
    > = async ({ id }) => {
        const response = await authAxiosClient.post(`/api/v1/conferences/get-reward-by-id`, {
            receivingRemunerationId: id,
        })

        return response.data
    }

    isExistRewardById: RequestFn<{ id: string }, { isExists: boolean }> = async ({ id }) => {
        const response = await axiosClient.get(`/api/v1/conferences/is-exist-reward-by-id`, {
            params: { receivingRemunerationId: id },
        })

        return response.data
    }
}
