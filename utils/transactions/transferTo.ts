import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { WalletAdapter } from 'services/wallets/types'
import { ERC20ABI } from 'utils/abi/erc20.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'

export async function transferTo({
    to,
    tokenAdress,
    amount,
    walletAdapter,
}: {
    to: string
    tokenAdress: string
    amount: string | number
    walletAdapter: WalletAdapter
}): Promise<void> {
    const signer = await walletAdapter.getSigner()

    const contract = new ethers.Contract(tokenAdress, ERC20ABI, signer)
    const gasLimit = {
        gasLimit: ethers.utils.hexlify(parseInt(process.env.NEXT_PUBLIC_GAS_LIMIT, 10)),
    }

    try {
        await contract.estimateGas.transfer(to, amount, gasLimit)

        const tx = await contract.transfer(to, amount, gasLimit)
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
