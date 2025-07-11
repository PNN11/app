import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { BidFunc } from 'utils/types/blockchainHooks'

export const ethereumBid: BidFunc = async ({ activeWallet, listingId, bidPrice, decimals }) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)
    const price = toBigNumber(bidPrice, decimals)

    try {
        await contract.estimateGas.bid(id, price)

        const tx = await contract.bid(id, price)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
