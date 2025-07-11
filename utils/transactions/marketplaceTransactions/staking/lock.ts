import { ethers } from 'ethers'

import { getStakingContract } from 'services/blockchain/contracts'
import { dev, prod } from 'utils/environment'
import { LockTokenFunc } from 'utils/types/blockchainHooks'

const developersAddresses = [
    '0x0Dc6bc1545A35644B8e082C76338ccF184703e55',
    '0x534a9dde385f4a360071c83e9ced3025686de85d',
    '0x325db088222F7f81d4450499bad58A5770323373',
    '0xCF0cC8791283b2669327aE49BcFac61c9cfce27e',
]

export const ethereumLockNft: LockTokenFunc = async ({
    activeWallet,
    collectionAddress,
    tokenId,
}) => {
    const signer = await activeWallet.getSigner()
    const address = await activeWallet.getAddress()
    const chainId = await activeWallet.getChainId()

    const lockContract = getStakingContract({ chainId, signer })

    const id = ethers.BigNumber.from(tokenId)

    if (
        dev.condition() ||
        developersAddresses.find(item => item.toLowerCase() === address.toLowerCase())
    ) {
        await lockContract.estimateGas.lockThreeMinutesERC721(collectionAddress, id)
        const tx = await lockContract.lockThreeMinutesERC721(collectionAddress, id)

        return tx
    }

    if (prod.condition()) {
        await lockContract.estimateGas.lockWeekERC721(collectionAddress, id)
        const tx = await lockContract.lockWeekERC721(collectionAddress, id)

        return tx
    }
}
