import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { MarketplaceProxyGalleryAbi } from 'utils/abi/marketplace/marketplace-proxy-gallery.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { MintInternalFunc } from 'utils/types/blockchainHooks'

export const ethereumMintInternal: MintInternalFunc = async ({
    activeWallet,
    collectionAddress,
    currency,
    nonce,
    price,
    signature,
    timeEnd,
    timeStart,
    tokenUri,
    decimals,
    nonceCollection,
    signatureCollection,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_PROXY_GALLERY_CONTRACT,
        MarketplaceProxyGalleryAbi,
        signer
    )

    const startTime = ethers.BigNumber.from(timeStart)
    const endTime = ethers.BigNumber.from(timeEnd)

    const tokenPrice = toBigNumber(price, decimals)

    try {
        await contract.estimateGas.mintWithFixedPrice(
            collectionAddress,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            nonce,
            signature,
            tokenUri,
            startTime,
            endTime,
            currency,
            tokenPrice,
            nonceCollection,
            signatureCollection
        )

        const tx = await contract.mintWithFixedPrice(
            collectionAddress,
            process.env.NEXT_PUBLIC_WALLET_CONTRACT,
            nonce,
            signature,
            tokenUri,
            startTime,
            endTime,
            currency,
            tokenPrice,
            nonceCollection,
            signatureCollection
        )

        return tx
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
