import { ethers } from 'ethers'
import { UseQueryResult, useQuery } from 'react-query'

import { TChainIds, blockchains } from 'services/wallets/blockchainProvider'
import useWalletStore from 'store/useWalletStore'
import { QueryKeys } from 'utils/constants/reactQuery'

const useWalletBalanceNative = ({
    chainId,
    address,
}: {
    chainId: TChainIds
    address?: string
}): UseQueryResult<number, unknown> => {
    const activeWallet = useWalletStore(s => s.activeWallet)

    const queryRes = useQuery(
        [QueryKeys.GET_WALLET_BALANCE_NATIVE, chainId, activeWallet, address],
        async (): Promise<number> => {
            const provider = new ethers.providers.JsonRpcProvider(blockchains[chainId].rpcUrls[0])

            const _address = address ?? (await activeWallet.getAddress())

            const balance = await provider.getBalance(_address)

            return balance ? +ethers.utils.formatEther(balance) : 0
        },
        { enabled: !!chainId }
    )

    return queryRes
}

export default useWalletBalanceNative
