import { Core } from 'common-types/core'
import { Economics } from 'common-types/economics'
import { Swap } from 'common-types/swap'
import { Transaction } from 'common-types/transaction'
import { authAxiosClient } from 'services/axios'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'
import { ApiService } from 'utils/types/service'

export class SwapService extends ApiService {
    getAssets: RequestFn<
        Core.PaginatedRequestBaseParams & { isVirtual?: boolean; chainId?: string },
        Economics.AssetsResponse
    > = async ({ limit, offset, isVirtual, signal, chainId }) => {
        const response = await authAxiosClient.get(`/api/v1/swap/asset`, {
            params: { limit, offset, isVirtual, chainId },
            signal,
        })

        return response.data
    }

    getPairs: RequestFn<
        { limit: string; offset: string; fromCurrency?: string },
        Economics.AssetsPairResponse
    > = async ({ limit, offset, fromCurrency }) => {
        const response = await authAxiosClient.get(
            `/api/v1/swap/pairs?limit=${limit}&offset=${offset}&fromCurrency=${fromCurrency}`
        )

        return response.data
    }

    getBalance: RequestFn<Swap.GetBalanceRequestParams, Swap.GetBalanceResponse> = async ({
        currenciesId,
    }) => {
        const response = await authAxiosClient.post('/api/v1/swap/balance', { currenciesId })

        return response.data
    }

    getTransactions: RequestFn<
        { limit: number; offset: number },
        Core.PaginatedResponse<Transaction.Transaction>
    > = async ({ offset, limit, signal }) => {
        const response = await authAxiosClient.get('/api/v1/user/my-transaction', {
            params: {
                limit,
                offset,
            },
            signal,
        })

        return response.data
    }

    swap: RequestFn<{
        _from: string // _asset
        _to: string // _asset
        amount: number
    }> = async ({ _from, _to, amount }) => {
        const response = await authAxiosClient.post('/api/v1/swap', {
            fromCurrencyId: _from,
            toCurrencyId: _to,
            amountDeposit: amount,
        })
    }

    withdrawal: RequestFn<
        {
            amount: number
        },
        Swap.WithdrawResponce
    > = async ({ amount }) => {
        const response = await authAxiosClient.post('/api/v1/swap/withdrawal', {
            amount,
        })

        return response.data
    }

    depositBinance: RequestFn<
        {
            amount: number
        },
        {
            redirectUrl: string
        }
    > = async ({ amount }) => {
        const response = await authAxiosClient.post('/api/v1/balance/deposit-binance', {
            amount,
        })

        return response.data
    }

    getMinAmountForDepositBinance: EmptyRequestFn<{
        amount: number
    }> = async () => {
        const response = await authAxiosClient.post('/api/v1/balance/min-amount-deposit')

        return response.data
    }

    requestMaticWithdrawal: RequestFn<{ amount: number }, { ok: boolean }> = async data => {
        const response = await authAxiosClient.post(
            '/api/v1/withdrawal/send-request-referrals',
            data
        )

        return response.data
    }

    isPendingWithdrawalRequest: EmptyRequestFn<{ ok: boolean }> = async () => {
        const response = await authAxiosClient.get('/api/v1/withdrawal/is-pending-request')

        return response.data
    }
}
