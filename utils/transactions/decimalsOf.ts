import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { WalletAdapter } from 'services/wallets/types'
import { ERC20ABI } from 'utils/abi/erc20.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'

export async function decimalsOf({
    tokenAdress,
    walletAdapter,
}: {
    tokenAdress: string
    walletAdapter: WalletAdapter
}): Promise<void> {
    const signer = await walletAdapter.getSigner()

    const contract = new ethers.Contract(tokenAdress, ERC20ABI, signer)

    try {
        await contract.estimateGas.decimals()

        return contract.decimals()
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
