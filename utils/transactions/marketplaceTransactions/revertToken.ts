import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { RevertTokenFunc } from 'utils/types/blockchainHooks'

export const etheruemRevertToken: RevertTokenFunc = async ({ activeWallet, listingId }) => {
    const signer = await activeWallet.getSigner()

    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)

    try {
        await contract.estimateGas.revertToken(id)

        const tx = await contract.revertToken(id)

        return tx
    } catch (error) {
        console.error(error)

        toast(ethersContractExecutionError(error))
    }
}
