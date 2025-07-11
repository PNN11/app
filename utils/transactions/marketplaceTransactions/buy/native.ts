import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { BuyNativeFunc } from 'utils/types/blockchainHooks'

export const etheruemBuyNative: BuyNativeFunc = async ({
    listingId,
    activeWallet,
    amount,
    decimals,
}) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()
    const contract = getGalleryContract({ chainId, signer })

    const value = toBigNumber(amount, decimals)

    const overrides = {
        value,
    }

    try {
        await contract.estimateGas.buyETH(listingId, overrides)

        const tx = await contract.buyETH(listingId, overrides)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
