import { FC } from 'react'

import ListingItemPreview from './listingItemPreview'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

type PropsType = {
    txInfo?: Gallery.TxInfoType
    nft: IMarketplaceToken.TBodyResponse
}
const ItemPreview: FC<PropsType> = ({ txInfo, nft }) => {
    return (
        <div className="space-y-2">
            <div className="border-line-gradient flex justify-between border-b pb-2 text-xs text-base-300">
                <div>Item</div>
                <div>Subtotal</div>
            </div>
            <ListingItemPreview nft={nft} txInfo={txInfo} />
        </div>
    )
}

export default ItemPreview
