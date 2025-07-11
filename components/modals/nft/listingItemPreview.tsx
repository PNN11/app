import { FC } from 'react'

import Image from 'next/image'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

type ListingItemPreviewProps = {
    txInfo?: Gallery.TxInfoType
    nft: IMarketplaceToken.TBodyResponse
}

const ListingItemPreview: FC<ListingItemPreviewProps> = ({ nft, txInfo }) => {
    return (
        <div className="border-line-gradient flex justify-between border-b pb-2">
            <div className="flex items-center gap-4">
                <Image
                    src={nft.payload.logo}
                    width={70}
                    height={70}
                    alt="nft preview"
                    className="aspect-square w-[4.375rem] rounded-2xl"
                />
                <div className="flex w-full flex-col gap-1">
                    <p className="text-custom-sl text-link">{nft.payload.game?.title}</p>
                    <div className="text-xl uppercase">{nft.payload.name}</div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center gap-1">
                <div className="flex items-center gap-1">
                    <Image
                        src={txInfo?.currencyIcon ?? nft.currency.icon}
                        alt={`${nft.currency.icon}icon`}
                        width={20}
                        height={20}
                        className="h-5"
                    />
                    <div className="text-custom-2.5xl">
                        {txInfo ? txInfo.priceValue : nft.priceAmount}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingItemPreview
