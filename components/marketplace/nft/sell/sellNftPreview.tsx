import { FC } from 'react'

import Image from 'next/image'

import GameLink from '../gameLink'

import { Economics } from 'common-types/economics'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

type PropsType = {
    priceValue: number
    nft: IMarketplaceToken.TBodyResponse
    activePrice: Economics.IAsset
}
const SellNftPreview: FC<PropsType> = ({ nft, priceValue, activePrice }) => {
    return (
        <div className="order-2 lg:col-span-1">
            <Image
                src={nft.payload.logo}
                width={182}
                height={182}
                alt={nft.payload.name}
                className="mb-4 aspect-square w-full rounded-2xl"
                priority
            />
            <div className="justify-between lg:flex">
                <div className="mb-3 flex flex-col gap-2 lg:mb-0 lg:gap-1">
                    <GameLink game={nft.payload.game} />
                    <div className="mb-2 text-2xl font-medium uppercase lg:text-xl">
                        {nft.payload.name}
                    </div>
                </div>
                <div className="flex flex-col gap-1 lg:items-end">
                    <p className="text-custom-sl">Price</p>
                    <div className="flex items-center gap-1">
                        <Image
                            src={activePrice?.icon ?? ''}
                            alt={`${activePrice?.symbol ?? ''} icon`}
                            width={24}
                            height={24}
                        />
                        <div className="text-xl">{priceValue > 0 ? priceValue : 0}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellNftPreview
