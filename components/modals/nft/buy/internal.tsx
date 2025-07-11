import { FC, useCallback, useRef } from 'react'

import ItemPreview from '../itemPreview'
import ListingModalWrapper from '../listing/wrapper'

import openBuyNativeSuccess from './nativeSuccess'
import AproveAndConfirmPurchaseSteps from './purchaseSteps'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useBuyInternalNft from 'hooks/nft/buy/useBuyInternal'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type Props = ConfirmableProps & { nft: IMarketplaceToken.TBodyResponse }

const BuyInternalModal: FC<Props> = ({ nft, proceed, show }) => {
    const onClose = (): void => proceed()
    const emit = useEventStore(store => store.emit)

    const requireWallet = useRequireWallet()
    const {
        approveFinished,
        approveProcessing,
        buyFinished,
        buyInternalNft,
        buyProcessing,
        withdrawalProccesing,
    } = useBuyInternalNft()

    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        requireWallet(async () => {
            transactionProcessing.current = true

            const sold = await buyInternalNft(nft)

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

                <AproveAndConfirmPurchaseSteps
                    currencySymbol={nft?.currency?.symbol}
                    approveActive={approveProcessing}
                    approveCompleted={approveFinished}
                    purchaseActive={buyProcessing}
                    purchaseCompleted={buyFinished}
                    onClickButton={onClickContinue}
                    isLoading={approveProcessing || buyProcessing || withdrawalProccesing}
                />
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openBuyInternalModal = promisifyModal(BuyInternalModal)

export default openBuyInternalModal
