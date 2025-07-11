import { FC, useCallback, useRef } from 'react'

import { promisifyModal } from '../../promissify'
import { ConfirmableProps } from '../../promissify/types'

import BidForm, { TBidFormType } from './form'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { ModalOverlay } from 'components/modals/overlay'
import useBidNft from 'hooks/nft/bid/useBid'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = {
    nft: IMarketplaceToken.TBodyResponse
}
const BidModal: FC<PropsType & ConfirmableProps> = ({ nft, proceed, show }) => {
    const requireWallet = useRequireWallet()
    const { bidNft, bidProcessing, approveProcessing, getLastBidLoading } = useBidNft()

    const close = useCallback(() => proceed(), [])

    const transactionProcessing = useRef(false)

    const emit = useEventStore(store => store.emit)

    const submitForm = async ({ bidPrice }: TBidFormType): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true
            const res = await bidNft(nft, +bidPrice)

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
                isLoading={bidProcessing || approveProcessing || getLastBidLoading}
            />
        </ModalOverlay>
    )
}
const openBidModal = promisifyModal(BidModal)

export default openBidModal
