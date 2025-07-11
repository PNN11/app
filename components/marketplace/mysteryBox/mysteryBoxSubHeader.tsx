import { FC, useEffect, useState } from 'react'

import Link from 'next/link'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { Container } from 'components/common/wrappers/container'
import SubheaderPortal from 'components/loyout/headers/subheader'
import openCancelListingModal from 'components/modals/nft/cancelListing'
import LowerListingPriceModal from 'components/modals/nft/lowerListingPrice'
import { useModal } from 'hooks/useModal'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'

type PropsType = {
    mysteryBox: IMarketplaceToken.TBodyResponse
}
const MysteryBoxSubheader: FC<PropsType> = ({ mysteryBox }) => {
    const [isOpenLowerListingPrice, openLowerListingPrice, closeLowerListingPrice] = useModal(false)
    const [nftStatus, setNftStatus] = useState<IMarketplaceToken.TStatus>(mysteryBox.status)

    useSubscribeToNFTEvent(`cancel-${mysteryBox._id}`, () => {
        setNftStatus('SOLD')
    })

    useEffect(() => {
        setNftStatus(mysteryBox.status)
    }, [mysteryBox])

    return (
        <SubheaderPortal>
            <div className="bg-base-700 px-6 py-3">
                <Container>
                    <div className="flex items-center justify-end gap-3">
                        {nftStatus === 'SALE' ? (
                            <>
                                {mysteryBox.payload.type === 'MINT' &&
                                    mysteryBox.payload.dataTimeStop > Date.now() &&
                                    mysteryBox.type === 'BUY' && (
                                        <MarketplaceButton
                                            className="max-w-[9.0625rem]"
                                            variant="inline"
                                            onClick={openLowerListingPrice}
                                        >
                                            Lower price
                                        </MarketplaceButton>
                                    )}
                                <MarketplaceButton
                                    className="w-full max-w-[9.0625rem]"
                                    onClick={() => openCancelListingModal({ nft: mysteryBox })}
                                >
                                    Cancel
                                </MarketplaceButton>
                            </>
                        ) : (
                            <Link
                                href={`/nft/sell/${mysteryBox._id}`}
                                className="w-full max-w-[9.0625rem]"
                            >
                                <MarketplaceButton>Sell</MarketplaceButton>
                            </Link>
                        )}
                        {mysteryBox.payload.resolution === 'MYSTER_BOX' &&
                        !mysteryBox.payload.isOpen ? (
                            <Link
                                href={{
                                    pathname: '/mysterybox/open/[id]',
                                    query: { id: mysteryBox._id },
                                }}
                            >
                                <MarketplaceButton>Open box</MarketplaceButton>
                            </Link>
                        ) : null}
                    </div>
                </Container>

                <LowerListingPriceModal
                    nft={mysteryBox}
                    isOpen={isOpenLowerListingPrice}
                    close={closeLowerListingPrice}
                />
            </div>
        </SubheaderPortal>
    )
}

export default MysteryBoxSubheader
