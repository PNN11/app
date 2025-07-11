import { FC } from 'react'

import Image from 'next/image'
import { toast } from 'react-toastify'

import { Web3Core } from 'common-types/web3core'
import { useConnectWallet } from 'hooks/useConnectActiveWallet'
import { useRequireOrBindWallet } from 'hooks/useRequireWallet'
import { blockchains } from 'services/wallets/blockchainProvider'
import { WalletAdapter } from 'services/wallets/types'
import useUserStore from 'store/useUserStore'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import useWalletStore from 'store/useWalletStore'
import getChainId from 'utils/environment/getChainId'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'

type PropsType = {
    adapter: WalletAdapter
    closeModal: () => void
}
const ConnectWalletButton: FC<PropsType> = ({ adapter, closeModal }) => {
    const requireOrBind = useRequireOrBindWallet(adapter)
    const connectWallet = useConnectWallet()

    const activeWallet = useWalletStore(state => state.activeWallet)
    const switchWallet = useWalletStore(state => state.switchWallet)
    const disconnect = useWalletInfoStore(state => state.disconnect)
    const setWalletInfoState = useWalletInfoStore(state => state.setWalletInfoState)
    const setWalletProvider = useWalletInfoStore(state => state.setWalletProvider)
    const userID = useUserStore(s => s.userId)
    const walletAddress = useWalletInfoStore(state => state.walletAddress)
    const isConnect = useWalletConnectInfoStore(store => store.isConnect)
    const chainId = blockchains[getChainId()].id.hex

    const onCLickButton = async (): Promise<void> => {
        sendAnalyticsEvent({ event: 'wallet_selected', options: { walletName: adapter.title } })

        if (walletAddress === '' || adapter.providerId !== activeWallet.providerId || !isConnect) {
            await requireOrBind(async () => {
                const address = await connectWallet(
                    chainId as unknown as Web3Core.EChainID,
                    adapter
                )

                if (address) {
                    disconnect()
                    switchWallet(adapter)
                    setWalletInfoState({
                        chainId,
                        isCorrectChain: true,
                        walletAddress: await adapter.getAddress(),
                        autoConnectEnabled: true,
                    })
                    setWalletProvider(userID, adapter.providerId)

                    closeModal()

                    return
                }
                toast('Failed connect to wallet')
            }, chainId)
        }
    }

    return (
        <button
            type="button"
            onClick={onCLickButton}
            className="flex min-w-[104px] flex-col items-center gap-2 rounded-2xl p-2 hover:bg-base-600"
        >
            <div className="flex h-15 w-15 items-center justify-center rounded-full bg-bg">
                <Image src={adapter.icon} alt={`${adapter.title} icon`} width={40} height={40} />
            </div>
            <span>{adapter.title}</span>
        </button>
    )
}

export default ConnectWalletButton
