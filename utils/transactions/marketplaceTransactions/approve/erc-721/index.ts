import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getCollectionContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { ApproveListingFunc } from 'utils/types/blockchainHooks'

export const ethereumApproveListing: ApproveListingFunc = async ({
    activeWallet,
    collectionAddress,
    tokenId,
    approveAddress,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = getCollectionContract({ collectionAddress, signer })

    const token = ethers.BigNumber.from(tokenId)

    try {
        await contract.estimateGas.approve(approveAddress, token)

        const tx = await contract.approve(approveAddress, token)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
