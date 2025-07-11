import { Auth } from 'common-types/auth'
import { Core } from 'common-types/core'
import { Web3Core } from 'common-types/web3core'
import { WheelCore } from 'common-types/wheel'
import axiosClient, { authAxiosClient } from 'services/axios'
import { HttpError } from 'utils/httpError'
import { RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class WheelService extends ApiService {
    getWheel: RequestFn<{ alias: string }, WheelCore.Wheel> = async ({ alias }) => {
        const response = await authAxiosClient.get<WheelCore.Wheel>(`/api/v1/wheel/${alias}`)

        return response.data
    }

    spin: RequestFn<{ alias: string }, WheelCore.SpinResult> = async ({ alias }) => {
        const response = await authAxiosClient.post<WheelCore.SpinResult>(
            `/api/v1/wheel/${alias}/spin`
        )

        return response.data
    }

    saveWinner: RequestFn<WheelCore.IWheelLogEntry, WheelCore.IWheelLogEntry & { _id: string }> =
        async body => {
            const response = await authAxiosClient.post<WheelCore.IWheelLogEntry & { _id: string }>(
                `/api/v01/raffle/log`,
                body
            )

            return response.data
        }

    getMyRewards: RequestFn<{ alias: string }, WheelCore.MyRewardsResponse> = async ({ alias }) => {
        const response = await authAxiosClient.get<WheelCore.MyRewardsResponse>(
            `/api/v1/wheel/${alias}/my-reward`
        )

        return response.data
    }
}
