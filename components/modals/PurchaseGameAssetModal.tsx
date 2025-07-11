import { FC, useCallback, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import ListingModalWrapper from './nft/listing/wrapper'
import { ModalOverlay } from './overlay'
import { promisifyModal } from './promissify/index'
import { ConfirmableProps } from './promissify/types'

import { Game } from 'common-types/game'
import BinanceButton from 'components/common/ui/buttons/binanceButton'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BinanceIcon from 'components/svg/binance'
import useMintGameAsset from 'hooks/gameAssets/useMint'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { HttpError } from 'utils/httpError'

interface Props extends ConfirmableProps, Game.TGameAsset {}

const SUCCESSFUL_BUY_MESSAGE =
    'You have successfully purchased asset, you can see all your assets in inventory tab'

const PurchaseGameAssetModal: FC<Props> = ({
    proceed,
    show,
    cover,
    name,
    price,
    gameAssetId,
    marketplaceCollection,
}) => {
    const [tokenId, setTokenId] = useState('')
    const gameService = useServiceStore(s => s.gameService)
    const accessToken = useUserStore(s => s.accessToken)
    const queryClient = useQueryClient()
    const mintMutation = useMintGameAsset()

    const close = useCallback(() => proceed(), [])

    const buyMutation = useMutation(gameService.buyGameAssetWithInternalBalance, {
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const handleBuyWithAMT = async (): Promise<void> => {
        const buyRes = await buyMutation.mutateAsync({ gameAssetId })

        if (!buyRes.ok) return
        await Promise.allSettled([
            queryClient.invalidateQueries({ queryKey: QueryKeys.GET_ALL_GAMES_ASSETS }),
            queryClient.invalidateQueries({ queryKey: QueryKeys.GET_MY_GAMES_ASSETS }),
        ])

        if (marketplaceCollection?.payload?.chainId !== '0x3a14269b') {
            toast.success(SUCCESSFUL_BUY_MESSAGE)

            return
        }
        const res = await mintMutation.mutateAsync({ assetId: gameAssetId })

        if (!res) return

        setTokenId(res.tokenId)
    }

    const url = `/api/buy-game-asset-binance?accessToken=${accessToken?.token}&gameAssetId=${gameAssetId}`

    if (!show) return null

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ListingModalWrapper title="Complete your purchase" close={close} className="space-y-7">
                <div className="border-line-gradient flex justify-between border-b pb-2 text-xs text-base-300">
                    <div>Item</div>
                    <div>Subtotal</div>
                </div>
                <div className="border-line-gradient flex items-center justify-between border-b pb-7 text-xl">
                    <div className="flex items-center gap-2">
                        <Image
                            src={cover}
                            width={70}
                            height={70}
                            alt="nft preview"
                            className="aspect-square w-[4.375rem] rounded-2xl"
                        />
                        {name}
                    </div>
                    {price.amount} {price.currency.symbol}
                </div>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    {tokenId ? (
                        <Link className="w-full" href={`/nft/${tokenId}`} onClick={close}>
                            <MarketplaceButton>Go to NFT page</MarketplaceButton>
                        </Link>
                    ) : (
                        <>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={url}
                                className="w-full md:w-auto"
                            >
                                <BinanceButton type="button">
                                    <>
                                        <BinanceIcon />
                                        <span className="ml-3 font-medium">
                                            Pay with Binance Pay
                                        </span>
                                    </>
                                </BinanceButton>
                            </a>
                            <SmallButton
                                className="h-13 w-full text-lg font-medium md:w-auto md:flex-auto"
                                isLoading={buyMutation.isLoading || mintMutation.isLoading}
                                onClick={handleBuyWithAMT}
                            >
                                Buy with AMT
                            </SmallButton>
                        </>
                    )}
                </div>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openPurchaseGameAssetModal = promisifyModal(PurchaseGameAssetModal)

export default openPurchaseGameAssetModal
