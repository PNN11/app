import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { BidFunc } from 'utils/types/blockchainHooks'

export const ethereumBidNative: BidFunc = async ({
    activeWallet,
    listingId,
    bidPrice,
    decimals,
}) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)
    const value = toBigNumber(bidPrice, decimals)

    const overrides = {
        value,
    }

    try {
        await contract.estimateGas.bidETH(id, overrides)

        const tx = await contract.bidETH(id, overrides)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
