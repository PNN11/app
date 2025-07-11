import { FC, useCallback, useRef } from 'react'

import BidForm, { TBidFormType } from './form'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useBidNftNative from 'hooks/nft/bid/useBidNative'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type Props = {
    nft: IMarketplaceToken.TBodyResponse
}
const BidNativeModal: FC<Props & ConfirmableProps> = ({ nft, proceed, show }) => {
    const close = useCallback(() => proceed(), [])
    const requireWallet = useRequireWallet()
    const { bidProcessing, getLastBidLoading, bidNative } = useBidNftNative()

    const transactionProcessing = useRef(false)

    const emit = useEventStore(store => store.emit)

    const submitForm = async ({ bidPrice }: TBidFormType): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true
            const res = await bidNative(nft, bidPrice)

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
                isLoading={bidProcessing || getLastBidLoading}
            />
        </ModalOverlay>
    )
}

const openBidNativeModal = promisifyModal(BidNativeModal)

export default openBidNativeModal
