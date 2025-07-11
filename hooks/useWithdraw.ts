import { Web3Core } from 'common-types/web3core'
import useWalletStore from 'store/useWalletStore'
import { ethereumWithdraw } from 'utils/transactions/ethereumDeposit'
import { WithdrawFunc } from 'utils/types/blockchainHooks'

const withdrawFuncMap = new Map<Web3Core.EWalletProvider, WithdrawFunc>([
    [Web3Core.EWalletProvider.METAMASK, ethereumWithdraw],
    [Web3Core.EWalletProvider.OKX, ethereumWithdraw],
    [Web3Core.EWalletProvider.BLOCTO, ethereumWithdraw],
    [Web3Core.EWalletProvider.CUSTODIAL_ETH, ethereumWithdraw],
])

export const useWithdraw = (): WithdrawFunc => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const withdrawFunc = withdrawFuncMap.get(activeWallet.providerId)

    if (!withdrawFunc) {
        throw new Error(`Withdraw function for ${activeWallet.providerId} doesn't implemented`)
    }

    return withdrawFunc
}
