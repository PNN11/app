import { FC, useCallback, useState } from 'react'

import { ECheckoutStep } from '../listing'

import ClaimAuctionReward from './claim'
import SuccessClaim from './success'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { IModal } from 'components/modals/interfaces/modalInterface'
import { ModalOverlay } from 'components/modals/overlay'

type PropsType = IModal & {
    nft: IMarketplaceToken.TBodyResponse
}

const ClaimAuctionModal: FC<PropsType> = ({ isOpen, close, nft }) => {
    const [step, setStep] = useState(ECheckoutStep.CONFIRM)

    const onConfirm = useCallback(() => {
        setStep(ECheckoutStep.DONE)
    }, [])

    const onDone = useCallback(() => {
        close()

        setStep(ECheckoutStep.CONFIRM)
    }, [])

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            {step === ECheckoutStep.CONFIRM && (
                <ClaimAuctionReward nft={nft} isOpen={isOpen} close={close} onConfirm={onConfirm} />
            )}
            {step === ECheckoutStep.DONE && (
                <SuccessClaim nft={nft} isOpen={isOpen} close={close} onDone={onDone} />
            )}
        </ModalOverlay>
    )
}

export default ClaimAuctionModal
