import { Core } from 'common-types/core'
import { IReferral } from 'common-types/referral'
import axiosClient, { authAxiosClient } from 'services/axios'
import { HttpError } from 'utils/httpError'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class ReferralService extends ApiService {
    bindReferralId: RequestFn<{ referralId: string }> = async ({ referralId }) => {
        const response = await authAxiosClient.post('/api/v1/referral/bind', { referralId })
    }

    validateReferralCode: RequestFn<{ code: string }, { isExists: boolean }> = async ({ code }) => {
        const response = await authAxiosClient.get(`/api/v1/referral/codes/${code}/exists`)

        return response.data
    }

    getCodes: RequestFn<{ limit: string; offset: string }, IReferral.GetManyCodesResponse> =
        async ({ limit, offset, signal }) => {
            const response = await authAxiosClient.get(
                `/api/v1/referral/codes?limit=${limit}&offset=${offset}`,
                { signal }
            )

            return response.data
        }

    generateCode: RequestFn<
        { name: string },
        {
            referralCode: string
            name: string
            url: string
        }
    > = async body => {
        const response = await authAxiosClient.post('/api/v1/referral/codes', body)

        return response.data
    }

    getRewards: EmptyRequestFn<IReferral.RewardsResponse> = async params => {
        const response = await authAxiosClient.get<IReferral.RewardsResponse>(
            '/api/v1/referral/list-claimed-rewards',
            {
                ...params,
            }
        )

        return response.data
    }

    claimReward: EmptyRequestFn<{ ok: boolean }> = async body => {
        const response = await authAxiosClient.post('/api/v1/referral/claim-reward', body)

        return response.data
    }
}

const referralService = new ReferralService()

export default referralService
