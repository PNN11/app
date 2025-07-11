import { toast } from 'react-toastify'

import { getERC20Contract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { ApproveFunc } from 'utils/types/blockchainHooks'

export const ethereumApprove: ApproveFunc = async ({
    activeWallet,
    amount,
    tokenAddress,
    decimals,
    approveAddress,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = getERC20Contract({ signer, tokenAddress })

    const price = toBigNumber(amount, decimals)

    try {
        await contract.estimateGas.approve(approveAddress, price)
        const tx = await contract.approve(approveAddress, price)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
