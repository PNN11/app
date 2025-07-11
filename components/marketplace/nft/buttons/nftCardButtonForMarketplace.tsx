import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { AuctionButton } from 'components/marketplace/nft/buttons/auctionButton'
import { BuyButton } from 'components/marketplace/nft/buttons/buyButton'

type PropsType = {
    nft: IMarketplaceToken.TBodyResponse
    openBuyModal: () => void
}

const NftCardButtonForMarketplace: FC<PropsType> = ({ nft, openBuyModal }) => {
    switch (nft.type) {
        case 'BUY':
            return <BuyButton onClick={openBuyModal} />
        case 'AUCTION':
            return <AuctionButton nft={nft} />
        default:
            return null
    }
}

export default NftCardButtonForMarketplace
