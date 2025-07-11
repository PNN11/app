import { FC, useCallback, useState } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import BuyNftConfirm from 'components/modals/nft/buy/confirm'
import BuyNftSuccess from 'components/modals/nft/buy/success'
import { ECheckoutStep } from 'components/modals/nft/listing'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import useEventStore from 'store/useEventStore'

type PropsType = {
    nft: IMarketplaceToken.TBodyResponse
}
const BuyNftModal: FC<PropsType & ConfirmableProps> = ({ nft, proceed, show }) => {
    const [step, setStep] = useState(ECheckoutStep.CONFIRM)
    const emit = useEventStore(store => store.emit)
    const close = useCallback(() => proceed(), [])

    const onConfirm = useCallback(() => {
        setStep(ECheckoutStep.DONE)
        emit(`buy-${nft._id}`, { target: nft })
    }, [])

    const onDone = useCallback(() => {
        close()
        setStep(ECheckoutStep.CONFIRM)
    }, [])

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            {step === ECheckoutStep.CONFIRM && (
                <BuyNftConfirm nft={nft} isOpen={show} close={close} onConfirm={onConfirm} />
            )}
            {step === ECheckoutStep.DONE && (
                <BuyNftSuccess nft={nft} isOpen={show} close={close} onDone={onDone} />
            )}
        </ModalOverlay>
    )
}

const openBuyModal = promisifyModal(BuyNftModal)

export default openBuyModal
