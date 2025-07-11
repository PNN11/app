import { FC } from 'react'

import Image from 'next/image'

import BaseRewardsInfoItem from './baseInfo'
import { amountFormatter } from './reward'

import { IReferral } from 'common-types/referral'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import openReceiveReferralRewardsModal from 'components/modals/referrals/receiveRewards'
import RewardIcon from 'components/svg/rewardIcon'

interface Props {
    reward: IReferral.Reward
}

const RewardsInfoItem: FC<Props> = ({ reward }) => {
    const handleClick = (): void => {
        openReceiveReferralRewardsModal({ reward })
    }

    return (
        <BaseRewardsInfoItem Icon={RewardIcon} title="Reward" className="pl-4">
            <div className="flex items-center gap-1">
                <span className="text-custom-lg font-medium">
                    {amountFormatter(reward?.countReward ?? 0)}
                </span>
                <Image src="/images/amt-icon.svg" width={16} height={16} alt="" />
                <SmallButton disabled={!reward} onClick={handleClick} className="ml-1 pt-0 pb-0">
                    Claim
                </SmallButton>
            </div>
        </BaseRewardsInfoItem>
    )
}

export default RewardsInfoItem
