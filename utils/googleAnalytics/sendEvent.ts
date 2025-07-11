import { AnalyticsEvents } from './events'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

export const sendAnalyticsEvent = ({ event, options }: AnalyticsEvents): void => {
    // @ts-ignore
    window?.gtag('event', event, options)
}

export const sendPurchaseNFTEvent = (
    nft: IMarketplaceToken.TBodyResponse,
    txHash: string
): void => {
    sendAnalyticsEvent({
        event: 'purchase',
        options: {
            transaction_id: txHash,
            currency: nft.currency.symbol,
            value: nft.priceAmount,
            items: [{ item_name: nft.payload.name, price: nft.priceAmount, quantity: 1 }],
        },
    })
}
