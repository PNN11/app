import { FC, useCallback } from 'react'

import moment from 'moment'
import Image from 'next/image'

import {
    IMarketplaceUserActivities,
    UserActivityTypeEvent,
} from 'common-types/marketplace/marketplace-user-activities'
import { CurrencySymbol } from 'components/common/nftCard/currency/symbol'
import CancelBidButton from 'components/common/ui/buttons/cancelBidButton'
import EventBadge from 'components/common/ui/eventBadge'
import WalletAddress from 'components/game/activities/walletAddress'
import { openRequiredCancelBidModal } from 'utils/openRequiredModal/cancelBid'

interface TableRowProps {
    activity: IMarketplaceUserActivities.TBodyResponse
}

const dontShowPriceAtEvent = [
    UserActivityTypeEvent.TRANSFER,
    UserActivityTypeEvent.CANCEL,
    UserActivityTypeEvent.CLAIM,
]

const TableRow: FC<TableRowProps> = ({ activity }) => {
    const handleOpenCancelBidModal = useCallback(() => {
        openRequiredCancelBidModal({
            nft: activity.token,
            lastListingId: activity.lastListingId,
            amount: activity.priceAmount,
        })
    }, [activity])

    return (
        <div className="grid-cols-minmax grid w-full min-w-max gap-x-4 py-2 px-5 text-base ">
            <div className="flex items-center gap-2">
                {activity.event}
                <EventBadge activity={activity} />
            </div>
            <div className="flex items-center gap-2">
                {!dontShowPriceAtEvent.includes(activity.event as UserActivityTypeEvent) && (
                    <>
                        <Image
                            src={activity.token.currency.icon}
                            width={20}
                            height={20}
                            alt="coin"
                        />
                        <p>{activity.priceAmount}</p>
                        <p>
                            <CurrencySymbol asset={activity.token?.currency} />
                        </p>
                    </>
                )}
            </div>
            <WalletAddress address={activity.from} />
            <WalletAddress address={activity.to} />
            <div className="flex items-center justify-between gap-4">
                <p>{moment(activity.createdAt).fromNow()}</p>
                <CancelBidButton activity={activity} onClick={handleOpenCancelBidModal} />
            </div>
        </div>
    )
}

export default TableRow
