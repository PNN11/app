import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumDeposit } from 'utils/transactions/ethereumDeposit'
import { DepositFunc } from 'utils/types/blockchainHooks'

const depositFuncMap = new Map<Web3Core.EWalletProvider, DepositFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumDeposit],
    [Web3Core.EWalletProvider.OKX, ethereumDeposit],
    [Web3Core.EWalletProvider.BLOCTO, ethereumDeposit],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumDeposit],
])

export const useDeposit = (): DepositFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const depositFunc = depositFuncMap.get(activeWallet.providerId)

    if (!depositFunc) {
        throw new Error(`Deposit function for ${activeWallet.providerId} doesn't implemented`)
    }

    return depositFunc
}
