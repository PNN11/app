import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import openCancelBidModal from 'components/modals/nft/cancelBid'

type Params = { nft: IMarketplaceToken.TBodyResponse; amount: number; lastListingId: number }

type OpenRequiredCancelBidModalFunc = (params: Params) => Promise<void>

export const openRequiredCancelBidModal: OpenRequiredCancelBidModalFunc = ({
    lastListingId,
    nft,
}) => {
    // if (
    //     dev.condition(
    //         nft.currency.address.toLowerCase() === process.env.NEXT_PUBLIC_MAIN_TOKEN.toLowerCase()
    //     )
    // ) {
    //     return openCancelBidInternalModal({ nft, amount, lastListingId })
    // }

    return openCancelBidModal({ nft, lastListingId })
}
