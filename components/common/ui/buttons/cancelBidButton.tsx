import { FC, useState } from 'react'

import ActivityButton from './activityButton'

import {
    IMarketplaceUserActivities,
    UserActivityTypeEvent,
} from 'common-types/marketplace/marketplace-user-activities'
import useCheckIsYouWalletOwner from 'hooks/useCheckIsYouWalletOwner'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'

interface CancelBidButtonProps {
    onClick: () => void
    activity: IMarketplaceUserActivities.TBodyResponse
}

const CancelBidButton: FC<CancelBidButtonProps> = ({ onClick, activity }) => {
    const [isCancelBid, setIsCancelBid] = useState(activity.isCancelBid)
    const checkWallet = useCheckIsYouWalletOwner()

    useSubscribeToNFTEvent(`cancelBid-${activity.lastListingId}`, () => {
        setIsCancelBid(false)
    })

    return activity.event === UserActivityTypeEvent.BID &&
        checkWallet(activity.from) &&
        activity.isCancelBid &&
        isCancelBid ? (
        <ActivityButton onClick={onClick}>Cancel</ActivityButton>
    ) : null
}

export default CancelBidButton
