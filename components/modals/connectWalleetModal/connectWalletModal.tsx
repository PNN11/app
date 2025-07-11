import { FC, useEffect } from 'react'

import { ModalOverlay } from '../overlay'

import ConnectWalletButton from 'components/common/ui/buttons/connectWalletButton'
import ModalWrapper from 'components/modals/modalWrapper'
import useWalletStore from 'store/useWalletStore'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'

type PropsType = {
    isOpen: boolean
    closeModal: () => void
}
const ConnectWalletModal: FC<PropsType> = ({ closeModal, isOpen }) => {
    const adapters = useWalletStore(state => state.adapters)

    useEffect(() => {
        if (isOpen) sendAnalyticsEvent({ event: 'PopUpConnect_your_wallet' })
    }, [isOpen])

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModal}>
            <ModalWrapper
                title="Connect your wallet"
                close={closeModal}
                className="flex justify-center gap-8"
            >
                {Array.from(adapters.values()).map(adapter => (
                    <ConnectWalletButton
                        key={adapter.title}
                        adapter={adapter}
                        closeModal={closeModal}
                    />
                ))}
            </ModalWrapper>
        </ModalOverlay>
    )
}

export default ConnectWalletModal
