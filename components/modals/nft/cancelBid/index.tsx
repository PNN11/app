import { FC, useCallback, useRef } from 'react'

import { toast } from 'react-toastify'

import ListingModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import useWalletStore from 'store/useWalletStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type CancelBidModalProps = ConfirmableProps & {
    nft: IMarketplaceToken.TBodyResponse
    lastListingId: number
}

const CancelBidModal: FC<CancelBidModalProps> = ({ nft, proceed, show, lastListingId }) => {
    const requireWallet = useRequireWallet()
    const emit = useEventStore(store => store.emit)
    const { wrap, finished, processing, reset } = useAsyncWrapper()
    const activeWallet = useWalletStore(state => state.activeWallet)

    const getBlockchainService = useGetRequiredBlockchainService()

    const close = useCallback(() => proceed(), [])

    const transactionProcessing = useRef(false)

    const onConfirmHandler = async (): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            if (finished) return close()
            transactionProcessing.current = true
            const blockchainService = await getBlockchainService()
            const [res] = await wrap(async () => {
                const tx = await blockchainService.cancelBid({
                    listingId: lastListingId,
                })

                const cancelTx = await blockchainService.sendTransaction({ activeWallet, tx })

                const canceled = await activeWallet.waitForTx(cancelTx?.hash)

                return canceled
            }, null)()

            transactionProcessing.current = false

            if (!res?.success) {
                toast(`Failed to cancel bid`)
                reset()

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
                        <Step active={processing} completed={finished} number={1} />
                        <p className="text-custom-sl">Confirm cancellation</p>
                    </div>
                    <p>You’ll be asked to review and confirm this cancellation from your wallet.</p>
                </div>
                <MarketplaceButton
                    onClick={onConfirmHandler}
                    isLoading={processing}
                    className="w-full"
                >
                    {finished ? 'Close' : 'Continue'}
                </MarketplaceButton>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openCancelBidModal = promisifyModal(CancelBidModal)

export default openCancelBidModal
