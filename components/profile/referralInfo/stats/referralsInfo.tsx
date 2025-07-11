import { FC } from 'react'

import BaseRewardsInfoItem from './baseInfo'

import ReferralsIcon from 'components/svg/referralsIcon'

interface Props {
    count: number
}

const ReferralsInfoItem: FC<Props> = ({ count }) => {
    return (
        <BaseRewardsInfoItem Icon={ReferralsIcon} title="Referrals">
            <span className="text-custom-lg font-medium">{count}</span>
        </BaseRewardsInfoItem>
    )
}

export default ReferralsInfoItem
