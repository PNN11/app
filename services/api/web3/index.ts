import { Auth } from 'common-types/auth'
import { Core } from 'common-types/core'
import { Web3Core } from 'common-types/web3core'
import axiosClient, { authAxiosClient } from 'services/axios'
import { HttpError } from 'utils/httpError'
import { RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class Web3Service extends ApiService {
    getNonceMessage: RequestFn<
        { chainId: Web3Core.EChainID; address: string },
        Web3Core.TNonceResponse
    > = async ({ address, chainId }) => {
        const response = await axiosClient.post<Web3Core.TNonceResponse>(
            '/api/v1/web3-auth/nonce',
            {
                chainId,
                address,
            }
        )

        return response.data
    }

    signIn: RequestFn<
        {
            chainId: Web3Core.EChainID
            address: string
            provider: Web3Core.EWalletProvider
            signature: string
        },
        Auth.TJwtTokensResponse
    > = async ({ chainId, address, provider, signature }) => {
        const response = await axiosClient.post<Auth.TJwtTokensResponse>(
            '/api/v1/web3-auth/sign-in',
            {
                chainId,
                address,
                provider,
                signature,
            }
        )

        return response.data
    }

    bindProfile: RequestFn<{
        chainId: Web3Core.EChainID
        address: string
        provider: Web3Core.EWalletProvider
        signature: string
    }> = async ({ chainId, address, provider, signature }) => {
        const response = await authAxiosClient.post('/api/v1/web3-auth/bind-profile', {
            chainId,
            address,
            provider,
            signature,
        })

        return response.data
    }
}
