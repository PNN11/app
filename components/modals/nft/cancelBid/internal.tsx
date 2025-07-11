import { FC, useCallback, useRef } from 'react'

import { toast } from 'react-toastify'

import ListingModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useCancelBidInternal from 'hooks/nft/bid/useCancelInternal'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

export type CancelBidInternalModalProps = ConfirmableProps & {
    nft: IMarketplaceToken.TBodyResponse
    amount: number
    lastListingId: number
}

const CancelBidInternalModal: FC<CancelBidInternalModalProps> = ({
    nft,
    proceed,
    show,
    amount,
    lastListingId,
}) => {
    const requireWallet = useRequireWallet()
    const emit = useEventStore(store => store.emit)

    const { approveProcessing, cancelBidFinished, cancelBidInternal, cancelBidProcessing } =
        useCancelBidInternal()

    const close = useCallback(() => proceed(), [])

    const transactionProcessing = useRef(false)

    const onConfirmHandler = async (): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true

            const res = await cancelBidInternal({
                amount,
                lastListingId,
                decimals: nft.currency.decimals,
            })

            transactionProcessing.current = false

            if (!res?.success) {
                toast('Failed to cancel bid')

                return
            }

            emit(`cancelBid-${lastListingId}`, { target: nft })

            close()
        }, getNftChainId(nft))
    }

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ListingModalWrapper title="Cancel bid?" close={close}>
                <div className="mb-3">
                    <div className="mb-2 flex items-center gap-2">
                        <Step
                            active={approveProcessing || cancelBidProcessing}
                            completed={cancelBidFinished}
                            number={1}
                        />
                        <p className="text-custom-sl">Confirm cancellation</p>
                    </div>
                    <p>You’ll be asked to review and confirm this cancellation from your wallet.</p>
                </div>
                <MarketplaceButton
                    onClick={onConfirmHandler}
                    isLoading={approveProcessing || cancelBidProcessing}
                    className="w-full"
                >
                    {cancelBidFinished ? 'Close' : 'Continue'}
                </MarketplaceButton>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openCancelBidInternalModal = promisifyModal(CancelBidInternalModal)

export default openCancelBidInternalModal
