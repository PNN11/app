import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import openBuyModal from 'components/modals/nft/buy'
import openBuyNativeModal from 'components/modals/nft/buy/native'
import { NATIVE_CURRENCY_ADDRESS } from 'utils/constants/blockchain'

export const openRequiredBuyModal = (nft: IMarketplaceToken.TBodyResponse): Promise<void> => {
    if (nft.currency.address === NATIVE_CURRENCY_ADDRESS) {
        return openBuyNativeModal({ nft })
    }

    // if (
    //     dev.condition(
    //         nft.currency.address.toLowerCase() === process.env.NEXT_PUBLIC_MAIN_TOKEN.toLowerCase()
    //     )
    // ) {
    //     return openBuyInternalModal({ nft })
    // }

    return openBuyModal({ nft })
}
