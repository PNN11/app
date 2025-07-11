import { FC, useEffect, useState } from 'react'

import NftInfoWrapper from './infoWrapper'
import PriceAndRankInfo from './priceAndRankInfo'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import CheckIsCanBuyWrapper from 'components/marketplace/checkCanBuyWrapper'
import NftCardButtonForMarketplace from 'components/marketplace/nft/buttons/nftCardButtonForMarketplace'
import UnstakeButton from 'components/modals/nft/staking/buttons/unstake'
import { CancelSaleButton } from 'components/profile/buttons/CancelSaleButton'
import ClaimButtom from 'components/profile/buttons/claimButtom'
import { SellButton } from 'components/profile/buttons/SellButton'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useUserStore from 'store/useUserStore'
import { openRequiredBuyModal } from 'utils/openRequiredModal/buy'

interface NftCardInfoProps {
    nft: IMarketplaceToken.TBodyResponse
}

const NftCardInfo: FC<NftCardInfoProps> = ({ nft }) => {
    const [nftStatus, setNftStatus] = useState(nft.status)
    const [nftOwner, setNftOwner] = useState(nft.payload.ownerId)
    const userId = useUserStore(store => store.userId)

    const openBuy = (): void => {
        openRequiredBuyModal(nft)
    }

    const isOnSale =
        nftStatus === 'SALE' && nft.payload.type === 'MINT' && nft.payload.lastBidderId !== userId

    const isUserAuctionWinner =
        nftStatus === 'SALE' &&
        nft.type === 'AUCTION' &&
        nft.payload.type === 'MINT' &&
        nft.payload.lastBidderId === userId &&
        nft.payload.dataTimeStop < Date.now()

    const isUserOwnerNft = userId?.toLowerCase() === nftOwner?.toLowerCase()

    const price =
        nft.payload.type === 'MINT' && nft.type === 'AUCTION' && nft.status === 'SALE'
            ? nft.payload.lastBidPriceAmount || nft.priceAmount
            : nft.priceAmount

    const isStaked = nft.payload.type === 'MINT' && nft.payload.isStaked

    useSubscribeToNFTEvent(`cancel-${nft._id}`, () => {
        setNftStatus('SOLD')
    })

    useSubscribeToNFTEvent(`buy-${nft._id}`, () => {
        setNftOwner(userId)
        setNftStatus('SOLD')
    })

    useEffect(() => {
        setNftOwner(nft.payload.ownerId)
        setNftStatus(nft.status)
    }, [nft])

    return (
        <NftInfoWrapper className="relative group-hover:-mt-12 group-hover:pb-16">
            <PriceAndRankInfo
                currency={nft.currency}
                name={nft.payload.name}
                priceAmount={price}
                rank={nft.rank}
                resolution={nft.payload.resolution}
                rankResolution={nft.payload?.rankResolution}
            />
            <div className="absolute left-4 right-4 mt-4 opacity-0 group-hover:mt-2 group-hover:opacity-100">
                {!isUserOwnerNft && !isUserAuctionWinner && (
                    <CheckIsCanBuyWrapper nft={nft} classNameForStatusBadge="text-custom-s">
                        <NftCardButtonForMarketplace openBuyModal={openBuy} nft={nft} />
                    </CheckIsCanBuyWrapper>
                )}
                {isUserOwnerNft && (
                    <>
                        {nftStatus === 'SOLD' && !isStaked && <SellButton nft={nft} />}
                        {isOnSale && <CancelSaleButton nft={nft} />}
                        {nftStatus === 'SOLD' && isStaked && <UnstakeButton nft={nft} />}
                    </>
                )}
                {isUserAuctionWinner && !isUserOwnerNft && <ClaimButtom nft={nft} />}
            </div>
        </NftInfoWrapper>
    )
}

export default NftCardInfo
