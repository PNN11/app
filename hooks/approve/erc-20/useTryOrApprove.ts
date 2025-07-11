import { useCallback } from 'react'

import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { TxBase } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { ApproveParams } from 'utils/types/blockchainHooks'

export type TryOrApproveFunction = (params: ApproveParams) => Promise<null | TxBase>

const useTryOrApprove = (): TryOrApproveFunction => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const getBlockchainService = useGetRequiredBlockchainService()

    const callback: TryOrApproveFunction = useCallback(
        async ({ amount, approveAddress, decimals, tokenAddress }) => {
            const blockchainService = await getBlockchainService()

            const allowance = await blockchainService.allowanceERC20({
                activeWallet,
                approveAddress,
                tokenAddress,
            })

            const price = toBigNumber(amount, decimals)

            if (allowance.gte(price)) return null

            const approveResult = await blockchainService.approveERC20({
                amount,
                approveAddress,
                decimals,
                tokenAddress,
                activeWallet,
            })

            return approveResult
        },
        [activeWallet, getBlockchainService]
    )

    return callback
}

export default useTryOrApprove
