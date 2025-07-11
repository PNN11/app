import { FC } from 'react'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import Badge from 'components/profile/referralInfo/badge'

interface ExpiredListingBadgeProps {
    activity: IMarketplaceUserActivities.TBodyResponse
}

const titles = new Map<IMarketplaceUserActivities.TStatuses, string>([
    ['EXPIRE', 'Expired'],
    ['CANCEL', 'Canceled'],
])

const ListingBadge: FC<ExpiredListingBadgeProps> = ({ activity }) => {
    if (activity.event !== 'LIST' || !activity.status) return null
    const title = titles.get(activity.status)

    if (!title) {
        console.warn(`There is no badge for ${activity.status} status`)

        return
    }

    return <Badge title={title} className="bg-cta-600 px-3 py-1" />
}

export default ListingBadge
