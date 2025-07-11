import { FC, MouseEvent } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/smallButton'
import openCancelListingModal from 'components/modals/nft/cancelListing'
import ClaimAuctionModal from 'components/modals/nft/claimAuction'
import { useModal } from 'hooks/useModal'

type PropsType = { nft: IMarketplaceToken.TBodyResponse }

const wrapOpen =
    (callback: () => void) =>
    (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        e.preventDefault()
        callback?.()
    }

export const CancelSaleButton: FC<PropsType> = ({ nft }) => {
    const [isOpenClaim, openClaim, closeClaim] = useModal(false)

    const handleOpenCancelModal = wrapOpen(() => openCancelListingModal({ nft }))
    const handleOpenClaimModal = wrapOpen(openClaim)

    if (
        nft.type === 'AUCTION' &&
        nft.payload.type === 'MINT' &&
        nft.payload.lastBidderId &&
        nft.payload.dataTimeStop < Date.now()
    )
        return (
            <>
                <SmallButton variant="inline" className="w-full" onClick={handleOpenClaimModal}>
                    Claim
                </SmallButton>
                <ClaimAuctionModal nft={nft} close={closeClaim} isOpen={isOpenClaim} />
            </>
        )

    return (
        <SmallButton variant="inline" className="w-full" onClick={handleOpenCancelModal}>
            Cancel
        </SmallButton>
    )
}
