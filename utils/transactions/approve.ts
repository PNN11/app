import { ethers } from 'ethers'

import { getERC20Contract } from 'services/blockchain/contracts'
import { TxResult, WalletAdapter } from 'services/wallets/types'

export async function approve({
    tokenAdress,
    amount,
    wallet,
}: {
    tokenAdress: string
    amount: ethers.BigNumber
    wallet: WalletAdapter
}): Promise<TxResult> {
    const signer = await wallet.getSigner()

    const contract = getERC20Contract({ tokenAddress: tokenAdress, signer })

    try {
        await contract.estimateGas.approve(process.env.NEXT_PUBLIC_WALLET_CONTRACT, amount)

        const tx = await contract.approve(process.env.NEXT_PUBLIC_WALLET_CONTRACT, amount)

        const res = wallet.waitForTx(tx.hash)

        return res
    } catch (e: any) {
        console.error(e)
    }
}
