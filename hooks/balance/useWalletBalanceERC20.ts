import { ethers } from 'ethers'
import { UseQueryResult, useQuery } from 'react-query'

import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { TChainIds } from 'services/wallets/blockchainProvider'
import useWalletStore from 'store/useWalletStore'
import { QueryKeys } from 'utils/constants/reactQuery'

const useWalletBalanceERC20 = ({
    chainId,
    tokenAddress,
}: {
    chainId: TChainIds
    tokenAddress: string
}): UseQueryResult<number, unknown> => {
    const activeWallet = useWalletStore(s => s.activeWallet)
    const getBlockchainService = useGetRequiredBlockchainService()

    const queryRes = useQuery(
        [QueryKeys.GET_WALLET_BALANCE_ERC20, chainId, tokenAddress],
        async (): Promise<number> => {
            const blockchainService = await getBlockchainService()

            const balance = await blockchainService.getERC20Balance({ activeWallet, tokenAddress })

            return balance ? +ethers.utils.formatEther(balance) : 0
        },
        { enabled: !!chainId && !!tokenAddress }
    )

    return queryRes
}

export default useWalletBalanceERC20
