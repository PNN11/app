import { FC, useCallback, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import ReactDOM from 'react-dom'

import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'
import openDepositAmtModal from '../swapModals/depositModal'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BinancePayWithTitleIcon from 'components/svg/binancePay'
import CloseSvg from 'components/svg/closeSvg'

const PromotionModal: FC<ConfirmableProps> = ({ proceed, show }) => {
    const router = useRouter()
    const onClose = useCallback(() => {
        proceed()
    }, [])

    useEffect(() => {
        router.events.on('routeChangeStart', onClose)

        return () => {
            router.events.off('routeChangeStart', onClose)
        }
    }, [router, onClose])

    if (!show) return null

    return ReactDOM.createPortal(
        <div
            className="fixed right-3 bottom-7 left-3 z-10 max-w-sm rounded-[2.5rem] bg-[#131D2E] p-6 xs:left-auto sm:right-12 xl:right-16"
            data-aos="fade-left"
        >
            <Image
                src="/images/binance-modal-coins.png"
                width={122}
                height={132}
                alt="Arcane Merge Tokens"
                className="absolute right-10 -top-9 z-[1]"
                quality={100}
                priority
            />
            <Image
                src="/images/binance-modal-gradient.png"
                width={377}
                height={198}
                alt="gradient"
                className="absolute left-0 top-0 w-full rounded-[2.5rem]"
                quality={100}
                priority
            />
            <div className="relative z-[2]">
                <div className="mb-8 flex items-baseline justify-between">
                    <BinancePayWithTitleIcon />
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="flex items-center justify-center transition-opacity hover:opacity-80"
                    >
                        <CloseSvg />
                    </button>
                </div>
                <h3 className="mt-6 mb-1 text-xl font-semibold leading-6 xs:mt-8">
                    Deposit AMT and save 15%
                </h3>
                <p className="mb-4 text-base text-base-100 md:mb-6">
                    Exclusive with Binance Pay. Hurry, ends Dec 15!
                </p>
                <div className="flex items-center">
                    <SmallButton
                        onClick={openDepositAmtModal}
                        className="w-full bg-[#F3C31B] font-semibold text-bg hover:bg-[#F3C31B] hover:bg-opacity-70"
                    >
                        Deposit NOW!
                    </SmallButton>
                </div>
            </div>
        </div>,
        document.getElementById('modals')
    )
}

const openPromotionModal = promisifyModal(PromotionModal)

export default openPromotionModal
