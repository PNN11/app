import { WalletAdapter } from 'services/wallets/types'
import { RequestFn } from 'utils/types/api'

export const waitTx: RequestFn<{ hash: string; wallet: WalletAdapter }> = async ({
    hash,
    wallet,
}) => {
    const provider = await wallet.getProvider()

    await provider.waitForTransaction(hash)
}
