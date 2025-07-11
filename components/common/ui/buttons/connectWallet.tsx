import { FC } from 'react'

import CallToAction from '../ctaMessage'

import ConnectWalletModal from 'components/modals/connectWalleetModal/connectWalletModal'
import { useModal } from 'hooks/useModal'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'

export const ConnectWallet: FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [isOpen, open, close] = useModal(false)
    const walletAddress = useWalletInfoStore(state => state.walletAddress)
    const isConnect = useWalletConnectInfoStore(state => state.isConnect)

    return walletAddress && isConnect ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    ) : (
        <>
            <CallToAction
                actionButton="Connect wallet"
                title="Connect your wallet"
                description="You need to connect your wallet to interact with your NFTs"
                onButtonClick={open}
            />
            <ConnectWalletModal isOpen={isOpen} closeModal={close} />
        </>
    )
}
