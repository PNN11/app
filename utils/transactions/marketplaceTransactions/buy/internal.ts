import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { MarketplaceProxyGalleryAbi } from 'utils/abi/marketplace/marketplace-proxy-gallery.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { BuyInternalFunc } from 'utils/types/blockchainHooks'

export const etheruemBuyInternal: BuyInternalFunc = async ({
    listingId,
    activeWallet,
    amount,
    nonce,
    signature,
    decimals,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PROXY_GALLERY_CONTRACT,
        MarketplaceProxyGalleryAbi,
        signer
    )

    const price = toBigNumber(amount, decimals)

    try {
        await contract.estimateGas.buy(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            price,
            nonce,
            signature,
            listingId
        )

        const tx = await contract.buy(
            process.env.NEXT_PUBLIC_GALLERY_CONTRACT,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            price,
            nonce,
            signature,
            listingId
        )

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
