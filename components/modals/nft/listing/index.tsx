import { FC, useCallback, useState } from 'react'

import SuccessListing from './success'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { IModal } from 'components/modals/interfaces/modalInterface'
import ConfirmSecondaryListing from 'components/modals/nft/listing/confirm'
import { ModalOverlay } from 'components/modals/overlay'

export enum ECheckoutStep {
    CONFIRM,
    PROCESSING,
    DONE,
}

type PropsType = IModal & {
    nft: IMarketplaceToken.TBodyResponse
    txInfo: Gallery.TxInfoType
    setOnSalle?: () => void
}

const ListingModal: FC<PropsType> = ({ txInfo, isOpen, close, nft, setOnSalle = () => {} }) => {
    const [step, setStep] = useState(ECheckoutStep.CONFIRM)

    const onConfirm = useCallback(() => {
        setStep(ECheckoutStep.DONE)
    }, [])

    const onDone = useCallback(() => {
        close()
        setOnSalle()
        setStep(ECheckoutStep.CONFIRM)
    }, [])

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            {step === ECheckoutStep.CONFIRM && (
                <ConfirmSecondaryListing
                    txInfo={txInfo}
                    nft={nft}
                    isOpen={isOpen}
                    close={close}
                    onConfirm={onConfirm}
                />
            )}
            {step === ECheckoutStep.DONE && (
                <SuccessListing nft={nft} isOpen={isOpen} close={close} onDone={onDone} />
            )}
        </ModalOverlay>
    )
}

export default ListingModal
