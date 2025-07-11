import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { CancelSaleButton } from 'components/profile/buttons/CancelSaleButton'
import { SellButton } from 'components/profile/buttons/SellButton'
import useUserStore from 'store/useUserStore'

type PropsType = { nft: IMarketplaceToken.TBodyResponse }

const NftCardButtonForProfile: FC<PropsType> = ({ nft }) => {
    const userId = useUserStore(store => store.userId)

    if (
        nft.status === 'SALE' &&
        nft.payload.type === 'MINT' &&
        nft.payload.lastBidderId !== userId
    ) {
        return <CancelSaleButton nft={nft} />
    }

    if (nft.status === 'SOLD') return <SellButton nft={nft} />

    return null
}

export default NftCardButtonForProfile
