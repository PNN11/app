import { ethers } from 'ethers'

import { blockchains } from 'services/wallets/blockchainProvider'
import useWalletStore from 'store/useWalletStore'

const useWalletBalances = (): typeof getBalances => {
    const activeWallet = useWalletStore(s => s.activeWallet)
    const getBalances = async (): Promise<
        {
            chainName: string
            value: number
        }[]
    > => {
        const address = await activeWallet.getAddress()

        const providers = Object.values(blockchains).map(chain => ({
            provider: new ethers.providers.JsonRpcProvider(chain.rpcUrls[0]),
            name: chain.name,
        }))

        const balancesPromise = providers.map(async item => {
            const value = await item.provider.getBalance(address)

            return { chainName: item.name, value: value ? +ethers.utils.formatEther(value) : 0 }
        })

        const balances = (await Promise.allSettled(balancesPromise)).map(
            res => res.status === 'fulfilled' && res.value
        )

        return balances
    }

    return getBalances
}

export default useWalletBalances
