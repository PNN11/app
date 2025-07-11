import { FC, useState } from 'react'

import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import CurrencyItem from './currencyItem'

import WarningBadge from 'components/common/ui/badges/warningBadge'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { CheckboxWithLabel } from 'components/common/ui/checkbox/checkboxWithLabel'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import ReferralModalWrapper from 'components/profile/referralInfo/referralModalWrapper'
import ReferralSwapArrow from 'components/svg/referrals/swapArrow'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { HttpError } from 'utils/httpError'

type Props = ConfirmableProps & {
    amount: number
}

const WithdrawMaticModal: FC<Props> = ({ show, cancel, proceed, amount }) => {
    const swapService = useServiceStore(state => state.swapService)
    const [isAgreement, setIsAgreement] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const confirmClaim = useMutation(swapService.requestMaticWithdrawal, {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: QueryKeys.IS_PENDING_REQUEST })
            proceed()
            toast.success('You requested your MATIC withdrawal')
        },
        onError(error) {
            if (error instanceof HttpError) {
                toast(error.message)
                cancel()
            }
        },
    })

    const onClose = (): void => cancel()

    const handleClick = (): void => {
        confirmClaim.mutateAsync({ amount })
    }

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <ReferralModalWrapper
                title="Request withdrawal"
                classes={{ wrapper: 'max-w-[29.375rem] bg-base-800' }}
                onClose={onClose}
            >
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <CurrencyItem amount={amount} icon="/images/matic-coin.svg" />
                        <div className="flex h-10 w-10 items-center justify-center rounded-2.5 border-2 border-base-700">
                            <ReferralSwapArrow />
                        </div>
                        <CurrencyItem amount={amount} icon="/images/matic-icon.svg" />
                    </div>
                    <div className="mb-7 h-px bg-referral-modal-divider opacity-20" />
                    <div className="mb-3 flex items-center justify-center gap-1">
                        <span className="text-base-300">Exchange</span>
                        <span className="font-medium">{amount}</span>
                        <Image src="/images/matic-coin.svg" width={16} height={16} alt="" />
                        <span className="text-base-300">to claim</span>
                        <span className="font-medium">{amount}</span>
                        <Image src="/images/matic-icon.svg" width={16} height={16} alt="" />
                    </div>
                    <WarningBadge className="mb-3">
                        <CheckboxWithLabel
                            id="withdrawal-agreement"
                            value={!isAgreement}
                            onClick={setIsAgreement}
                            checked={isAgreement}
                            className="2xs:items-start 2xs:py-0"
                        >
                            <p>
                                I understand that the creation of fraudulent referrals is prohibited
                                and may result in the suspension of my account
                            </p>
                        </CheckboxWithLabel>
                    </WarningBadge>
                    <MarketplaceButton
                        isLoading={confirmClaim.isLoading}
                        onClick={handleClick}
                        disabled={!isAgreement}
                    >
                        Request
                    </MarketplaceButton>
                </div>
            </ReferralModalWrapper>
        </ModalOverlay>
    )
}
const openWithdrawMaticModal = promisifyModal(WithdrawMaticModal)

export default openWithdrawMaticModal
