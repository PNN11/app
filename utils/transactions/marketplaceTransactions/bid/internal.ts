import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { MarketplaceProxyGalleryAbi } from 'utils/abi/marketplace/marketplace-proxy-gallery.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { BidInternalFunc } from 'utils/types/blockchainHooks'

export const ethereumBidInternal: BidInternalFunc = async ({
    activeWallet,
    listingId,
    bidPrice,
    decimals,
    nonce,
    signature,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PROXY_GALLERY_CONTRACT,
        MarketplaceProxyGalleryAbi,
        signer
    )

    const id = ethers.BigNumber.from(listingId)
    const value = toBigNumber(bidPrice, decimals)

    try {
        await contract.estimateGas.bid(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            value,
            nonce,
            signature,
            id
        )

        const tx = await contract.bid(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            value,
            nonce,
            signature,
            id
        )

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
