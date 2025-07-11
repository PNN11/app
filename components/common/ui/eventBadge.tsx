import { FC } from 'react'

import BidBadge from './bidBadge'
import ListingBadge from './listingBadge'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'

interface EventBadgeProps {
    activity: IMarketplaceUserActivities.TBodyResponse
}

const eventsMap = new Map<
    IMarketplaceUserActivities.TEvents,
    FC<{ activity: IMarketplaceUserActivities.TBodyResponse }>
>([
    ['LIST', ListingBadge],
    ['BID', BidBadge],
])

const EventBadge: FC<EventBadgeProps> = ({ activity }) => {
    const Component = eventsMap.get(activity.event)

    if (!Component) {
        return
    }

    return <Component activity={activity} />
}

export default EventBadge
