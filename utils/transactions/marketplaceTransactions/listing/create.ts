import { Overrides, ethers } from 'ethers'
import { toast } from 'react-toastify'

import { CreateListingFunc } from '../../../types/blockchainHooks'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'

export const ethereumCreateListing: CreateListingFunc = async ({
    activeWallet,
    collectionAddress,
    currency,
    decimals,
    listingType,
    minimalBid,
    timeEnd,
    timeStart,
    tokenId,
    bidStep = 1,
    gracePeriod = 0,
}) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ signer, chainId })

    const startTime = ethers.BigNumber.from(timeStart)
    const endTime = ethers.BigNumber.from(timeEnd)
    const id = ethers.BigNumber.from(tokenId)
    const step = ethers.BigNumber.from(bidStep)
    const grace = ethers.BigNumber.from(gracePeriod)

    const minPrice = toBigNumber(minimalBid, decimals)

    try {
        const estimated = await contract.estimateGas.createListing(
            listingType,
            collectionAddress,
            id,
            startTime,
            endTime,
            currency,
            minPrice,
            step,
            grace
        )

        const gasLimit = estimated.mul(12).div(10)

        const overrides: Overrides = { gasLimit }

        const tx = await contract.createListing(
            listingType,
            collectionAddress,
            id,
            startTime,
            endTime,
            currency,
            minPrice,
            step,
            grace,
            overrides
        )

        return tx
    } catch (error) {
        console.error(error)

        toast(ethersContractExecutionError(error))
    }
}
