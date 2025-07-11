import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import useLoggedIn from 'hooks/useLoggedIn'
import { openRequiredBidModal } from 'utils/openRequiredModal/bid'

type PropsType = { nft: IMarketplaceToken.TBodyResponse }
export const AuctionButton: FC<PropsType> = ({ nft }) => {
    const ifLogged = useLoggedIn()

    return (
        <SmallButton
            onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                ifLogged().then(() => {
                    openRequiredBidModal(nft)
                })
            }}
            className="w-full"
        >
            Place a bid
        </SmallButton>
    )
}
