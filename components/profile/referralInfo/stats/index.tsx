import { FC } from 'react'

import { useQuery } from 'react-query'

import StepCardWrapper from '../cards/wrapper'

import ReferralsInfoItem from './referralsInfo'
import Reward from './reward'
import RewardsInfoItem from './rewardsInfo'

import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'

const ReferralStatistics: FC = () => {
    const referralService = useServiceStore(state => state.referralService)

    const userId = useUserStore(s => s.userId)
    const { data: rewards } = useQuery([QueryKeys.REFERRAL_REWARD, userId], ({ signal }) =>
        referralService.getRewards({ signal })
    )

    const currentReward = rewards?.list?.find(
        (item, index, array) =>
            item.countReferrals <= rewards?.countReferrals &&
            (array[index + 1]?.countReferrals > rewards?.countReferrals || !array[index + 1])
    )

    return (
        <StepCardWrapper className="flex flex-col gap-6 lg:col-span-full lg:flex-row 2xl:col-span-1 2xl:flex-col">
            <div className="flex w-full items-start gap-4 divide-x divide-base-700">
                <ReferralsInfoItem count={rewards?.countReferrals} />
                <RewardsInfoItem reward={currentReward} />
            </div>
            <div className="relative flex w-full items-center justify-between gap-2.25">
                {rewards?.list?.map(reward => (
                    <Reward
                        key={reward.id}
                        referralCount={reward.countReferrals}
                        amount={reward.countReward}
                        available={rewards.countReferrals >= reward.countReferrals}
                    />
                ))}
                <div className="absolute z-0 h-0.5 w-full bg-base-700" />
            </div>
        </StepCardWrapper>
    )
}

export default ReferralStatistics
