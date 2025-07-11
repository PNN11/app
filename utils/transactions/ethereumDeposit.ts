import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { WalletAbi } from 'utils/abi/marketplace/wallet.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { DepositFunc, WithdrawFunc } from 'utils/types/blockchainHooks'

const createContract = (signer: any): ethers.Contract =>
    new ethers.Contract(process.env.NEXT_PUBLIC_WALLET_CONTRACT, WalletAbi, signer)

export const ethereumDeposit: DepositFunc = async ({ amount, activeWallet }) => {
    const decimals = 18
    const result = toBigNumber(amount, decimals)

    const signer = await activeWallet.getSigner()
    const contract = createContract(signer)

    try {
        await contract.estimateGas.deposit(result)

        return contract.deposit(result)
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}

export const ethereumWithdraw: WithdrawFunc = async ({ params, activeWallet }) => {
    const decimals = 18
    const result = toBigNumber(params.amount, decimals)

    const signer = await activeWallet.getSigner()
    const contract = createContract(signer)

    try {
        await contract.estimateGas.withdraw(result, params.nonce, params.signature)

        return contract.withdraw(result, params.nonce, params.signature)
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
