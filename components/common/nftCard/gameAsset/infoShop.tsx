import { FC } from 'react'

import Link from 'next/link'

import NftInfoWrapper from '../infoWrapper'

import { Game } from 'common-types/game'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import openMintGameAssetModal from 'components/modals/gameAssets/mint'
import openPurchaseGameAssetModal from 'components/modals/PurchaseGameAssetModal'
import { blockchains } from 'services/wallets/blockchainProvider'

interface GameAssetCardForShopInfoProps extends Game.TGameAsset {}

const priceFormatter = (amount: number): string => {
    return new Intl.NumberFormat('us-US', { maximumFractionDigits: 2 }).format(amount)
}

const GameAssetCardForShopInfo: FC<GameAssetCardForShopInfoProps> = props => {
    const { name, price, isOwned, tokenId, marketplaceCollection } = props

    return (
        <NftInfoWrapper className="relative group-hover:-mt-12 group-hover:pb-16">
            <h5 className="font-medium">{name}</h5>
            {tokenId ? (
                <p className="text-base-200">Already minted</p>
            ) : (
                <p>
                    {isOwned && marketplaceCollection ? (
                        <>
                            Can be minted on{' '}
                            {blockchains[marketplaceCollection.payload.chainId].name}
                        </>
                    ) : (
                        <>
                            {priceFormatter(price.amount)} {price.currency.symbol}
                        </>
                    )}
                </p>
            )}
            <div className="absolute left-4 right-4 mt-4 opacity-0 group-hover:mt-2 group-hover:opacity-100">
                {!isOwned && (
                    <SmallButton
                        onClick={() => openPurchaseGameAssetModal(props)}
                        className="w-full"
                    >
                        Buy
                    </SmallButton>
                )}
                {isOwned && tokenId && (
                    <Link className="w-full" href={`/nft/${tokenId}`}>
                        <SmallButton className="w-full">NFT page</SmallButton>
                    </Link>
                )}
                {isOwned && !tokenId && marketplaceCollection && (
                    <SmallButton onClick={() => openMintGameAssetModal(props)} className="w-full">
                        Mint
                    </SmallButton>
                )}
            </div>
        </NftInfoWrapper>
    )
}

export default GameAssetCardForShopInfo
