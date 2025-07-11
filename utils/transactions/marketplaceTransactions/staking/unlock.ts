import { ethers } from 'ethers'

import { getStakingContract } from 'services/blockchain/contracts'
import { UnlockTokenFunc } from 'utils/types/blockchainHooks'

export const ethereumUnlockNft: UnlockTokenFunc = async ({
    activeWallet,
    collectionAddress,
    tokenId,
}) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const lockContract = getStakingContract({ chainId, signer })

    const id = ethers.BigNumber.from(tokenId)

    await lockContract.estimateGas.revertERC721(collectionAddress, id)

    const tx = await lockContract.revertERC721(collectionAddress, id)

    return tx
}
