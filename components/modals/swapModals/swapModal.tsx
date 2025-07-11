import { FC, useState } from 'react'

import { ModalOverlay } from 'components/modals/overlay'
import { CompletedModal } from 'components/modals/swapModals/completedModal'
import { ConfirmModal } from 'components/modals/swapModals/confirmModal'

interface ISwapModal {
    isOpen: boolean
    closeModal: () => void
}
const SwapModal: FC<ISwapModal> = ({ isOpen, closeModal }) => {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModal}>
            {!isConfirmed ? (
                <ConfirmModal
                    closeModal={closeModal}
                    handleButtonClick={() => setIsConfirmed(true)}
                />
            ) : (
                <CompletedModal closeModal={closeModal} />
            )}
        </ModalOverlay>
    )
}

export default SwapModal
