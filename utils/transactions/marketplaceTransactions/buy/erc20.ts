import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { BuyFunc } from 'utils/types/blockchainHooks'

export const etheruemBuy: BuyFunc = async ({ listingId, activeWallet }) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()
    const contract = getGalleryContract({ chainId, signer })

    try {
        await contract.estimateGas.buy(listingId)

        const tx = await contract.buy(listingId)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
