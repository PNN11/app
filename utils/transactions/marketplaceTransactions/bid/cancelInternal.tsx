import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { MarketplaceProxyGalleryAbi } from 'utils/abi/marketplace/marketplace-proxy-gallery.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { CancelBidFunc } from 'utils/types/blockchainHooks'

export const cancelBidInternal: CancelBidFunc = async ({ listingId, activeWallet }) => {
    const signer = await activeWallet.getSigner()

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PROXY_GALLERY_CONTRACT,
        MarketplaceProxyGalleryAbi,
        signer
    )

    const id = ethers.BigNumber.from(listingId)

    try {
        await contract.estimateGas.cancelBid(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            id
        )

        const tx = await contract.cancelBid(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            id
        )

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
