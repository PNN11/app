import { FC, useState } from 'react'

import { ModalOverlay } from '../overlay'

import BinanceDepositOptions from './deposit/binanceOptions'

import BinanceButton from 'components/common/ui/buttons/binanceButton'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import BinanceIcon from 'components/svg/binance'
import useGetUsdToAmtSwapRate from 'hooks/swap/useGetUsdToAmtSwapRate'
import useUserStore from 'store/useUserStore'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'

interface BinanceDepositModalProps {
    isOpen: boolean
    closeModal: () => void
}

const gameAssetId = '65578afab87e105b0bcc4547'

const BinanceDepositModal: FC<BinanceDepositModalProps> = ({ closeModal, isOpen }) => {
    const [depositValue, setDepositValue] = useState('2000')

    const accessToken = useUserStore(s => s.accessToken)

    const rate = useGetUsdToAmtSwapRate()

    const url = `/api/${
        depositValue === 'NaN' ? 'buy-game-asset-binance' : 'binance'
    }?amount=${depositValue}&accessToken=${accessToken?.token}&gameAssetId=${gameAssetId}`

    return (
        <ModalOverlay isOpen={isOpen} onClose={closeModal}>
            <ModalFormWrapper
                title="Start to play"
                onClose={closeModal}
                classes={{ container: 'self-start mt-28 max-w-162' }}
            >
                <div>
                    <BinanceDepositOptions value={depositValue} setValue={setDepositValue} />

                    <a rel="noreferrer" target="_blank" className="mt-5 block text-2xl" href={url}>
                        <BinanceButton
                            // isDisabled={depositMutation.isLoading}
                            type="button"
                            className=""
                            onClick={() => {
                                if (depositValue === 'NaN') return
                                sendAnalyticsEvent({
                                    event: 'deposit',
                                    options: { deposit_value: +depositValue * rate },
                                })
                            }}
                        >
                            <>
                                <BinanceIcon />
                                <span className="ml-3 font-medium">Pay with Binance Pay</span>
                            </>
                        </BinanceButton>
                    </a>
                </div>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

export default BinanceDepositModal
