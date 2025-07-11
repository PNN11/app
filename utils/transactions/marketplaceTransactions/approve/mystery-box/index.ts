import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getCollectionContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { ApproveOpenMysteryBoxFunc } from 'utils/types/blockchainHooks'

export const ethereumApproveOpenMysteryBox: ApproveOpenMysteryBoxFunc = async ({
    activeWallet,
    collectionAddress,
    mysteryBoxId,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = getCollectionContract({ collectionAddress, signer })

    const boxId = ethers.BigNumber.from(mysteryBoxId)

    const mysteryBoxAddress = process.env.NEXT_PUBLIC_MYSTERY_BOX_CONTRACT

    try {
        await contract.estimateGas.approve(mysteryBoxAddress, boxId)

        const tx = await contract.approve(mysteryBoxAddress, boxId)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
