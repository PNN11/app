import { FC } from 'react'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import Badge from 'components/profile/referralInfo/badge'

const titles = new Map<IMarketplaceUserActivities.TStatuses, string>([
    ['EXPIRE', 'Expired'],
    ['OUTBIDDED', 'Outbid'],
    ['CANCEL_BID', 'Canceled'],
    ['WON', 'Won'],
    ['AUCTION_CANCELLED', 'Auction canceled'],
])

interface BidBadgeProps {
    activity: IMarketplaceUserActivities.TBodyResponse
}

const BidBadge: FC<BidBadgeProps> = ({ activity }) => {
    if (activity.event !== 'BID' || !activity.status) return null
    const title = titles.get(activity.status)

    if (!title) {
        console.warn(`There is no badge for ${activity.status} status`)

        return
    }

    return (
        <Badge
            title={title}
            className={`py-1 px-3  text-custom-xs ${
                activity.status === 'WON' ? 'bg-success' : 'bg-cta-600'
            }`}
        />
    )
}

export default BidBadge
