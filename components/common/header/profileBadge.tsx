/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Skeleton from '../skeleton'

import ConnectWalletModal from 'components/modals/connectWalleetModal/connectWalletModal'
import CopyButton from 'components/profile/basicInfo/copyButton'
import { useDisconnectAndLogout } from 'hooks/useDisconnectAndLogout'
import { useGetUserInfoState } from 'hooks/useGetUserInfo'
import { useHydrated } from 'hooks/useHydrated'
import { useModal } from 'hooks/useModal'
import { useWindowSize } from 'hooks/useWindowSize'
import useUserStore from 'store/useUserStore'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import useWalletStore from 'store/useWalletStore'
import { maskInfo } from 'utils/mask-info'

type PropsType = {
    openMenu: () => void
    expandedBadgeDrop: boolean
}
export const ProfileBadge: FC<PropsType> = ({ openMenu, expandedBadgeDrop }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenConnectWalletModal, , closeConnectWalletModal] = useModal(false)
    const { width } = useWindowSize()
    const isHydrated = useHydrated()

    const userName = useUserStore(state => state.userName)
    const userId = useUserStore(state => state.userId)
    const image = useUserStore(state => state.image)
    const walletAddress = useWalletInfoStore(state => state.walletAddress)
    const isConnect = useWalletConnectInfoStore(store => store.isConnect)

    const activeWallet = useWalletStore(state => state.activeWallet)

    const profileBadge = useRef() as MutableRefObject<HTMLDivElement>

    const isLoading = useGetUserInfoState()

    const { logOut } = useDisconnectAndLogout()

    useEffect(() => {
        const onClick = (e: any): void => {
            if (!profileBadge.current!.contains(e.target)) setIsOpen(false)
        }

        if (isOpen) {
            document.addEventListener('click', onClick)
        } else document.removeEventListener('click', onClick)

        return () => document.removeEventListener('click', onClick)
    }, [isOpen])
    useEffect(() => {
        const resizeHandler = (): void => {
            if (window.innerWidth <= 1024 && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [isOpen])

    return (
        <div
            ref={profileBadge}
            className={`relative flex h-10 w-[11.375rem] cursor-pointer select-none items-center justify-between gap-2 rounded-3 bg-cta
             py-1 px-2  lg:h-12 lg:py-2 ${expandedBadgeDrop || isOpen ? '' : 'hover:bg-cta-600'}`}
            onClick={() => {
                if (width >= 1024) {
                    setIsOpen(prevState => !prevState)
                } else {
                    openMenu()
                }
            }}
        >
            <div className="flex gap-2">
                <div className="h-8 w-8">
                    <Skeleton
                        isLoading={isLoading || !isHydrated}
                        classes={{ skeleton: 'h-full rounded-full' }}
                    >
                        <Image
                            src={image || '/img/defaultPhoto.jpg'}
                            alt="Profile photo"
                            height={32}
                            width={32}
                            quality={100}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    </Skeleton>
                </div>
                <div>
                    <div className="max-w-[6rem] truncate text-custom-s">
                        {isHydrated ? userName : ''}
                    </div>
                    <div className="text-xs opacity-70">
                        id {isHydrated ? maskInfo(userId) : ''}
                    </div>
                </div>
            </div>
            <div className="flex aspect-square h-4 items-center justify-center">
                <Image src="/img/arrowSelect.svg" alt="arrowSelect" height={5} width={10} />
            </div>
            {isOpen ? (
                <ul className="translate-z-10 absolute left-0 top-[120%] z-10 w-full rounded-3 bg-cta">
                    <Link href="/profile" className="w-full">
                        <li className="border-line-gradient rounded-t-3 border-b px-3 pt-2 pb-1 hover:bg-cta-600">
                            <li className="text-xs">Profile</li>
                        </li>
                    </Link>
                    {walletAddress && isConnect && (
                        <li className="cursor-pointer px-3 py-1 text-xs hover:bg-cta-600">
                            <div className="flex items-center gap-2">
                                <span>Connected wallet</span>
                                <Image
                                    src={activeWallet.icon}
                                    alt={activeWallet.title}
                                    width={24}
                                    height={24}
                                />
                            </div>

                            <CopyButton value={walletAddress}>
                                {isHydrated ? maskInfo(walletAddress, 8, 9) : ''}
                            </CopyButton>
                        </li>
                    )}
                    {/* <li
                        className="cursor-pointer py-1 px-3 text-xs hover:bg-cta-600"
                        onClick={openConnectWalletModal}
                    >
                        {isHydrated && walletAddress && isConnect
                            ? 'Connect a different wallet'
                            : 'Connect wallet'}
                    </li>
                    {isHydrated && walletAddress && isConnect && (
                        <li
                            className="cursor-pointer py-1 px-3 text-xs hover:bg-cta-600"
                            onClick={handleDisconnectWallet}
                        >
                            Disconnect wallet
                        </li>
                    )} */}
                    <li
                        className="border-line-gradient cursor-pointer border-t px-3 pt-1 pb-2 text-xs hover:bg-cta-600"
                        onClick={logOut}
                    >
                        Log Out
                    </li>
                    {/* <li className="border-line-gradient cursor-pointer rounded-b-3 border-t text-xs hover:bg-cta-600">
                        <Link className="block px-3 pt-1 pb-2" href="/deleteaccount">
                            Delete account
                        </Link>
                    </li> */}
                </ul>
            ) : null}
            <ConnectWalletModal
                isOpen={isOpenConnectWalletModal}
                closeModal={closeConnectWalletModal}
            />
        </div>
    )
}
