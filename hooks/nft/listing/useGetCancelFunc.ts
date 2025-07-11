import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { BlockchainService } from 'services/blockchain/types'

type GetCancelListingFunc = (
    nft: IMarketplaceToken.TBodyResponse,
    blockchainService: BlockchainService
) => BlockchainService['cancelListing'] | BlockchainService['claim']

const useGetCancelListingFunc = (): GetCancelListingFunc => {
    const getCancelListingFunc: GetCancelListingFunc = (
        nft: IMarketplaceToken.TBodyResponse,
        blockchainService: BlockchainService
    ) => {
        const { cancelListing, claim } = blockchainService

        if (nft.type === 'BUY') return cancelListing

        if (
            nft.payload.type === 'MINT' &&
            nft.payload.dataTimeStop <= Date.now() &&
            !nft.payload.lastBidderId
        )
            return claim

        if (nft.payload.type === 'MINT' && nft.payload.dataTimeStop <= Date.now())
            return cancelListing

        return cancelListing
    }

    return getCancelListingFunc
}

export default useGetCancelListingFunc
