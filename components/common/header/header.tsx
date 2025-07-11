/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Tag from '../ui/badges/tag'
import SmallButton from '../ui/buttons/newSmallButton'

import HeaderLink from './headerLink'

import { ProfileBadge } from 'components/common/header/profileBadge'
import ConnectWalletModal from 'components/modals/connectWalleetModal/connectWalletModal'
import CopyButton from 'components/profile/basicInfo/copyButton'
import Burger from 'components/svg/burger'
import CloseMobileMenu from 'components/svg/closeMobileMenu'
import useAddOrRemoveTransition from 'hooks/useAddOrRemoveTransition'
import { useDisconnectAndLogout } from 'hooks/useDisconnectAndLogout'
import { useHydrated } from 'hooks/useHydrated'
import { useModal } from 'hooks/useModal'
import useUserStore from 'store/useUserStore'
import useWalletConnectInfoStore from 'store/useWalletConnectInfoStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import useWalletStore from 'store/useWalletStore'
import { maskInfo } from 'utils/mask-info'

const Header: FC = () => {
    const [fixed, setFixed] = useState(false)
    const router = useRouter()
    const { asPath } = router
    const [expanded, setExpanded] = useState(false)
    const [expandedBadgeDrop, setExpandedBadgeDrop] = useState(false)
    const accessToken = useUserStore(state => state.accessToken)
    const isHydrated = useHydrated()
    const walletAddress = useWalletInfoStore(state => state.walletAddress)
    const isConnect = useWalletConnectInfoStore(store => store.isConnect)

    const [isOpenConnectWalletModal, , closeConnectWalletModal] = useModal(false)

    const activeWallet = useWalletStore(state => state.activeWallet)

    const menu = useRef<HTMLUListElement>(null)

    const { classes, handleRemoveOrAddTransition } = useAddOrRemoveTransition()

    const { logOut } = useDisconnectAndLogout()

    const handleLogout = (): void => {
        logOut()
        setExpandedBadgeDrop(false)
    }

    const handleCloseMenu = useCallback(() => {
        setExpanded(false)
    }, [])

    const handleClickOnOverlay = (): void => {
        if (expanded) setExpanded(false)
        if (expandedBadgeDrop) setExpandedBadgeDrop(false)
    }

    useEffect(() => {
        const scrollHandler = (): void => {
            if (window.scrollY > 0 && !fixed) setFixed(true)
            if (window.scrollY === 0 && fixed) setFixed(false)
        }

        scrollHandler()

        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [fixed])

    useEffect(() => {
        const resizeHandler = (): void => {
            if (window.innerWidth > 1024 && expanded) {
                setExpanded(false)
            }
            if (window.innerWidth > 1024 && expandedBadgeDrop) {
                setExpandedBadgeDrop(false)
            }
            handleRemoveOrAddTransition({ ref: menu })
        }

        resizeHandler()

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [expanded, expandedBadgeDrop])

    return (
        <>
            <header
                id="header"
                className={`translate-z-10 sticky top-0 left-0 right-0 z-[12] transition-colors
                duration-[400ms] ${
                    fixed || expanded || expandedBadgeDrop ? 'bg-bg' : 'bg-transparent'
                }`}
            >
                <div
                    className={`mx-auto flex max-w-grid-container items-center gap-7 px-3 py-1.5 transition-all
                     duration-[400ms] sm:px-12 lg:py-3 xl:px-16`}
                >
                    <Link
                        onClick={handleCloseMenu}
                        href="/"
                        className="z-10 w-12 transition-all duration-[400ms] lg:w-19.25"
                    >
                        <Image src="/logop.svg" width={74} height={44} alt="logo" />
                    </Link>
                    <nav
                        className={`flex grow flex-nowrap items-center justify-end gap-2 lg:gap-9 ${
                            asPath.includes('auth') || typeof accessToken === 'undefined'
                                ? 'hidden'
                                : ''
                        }`}
                    >
                        <ul
                            className={`absolute top-13 right-0 left-0 flex grow flex-col flex-nowrap items-center justify-center gap-5 bg-bg px-10
                            pt-6 pb-10 text-base-100 lg:static lg:flex-row lg:justify-start lg:gap-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:pb-0 ${
                                expanded ? '' : '-translate-y-[150%] lg:translate-y-0'
                            } ${classes}`}
                            ref={menu}
                        >
                            <HeaderLink onClick={handleCloseMenu} title="Games" href="/games" />
                            <HeaderLink
                                onClick={handleCloseMenu}
                                title="Marketplace"
                                href="/marketplace"
                            />
                            <HeaderLink onClick={handleCloseMenu} title="Raffle" href="/raffle">
                                <Tag>New</Tag>
                            </HeaderLink>
                            <HeaderLink onClick={handleCloseMenu} title="Staking" href="/staking">
                                <Tag>New</Tag>
                            </HeaderLink>
                            <HeaderLink onClick={handleCloseMenu} title="About Us" href="/about" />
                            <HeaderLink onClick={handleCloseMenu} title="Blog" href="/blog" />

                            <HeaderLink
                                onClick={handleCloseMenu}
                                title="Swap"
                                href="/swap"
                                classes={{ wrapper: 'lg:hidden' }}
                            />
                        </ul>
                        <ul
                            className={`absolute top-13 right-0 left-0 flex grow flex-col flex-nowrap items-center justify-center gap-3 bg-bg
                            pt-6 pb-10 text-custom-1xl text-base-100 duration-700 lg:hidden ${
                                expandedBadgeDrop ? '' : '-translate-y-[150%] lg:translate-y-0'
                            }`}
                        >
                            <li className="border-line-gradient w-full rounded-t-3 border-b px-3 pb-3 text-center">
                                <Link
                                    href="/profile"
                                    className="hover:bg-blue-pearl-100 block w-full"
                                    onClick={() => setExpandedBadgeDrop(false)}
                                >
                                    Profile
                                </Link>
                            </li>
                            {walletAddress && isHydrated && isConnect && (
                                <li className="hover:bg-blue-pearl-100 flex w-full cursor-pointer flex-col items-center px-3">
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
                                className="hover:bg-blue-pearl-100 w-full cursor-pointer px-3 text-center"
                                onClick={openConnectWalletModal}
                            >
                                {isHydrated && walletAddress && isConnect
                                    ? 'Connect a different wallet'
                                    : 'Connect wallet'}
                            </li> */}
                            {/* {isHydrated && walletAddress && (
                                <li
                                    className="hover:bg-blue-pearl-100 w-full cursor-pointer px-3 text-center"
                                    onClick={handleDisconnectWallet}
                                >
                                    Disconnect wallet
                                </li>
                            )} */}
                            <li className="border-line-gradient w-full border-t pt-3">
                                <div
                                    className="hover:bg-blue-pearl-100 cursor-pointer px-3 py-2 text-center"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </div>
                            </li>
                            {/* <li className="border-line-gradient w-full border-t pt-3">
                                <Link
                                    href="/deleteaccount"
                                    className="hover:bg-blue-pearl-100 block cursor-pointer px-3 py-2 text-center"
                                    onClick={() => {
                                        setExpandedBadgeDrop(false)
                                    }}
                                >
                                    Delete account
                                </Link>
                            </li> */}
                        </ul>
                        {isHydrated && (
                            <div className="flex items-center gap-3">
                                <Link href="/swap" className="hidden lg:block">
                                    <SmallButton
                                        variant="outlined"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Swap
                                    </SmallButton>
                                </Link>
                                {accessToken?.token ? (
                                    <ProfileBadge
                                        expandedBadgeDrop={expandedBadgeDrop}
                                        openMenu={() => {
                                            setExpanded(false)
                                            setExpandedBadgeDrop(!expandedBadgeDrop)
                                        }}
                                    />
                                ) : (
                                    <Link
                                        onClick={() => handleClickOnOverlay()}
                                        className="z-[3]"
                                        href="/auth/sign-in"
                                    >
                                        <SmallButton>Sign in</SmallButton>
                                    </Link>
                                )}
                            </div>
                        )}

                        <button
                            type="button"
                            aria-label="Open menu"
                            className="z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-base-100/20 lg:hidden"
                            onClick={() => {
                                setExpandedBadgeDrop(false)
                                setExpanded(!expanded)
                            }}
                        >
                            {expanded ? <CloseMobileMenu /> : <Burger />}
                        </button>
                    </nav>
                </div>
                <ConnectWalletModal
                    isOpen={isOpenConnectWalletModal}
                    closeModal={closeConnectWalletModal}
                />
                <div id="sub-header" />
            </header>
            {/* <SubHeader /> */}
            <div
                className={`fixed inset-0 z-[11] bg-bg/90 duration-700 lg:hidden ${
                    expanded || expandedBadgeDrop ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
                onClick={handleClickOnOverlay}
            />
        </>
    )
}

export default Header
