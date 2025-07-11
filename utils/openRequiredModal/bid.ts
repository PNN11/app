import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import openBidModal from 'components/modals/nft/bid'
import openBidNativeModal from 'components/modals/nft/bid/native'
import { NATIVE_CURRENCY_ADDRESS } from 'utils/constants/blockchain'

export const openRequiredBidModal = (nft: IMarketplaceToken.TBodyResponse): Promise<void> => {
    if (nft.currency.address === NATIVE_CURRENCY_ADDRESS) {
        return openBidNativeModal({ nft })
    }

    // if (
    //     dev.condition(
    //         nft.currency.address.toLowerCase() === process.env.NEXT_PUBLIC_MAIN_TOKEN.toLowerCase()
    //     )
    // ) {
    //     return openBidInternalModal({ nft })
    // }

    return openBidModal({ nft })
}
