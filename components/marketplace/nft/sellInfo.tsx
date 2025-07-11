/* eslint-disable no-nested-ternary */
import { FC, useCallback, useEffect, useState } from 'react'

import moment from 'moment'
import Image from 'next/image'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken, MarketplaceTokenType } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import CheckIsCanBuyWrapper from 'components/marketplace/checkCanBuyWrapper'
import ClaimModal from 'components/modals/nft/claim'
import { useHydrated } from 'hooks/useHydrated'
import useLoggedIn from 'hooks/useLoggedIn'
import { useModal } from 'hooks/useModal'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useUserStore from 'store/useUserStore'
import { openRequiredBidModal } from 'utils/openRequiredModal/bid'
import { openRequiredBuyModal } from 'utils/openRequiredModal/buy'

type PropsType = {
    nft: IMarketplaceToken.TBodyResponse
}
const SellInfo: FC<PropsType> = ({ nft }) => {
    const userId = useUserStore(state => state.userId)
    const [price, setPrice] = useState(
        nft.payload.type === 'MINT' && nft.type === 'AUCTION'
            ? nft.payload.lastBidPriceAmount || nft.priceAmount
            : nft.priceAmount
    )
    const [nftStatus, setNftStatus] = useState(nft.status)

    const [isOpenClaimModal, openClaimModal, closeClaimModal] = useModal()

    const isHydrated = useHydrated()
    const ifLogged = useLoggedIn()

    const isSecondarySell =
        nft?.payload?.type === MarketplaceCollectionType.MINT && nft?.payload?.dataTimeStop !== 0

    const isYouAuctionWinner =
        userId !== nft.payload.ownerId &&
        nft.type === MarketplaceTokenType.AUCTION &&
        nft.status === 'SALE' &&
        nft.payload.type === 'MINT' &&
        nft.payload.lastBidderId === userId &&
        nft.payload.dataTimeStop < Date.now()

    const handleOpenBuyModal = useCallback(
        () =>
            ifLogged().then(() => {
                openRequiredBuyModal(nft)
            }),
        [ifLogged, nft]
    )

    const handleOpenBidModal = useCallback(
        () =>
            ifLogged().then(() => {
                openRequiredBidModal(nft)
            }),
        [ifLogged, nft]
    )

    useSubscribeToNFTEvent(`bid-${nft._id}`, event => {
        setPrice(
            event.target.payload.type === 'MINT' &&
                nft.type === 'AUCTION' &&
                event.target.payload.lastBidPriceAmount
        )
    })
    useSubscribeToNFTEvent(`lowerprice-${nft._id}`, event => {
        setPrice(event.target.priceAmount)
    })

    useSubscribeToNFTEvent(`cancel-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useSubscribeToNFTEvent(`buy-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useEffect(() => {
        setPrice(
            nft.payload.type === 'MINT' && nft.type === 'AUCTION'
                ? nft.payload.lastBidPriceAmount || nft.priceAmount
                : nft.priceAmount
        )

        setNftStatus(nft.status)
    }, [nft])

    return (
        <div className="mb-4 rounded-2xl bg-base-700 sm:flex-row sm:items-center">
            {isSecondarySell &&
                nft?.payload?.type === MarketplaceCollectionType.MINT &&
                nftStatus === 'SALE' && (
                    <div className="border-b border-base-100 border-opacity-10 px-5 py-4 text-custom-1xl">
                        Sale ends {moment(nft?.payload?.dataTimeStop).format('LLL')}
                    </div>
                )}

            {nftStatus === 'SALE' ? (
                <div
                    className={`${
                        isSecondarySell ? 'space-y-3' : 'flex items-center justify-between gap-3'
                    } p-5`}
                >
                    {isHydrated ? (
                        <>
                            <div className="space-y-2">
                                {nft.type === MarketplaceTokenType.AUCTION && (
                                    <div className="text-base-300">
                                        {nft.payload.ownerId === userId &&
                                        nft.payload.type === 'MINT' &&
                                        !nft.payload.lastBidPriceAmount
                                            ? 'No bids placed yet. Min bid'
                                            : isYouAuctionWinner
                                            ? 'Your bid won'
                                            : 'Top bid'}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    {nft.payload.type === 'MINT' &&
                                    nft.type === 'AUCTION' &&
                                    !nft.payload.lastBidPriceAmount &&
                                    nft.payload.ownerId !== userId ? (
                                        <div>Place first bid. Minimal bid:</div>
                                    ) : null}
                                    <div className="text-28 font-medium">{price}</div>
                                    <Image
                                        src={nft.currency.icon}
                                        width={24}
                                        height={24}
                                        alt={nft.currency.title}
                                    />
                                </div>
                            </div>

                            <CheckIsCanBuyWrapper nft={nft} classNameForStatusBadge="hidden">
                                <>
                                    {userId !== nft.payload.ownerId &&
                                        nft.type === MarketplaceTokenType.BUY && (
                                            <MarketplaceButton
                                                onClick={handleOpenBuyModal}
                                                className={`${
                                                    isSecondarySell
                                                        ? 'sm:max-w-xs'
                                                        : 'w-1/2 max-w-xs'
                                                }`}
                                            >
                                                Buy now
                                            </MarketplaceButton>
                                        )}
                                    {userId !== nft.payload.ownerId &&
                                        nft.type === MarketplaceTokenType.AUCTION &&
                                        nft.payload.type === 'MINT' &&
                                        nft.payload.lastBidderId !== userId && (
                                            <MarketplaceButton
                                                onClick={handleOpenBidModal}
                                                className="sm:max-w-xs"
                                            >
                                                Place Bid
                                            </MarketplaceButton>
                                        )}
                                </>
                            </CheckIsCanBuyWrapper>
                        </>
                    ) : null}
                    {isHydrated && isYouAuctionWinner && (
                        <MarketplaceButton onClick={openClaimModal} className="sm:max-w-xs">
                            Claim
                        </MarketplaceButton>
                    )}
                </div>
            ) : null}

            <ClaimModal isOpen={isOpenClaimModal} close={closeClaimModal} nft={nft} />
        </div>
    )
}

export default SellInfo
