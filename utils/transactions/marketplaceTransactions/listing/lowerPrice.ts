import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { getGalleryContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { LowerListingPriceFunc } from 'utils/types/blockchainHooks'

export const ethereumLowerListingPrice: LowerListingPriceFunc = async ({
    listingId,
    price,
    decimals,
    activeWallet,
}) => {
    const signer = await activeWallet.getSigner()
    const chainId = await activeWallet.getChainId()

    const contract = getGalleryContract({ chainId, signer })

    const id = ethers.BigNumber.from(listingId)

    try {
        await contract.estimateGas.priceReduction(id, toBigNumber(price, decimals))

        const reversion = await contract.priceReduction(id, toBigNumber(price, decimals))
        const tx = await activeWallet.waitForTx(reversion?.hash)

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
