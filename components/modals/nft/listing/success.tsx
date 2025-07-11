import { FC } from 'react'

import { useRouter } from 'next/router'

import SocialShareBlock from './socialShareBlock'
import SuccessItemDescription from './successItemDescription'
import SuccessItemPreview from './successItemPreview'
import ListingModalWrapper from './wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { IModal } from 'components/modals/interfaces/modalInterface'

type PropsType = IModal & {
    onDone: () => void
    nft: IMarketplaceToken.TBodyResponse
}
const SuccessListing: FC<PropsType> = ({ nft, close, onDone }) => {
    const router = useRouter()

    const link =
        nft.payload.resolution === 'TOKEN_ERC721' ? `/nft/${nft._id}` : `/mysterybox/${nft._id}`

    return (
        <ListingModalWrapper
            title="Listing completed"
            close={close}
            className="flex flex-col gap-8"
        >
            <SuccessItemPreview logo={nft.payload.logo} title="Your item has been listed!" />

            <div className="flex flex-col items-center gap-4 text-center">
                <SuccessItemDescription nft={nft} description="has been listed for sale." />
                <SocialShareBlock nft={nft} />
            </div>
            <MarketplaceButton
                onClick={() => {
                    onDone()
                    router.push(link)
                }}
                className="w-full"
            >
                View listing
            </MarketplaceButton>
        </ListingModalWrapper>
    )
}

export default SuccessListing
