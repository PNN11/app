import { ethers } from 'ethers'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ClaimFunc } from 'utils/types/blockchainHooks'

export const etheruemClaim: ClaimFunc = async ({ activeWallet, listingId }) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)

    await contract.estimateGas.claimCollectible(id)

    const tx = await contract.claimCollectible(id)

    return tx
}
