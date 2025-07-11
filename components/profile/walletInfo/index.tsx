import { FC } from 'react'

import Image from 'next/image'

import WrapperBlock from '../wrapperBlock'

import CopyWalletButton from './copyWalletButton'
import WalletActionButton from './walletActionButton'

import openWithdrawFromCustodialWalletModal from 'components/modals/swapModals/withdraw/custodialWallet'
import SendIcon from 'components/svg/profile/send'
import { useHydrated } from 'hooks/useHydrated'
import { blockchains } from 'services/wallets/blockchainProvider'
import useUserStore from 'store/useUserStore'
import { maskInfo } from 'utils/mask-info'

const WalletInfo: FC = () => {
    const isHydrated = useHydrated()
    const wallets = useUserStore(s => s.wallets)

    return isHydrated ? (
        <WrapperBlock title="My wallet">
            <div className="flex flex-col gap-y-2">
                {isHydrated &&
                    Object.values(blockchains).map(chain => {
                        const wallet = wallets.find(wallet => wallet.chainType === chain.chainType)

                        if (!wallet) return null

                        return (
                            <div
                                key={`${wallet.address}${wallet.chainType}${chain.name}`}
                                className="grid grid-cols-2 gap-1 rounded-2xl bg-base-700 py-4 px-5 text-base md:grid-cols-3"
                            >
                                <p className="order-1 flex w-full items-center gap-2 capitalize text-base-100/70">
                                    <Image
                                        src={chain.img}
                                        alt={chain.name}
                                        width={24}
                                        height={24}
                                    />

                                    {chain.name?.toLowerCase()}
                                </p>
                                <input
                                    readOnly
                                    disabled
                                    type="text"
                                    name={wallet.address}
                                    value={maskInfo(wallet.address, 12, 12)}
                                    className="order-3 col-span-2 w-full bg-transparent md:order-2 md:col-span-1"
                                />
                                <div className="order-2 flex w-full items-center justify-end gap-1">
                                    <CopyWalletButton address={wallet.address} />
                                    <WalletActionButton
                                        Icon={SendIcon}
                                        title="Send"
                                        onClick={() => openWithdrawFromCustodialWalletModal()}
                                    />
                                </div>
                            </div>
                        )
                    })}
            </div>
        </WrapperBlock>
    ) : null
}

export default WalletInfo
