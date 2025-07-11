import { FC, useCallback, useState } from 'react'

import { useRouter } from 'next/router'

import { IModal } from '../../interfaces/modalInterface'
import { ModalOverlay } from '../../overlay'
import { ECheckoutStep } from '../listing'

import OpenMysteryBoxConfirm from './confirm'
import OpenMysteryBoxSuccess from './success'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useEventStore from 'store/useEventStore'

type OpenMysteryBoxProps = IModal & {
    mysteryBox: IMarketplaceToken.TBodyResponse
}

const OpenMysteryBox: FC<OpenMysteryBoxProps> = ({ close, isOpen, mysteryBox }) => {
    const [step, setStep] = useState(ECheckoutStep.CONFIRM)
    const [token, setToken] = useState<IMarketplaceToken.TBodyResponse>(null)
    const emit = useEventStore(store => store.emit)
    const { push } = useRouter()

    const onConfirm = useCallback((token: IMarketplaceToken.TBodyResponse) => {
        setStep(ECheckoutStep.DONE)
        setToken(token)
        emit(`open-${mysteryBox._id}`, { target: mysteryBox })
    }, [])

    const onDone = useCallback(() => {
        close()

        setStep(ECheckoutStep.CONFIRM)
    }, [])

    const handleCloseModal = useCallback(() => {
        if (step === ECheckoutStep.DONE) {
            push(`/mysterybox/${mysteryBox._id}`)

            return
        }

        close()
    }, [step, mysteryBox, push, close])

    return (
        <ModalOverlay isOpen={isOpen} onClose={handleCloseModal}>
            {step === ECheckoutStep.CONFIRM && (
                <OpenMysteryBoxConfirm
                    mysteryBox={mysteryBox}
                    isOpen={isOpen}
                    close={close}
                    onConfirm={onConfirm}
                />
            )}
            {step === ECheckoutStep.DONE && (
                <OpenMysteryBoxSuccess
                    token={token}
                    mysteryBox={mysteryBox}
                    isOpen={isOpen}
                    close={close}
                    onDone={onDone}
                />
            )}
        </ModalOverlay>
    )
}

export default OpenMysteryBox
