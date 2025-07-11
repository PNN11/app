import { FC, useCallback, useRef } from 'react'

import BidForm, { TBidFormType } from './form'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useBidInternalNft from 'hooks/nft/bid/useBidInternal'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type Props = ConfirmableProps & {
    nft: IMarketplaceToken.TBodyResponse
}
const BidInternalModal: FC<Props> = ({ nft, proceed, show }) => {
    const close = useCallback(() => proceed(), [])
    const requireWallet = useRequireWallet()
    const {
        bidProcessing,
        getLastBidLoading,
        approveProcessing,
        bidInternalNft,
        withdrawalProcessing,
    } = useBidInternalNft()

    const transactionProcessing = useRef(false)

    const emit = useEventStore(store => store.emit)

    const submitForm = async ({ bidPrice }: TBidFormType): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true
            const res = await bidInternalNft(nft, +bidPrice)

            transactionProcessing.current = false

            if (res?.success && nft.payload.type === 'MINT') {
                emit(`bid-${nft._id}`, {
                    target: { ...nft, payload: { ...nft.payload, lastBidPriceAmount: bidPrice } },
                })
                close()
            }
        }, getNftChainId(nft))
    }

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <BidForm
                nft={nft}
                close={close}
                onSubmit={submitForm}
                isLoading={
                    bidProcessing || getLastBidLoading || approveProcessing || withdrawalProcessing
                }
            />
        </ModalOverlay>
    )
}

const openBidInternalModal = promisifyModal(BidInternalModal)

export default openBidInternalModal
