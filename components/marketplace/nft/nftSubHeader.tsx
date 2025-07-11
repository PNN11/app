import { FC, useEffect, useState } from 'react'

import Link from 'next/link'

import UnstakedOnly from '../unstakedOnly'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'
import SubheaderPortal from 'components/loyout/headers/subheader'
import openCancelListingModal from 'components/modals/nft/cancelListing'
import ClaimAuctionModal from 'components/modals/nft/claimAuction'
import LowerListingPriceModal from 'components/modals/nft/lowerListingPrice'
import ButtonWithUnstake from 'components/modals/nft/staking/buttons/withUnstake'
import { useModal } from 'hooks/useModal'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'

type PropsType = {
    nft: IMarketplaceToken.TBodyResponse
}
const NftSubHeader: FC<PropsType> = ({ nft }) => {
    const [isOpenLowerListingPrice, openLowerListingPrice, closeLowerListingPrice] = useModal(false)
    const [isOpenClaim, openClaim, closeClaim] = useModal(false)
    const [nftStatus, setNftStatus] = useState<IMarketplaceToken.TStatus>(nft.status)

    useSubscribeToNFTEvent(`cancel-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useSubscribeToNFTEvent(`claim-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useSubscribeToNFTEvent(`already-claimed-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useEffect(() => {
        setNftStatus(nft.status)
    }, [nft])

    const showClaim =
        nftStatus === 'SALE' &&
        nft.payload.type === 'MINT' &&
        nft.type === 'AUCTION' &&
        nft.payload.lastBidderId &&
        nft.payload.dataTimeStop < Date.now()

    const showCancel = nftStatus === 'SALE' && nft.payload.type === 'MINT' && !showClaim

    const showLowerPrice =
        nft.payload.type === 'MINT' && nft.payload.dataTimeStop > Date.now() && nft.type === 'BUY'

    const isPrivilegesRemoved = (nft?.payload as IMarketplaceToken.TPayloadMint<'MINT'>)
        ?.isPrivilegesRemoved

    const isStaked = (nft?.payload as IMarketplaceToken.TPayloadMint<'MINT'>)?.isStaked

    return (
        <SubheaderPortal>
            <div className={`${isStaked && isPrivilegesRemoved ? 'bg-dark-blue' : 'bg-base-700'}`}>
                <Container>
                    {nftStatus === 'SALE' ? (
                        <div className="flex items-center justify-end gap-3">
                            {showLowerPrice ? (
                                <MarketplaceButton
                                    className="my-3 max-w-[9.0625rem]"
                                    variant="inline"
                                    onClick={openLowerListingPrice}
                                >
                                    Lower price
                                </MarketplaceButton>
                            ) : null}
                            {showClaim ? (
                                <MarketplaceButton
                                    className="my-3 w-full max-w-[9.0625rem]"
                                    onClick={openClaim}
                                >
                                    Claim
                                </MarketplaceButton>
                            ) : null}
                            {showCancel ? (
                                <MarketplaceButton
                                    className="my-3 w-full max-w-[9.0625rem]"
                                    onClick={() => openCancelListingModal({ nft })}
                                >
                                    Cancel
                                </MarketplaceButton>
                            ) : null}
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <UnstakedOnly
                                fallback={
                                    <div className="flex items-center justify-between gap-10">
                                        {isPrivilegesRemoved ? (
                                            <div className="font-medium">
                                                {nft.payload.name} staking period is over. You are
                                                not receiving any utilities at this moment. To stake
                                                it again please unstake first.
                                            </div>
                                        ) : (
                                            <div />
                                        )}
                                        <ButtonWithUnstake
                                            className="w-fit"
                                            Component={SmallButton}
                                            nft={nft}
                                        >
                                            Unstake
                                        </ButtonWithUnstake>
                                    </div>
                                }
                                nft={nft}
                                className={`my-4 w-full  ${
                                    isPrivilegesRemoved ? '' : 'max-w-[9.0625rem]'
                                }`}
                            >
                                <Link
                                    href={`/nft/sell/${nft._id}`}
                                    className="my-3 w-full max-w-[9.0625rem]"
                                >
                                    <MarketplaceButton>Sell</MarketplaceButton>
                                </Link>
                            </UnstakedOnly>
                        </div>
                    )}
                </Container>
                <ClaimAuctionModal nft={nft} close={closeClaim} isOpen={isOpenClaim} />
                <LowerListingPriceModal
                    nft={nft}
                    isOpen={isOpenLowerListingPrice}
                    close={closeLowerListingPrice}
                />
            </div>
        </SubheaderPortal>
    )
}

export default NftSubHeader
