import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { Swap } from 'common-types/swap'
import { User } from 'common-types/user'
import { Web3Core } from 'common-types/web3core'
import { authAxiosClient } from 'services/axios'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'

export class UserService {
    getUserInfo: EmptyRequestFn<User.IProfile> = async () => {
        const response = await authAxiosClient.get('/api/v1/user/my-profile')

        return response.data
    }

    updateProfile: RequestFn<{ image?: string; username?: string }> = async ({
        image,
        username,
    }) => {
        await authAxiosClient.patch('/api/v1/user/my-profile', {
            image,
            username,
        })
    }

    getUserPrivileges: EmptyRequestFn<IMarketplaceToken.TBodyResponse['privileges']> = async () => {
        const response = await authAxiosClient.get('/api/v1/privileges')

        return response.data
    }

    getBalance: RequestFn<Swap.GetBalanceRequestParams, Swap.GetBalanceResponse> = async ({
        currenciesId,
    }) => {
        const response = await authAxiosClient.post('/api/v1/user/balance', { currenciesId })

        return response.data
    }

    getWalletInfo: EmptyRequestFn<Web3Core.WalletInfo> = async () => {
        const response = await authAxiosClient.get('/api/v1/cust-wallet/my-custodiall-wallet')

        return response.data
    }
}

const userService = new UserService()

export default userService
