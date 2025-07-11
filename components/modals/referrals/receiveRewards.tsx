import { FC } from 'react'

import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import ReferralRewardsExchangeItem from './exchangeItem'

import { IReferral } from 'common-types/referral'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import ReferralModalWrapper from 'components/profile/referralInfo/referralModalWrapper'
import ReferralSwapArrow from 'components/svg/referrals/swapArrow'
import ReferralsIcon from 'components/svg/referralsIcon'
import RewardIcon from 'components/svg/rewardIcon'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { HttpError } from 'utils/httpError'

type Props = ConfirmableProps & {
    reward: IReferral.Reward
}

const ReceiveReferralRewardsModal: FC<Props> = ({ show, cancel, proceed, reward }) => {
    const referralService = useServiceStore(state => state.referralService)
    const userId = useUserStore(s => s.userId)
    const queryClient = useQueryClient()

    const confirmClaim = useMutation(referralService.claimReward, {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.REFERRAL_REWARD, userId] })
            proceed()
            toast.success('You successfully claimed your reward')
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
        confirmClaim.mutateAsync({})
    }

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <ReferralModalWrapper
                title="Confirm your transaction"
                classes={{ wrapper: 'max-w-[29.375rem] bg-base-800' }}
                onClose={onClose}
            >
                <div>
                    <div className="mb-6 flex items-center justify-between">
                        <ReferralRewardsExchangeItem
                            classes={{ icon: { wrapper: 'bg-error/20', item: 'text-error' } }}
                            Icon={ReferralsIcon}
                            title="Spend"
                        >
                            <p className="text-custom-lg">{reward?.countReferrals} Referrals</p>
                        </ReferralRewardsExchangeItem>
                        <div className="flex h-10 w-10 items-center justify-center rounded-2.5 border-2 border-base-700">
                            <ReferralSwapArrow />
                        </div>
                        <ReferralRewardsExchangeItem
                            classes={{ icon: { wrapper: 'bg-success/20', item: 'text-success' } }}
                            Icon={RewardIcon}
                            title="Receive"
                        >
                            <div className="flex items-center gap-1">
                                <p className="text-custom-lg">{reward?.countReward}</p>
                                <Image src="/images/amt-icon.svg" width={20} height={20} alt="" />
                            </div>
                        </ReferralRewardsExchangeItem>
                    </div>
                    <div className="mb-7 h-px bg-referral-modal-divider opacity-20" />
                    <div className="mb-3 flex items-center justify-center gap-1">
                        <span className="text-base-300">Exchange</span>
                        <span className="font-medium">{reward?.countReferrals} Referrals</span>
                        <span className="text-base-300">to claim</span>
                        <span className="font-medium">{reward?.countReward}</span>
                        <Image src="/images/amt-icon.svg" width={20} height={20} alt="" />
                    </div>
                    <MarketplaceButton isLoading={confirmClaim.isLoading} onClick={handleClick}>
                        Confirm
                    </MarketplaceButton>
                </div>
            </ReferralModalWrapper>
        </ModalOverlay>
    )
}
const openReceiveReferralRewardsModal = promisifyModal(ReceiveReferralRewardsModal)

export default openReceiveReferralRewardsModal
