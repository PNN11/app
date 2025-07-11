import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { CancelListingFunc } from 'utils/types/blockchainHooks'

export const ethereumCancelListing: CancelListingFunc = async ({ listingId, activeWallet }) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)

    try {
        await contract.estimateGas.revertToken(id)

        const tx = await contract.revertToken(id)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
