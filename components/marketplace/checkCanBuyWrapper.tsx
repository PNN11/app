import { FC, ReactElement, useState } from 'react'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import {
    IMarketplaceToken,
    MarketplaceTokenStatus,
} from 'common-types/marketplace/marketplace-token'
import NftStatusBadge, { NftStatus } from 'components/common/ui/nftStatusBadge'
import { useHydrated } from 'hooks/useHydrated'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useUserStore from 'store/useUserStore'

interface CheckBuyWrapperProps {
    nft: IMarketplaceToken.TBodyResponse
    children: ReactElement<any, any>
    classNameForStatusBadge?: string
}

const CheckCanBuyWrapper: FC<CheckBuyWrapperProps> = ({
    nft,
    children,
    classNameForStatusBadge,
}) => {
    const [soldOut, setSoldOut] = useState(nft?.status === MarketplaceTokenStatus.SOLD)

    const userId = useUserStore(state => state.userId)

    const isHydrated = useHydrated()

    useSubscribeToNFTEvent(`buy-${nft._id}`, () => {
        setSoldOut(true)
    })

    const saleEnded =
        nft?.status === MarketplaceTokenStatus.SALE &&
        nft?.payload?.type === MarketplaceCollectionType.MINT &&
        nft?.payload?.dataTimeStop < Date.now() &&
        nft?.payload?.dataTimeStop !== 0

    if (nft.collection?.payload?.type === 'CREATED') return

    if (soldOut && userId !== nft.payload.ownerId)
        return <NftStatusBadge status={NftStatus.SOLD_OUT} className={classNameForStatusBadge} />

    if (saleEnded && userId !== nft.payload.ownerId)
        return <NftStatusBadge status={NftStatus.ENDED} className={classNameForStatusBadge} />

    if (
        nft.payload.type === 'MINT' &&
        nft.type === 'AUCTION' &&
        nft.payload.lastBidderId?.toLowerCase() === userId?.toLowerCase()
    ) {
        return (
            <NftStatusBadge
                status={NftStatus.YOUR_BID_HIGHTEST}
                className={classNameForStatusBadge}
            />
        )
    }

    return isHydrated ? children : null
}

export default CheckCanBuyWrapper
