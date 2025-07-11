import { FC, useCallback, useRef } from 'react'

import ItemPreview from '../itemPreview'
import ListingModalWrapper from '../listing/wrapper'

import openBuyNativeSuccess from './nativeSuccess'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useBuyNativeNft from 'hooks/nft/buy/useBuyNative'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type Props = { nft: IMarketplaceToken.TBodyResponse }

const BuyNativeModal: FC<Props & ConfirmableProps> = ({ nft, proceed, show, cancel }) => {
    const onClose = (): void => proceed()
    const emit = useEventStore(store => store.emit)

    const requireWallet = useRequireWallet()
    const { buyFinished, buyProcessing, buyNativeNft } = useBuyNativeNft()

    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        requireWallet(async () => {
            transactionProcessing.current = true

            const sold = await buyNativeNft(nft)

            transactionProcessing.current = false

            if (sold?.success) {
                emit(`buy-${nft._id}`, { target: nft })
                openBuyNativeSuccess({ nft })
                onClose()
            }
        }, getNftChainId(nft))
    }, [nft])

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <ListingModalWrapper
                title="Complete your purchase"
                close={onClose}
                className="space-y-7"
            >
                <ItemPreview nft={nft} />

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Step active={buyProcessing} completed={buyFinished} number={1} />
                            <p className="text-custom-sl">Confirm purchase</p>
                        </div>

                        <MarketplaceButton
                            className="w-full"
                            onClick={buyFinished ? cancel : onClickContinue}
                            isLoading={buyProcessing}
                        >
                            {buyFinished ? 'Close' : 'Continue'}
                        </MarketplaceButton>
                    </div>
                </div>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openBuyNativeModal = promisifyModal(BuyNativeModal)

export default openBuyNativeModal
