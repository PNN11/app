import { FC, useCallback, useRef } from 'react'

import { toast } from 'react-toastify'

import { promisifyModal } from '../../promissify'
import { ConfirmableProps } from '../../promissify/types'
import ListingModalWrapper from '../listing/wrapper'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { ModalOverlay } from 'components/modals/overlay'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import useGetCancelListingFunc from 'hooks/nft/listing/useGetCancelFunc'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import useWalletStore from 'store/useWalletStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = ConfirmableProps & {
    nft: IMarketplaceToken.TBodyResponse
}

const CancelListingModal: FC<PropsType> = ({ proceed, show, nft }) => {
    const { wrap, finished, processing, reset } = useAsyncWrapper()
    const requireWallet = useRequireWallet()
    const activeWallet = useWalletStore(state => state.activeWallet)
    const close = useCallback(() => proceed(), [])
    const getCancelFunc = useGetCancelListingFunc()
    const emit = useEventStore(store => store.emit)
    const getBlockchainService = useGetRequiredBlockchainService()

    const transactionProcessing = useRef(false)

    const onConfirmHandler = async (): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            if (finished) return close()
            transactionProcessing.current = true
            const blockchainService = await getBlockchainService()
            const cancelFunc = getCancelFunc(nft, blockchainService)
            const [res] = await wrap(async () => {
                if (
                    nft.collection.payload.type === MarketplaceCollectionType.MINT &&
                    nft.payload.type === MarketplaceCollectionType.MINT
                ) {
                    const tx = await cancelFunc({
                        listingId: nft.payload.lastListingId,
                    })

                    const cancelTx = await blockchainService.sendTransaction({ activeWallet, tx })

                    const canceled = await activeWallet.waitForTx(cancelTx?.hash)

                    return canceled
                }
            }, null)()

            transactionProcessing.current = false

            if (!res?.success) {
                toast(`Failed to  cancel listing`)
                reset()

                return
            }

            emit(`cancel-${nft._id}`, { target: nft })

            close()
        }, getNftChainId(nft))
    }

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ListingModalWrapper title="Cancel listing?" close={close}>
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

const openCancelListingModal = promisifyModal(CancelListingModal)

export default openCancelListingModal
