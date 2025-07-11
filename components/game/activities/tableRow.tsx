import { FC, useCallback } from 'react'

import moment from 'moment'
import Image from 'next/image'

import WalletAddress from './walletAddress'

import {
    IMarketplaceUserActivities,
    UserActivityTypeEvent,
} from 'common-types/marketplace/marketplace-user-activities'
import { CurrencySymbol } from 'components/common/nftCard/currency/symbol'
import CancelBidButton from 'components/common/ui/buttons/cancelBidButton'
import { ConditionalLink } from 'components/common/ui/conditionalLink'
import EventBadge from 'components/common/ui/eventBadge'
import { openRequiredCancelBidModal } from 'utils/openRequiredModal/cancelBid'

interface TableRowProps {
    activity: IMarketplaceUserActivities.TBodyResponse
}

const TableRow: FC<TableRowProps> = ({ activity }) => {
    const handleOpenCancelBidModal = useCallback(() => {
        openRequiredCancelBidModal({
            nft: activity.token,
            lastListingId: activity.lastListingId,
            amount: activity.priceAmount,
        })
    }, [activity])

    return (
        <div className="grid w-full grid-cols-minmax-6 items-center gap-x-4 py-2 px-5 text-base">
            <div className="flex items-center gap-2">
                {activity.event}
                <EventBadge activity={activity} />
            </div>
            <ConditionalLink
                className="group flex items-center gap-2"
                href={`nft/${activity.token._id}`}
                condition={Boolean(activity?.token?._id)}
            >
                <Image src={activity.token.payload.logo} width={40} height={40} alt="nft logo" />
                <p className="group-hover:text-link">{activity.token.payload.name}</p>
            </ConditionalLink>
            <div className="flex items-center gap-2">
                {activity.event !== UserActivityTypeEvent.TRANSFER &&
                    activity.event !== UserActivityTypeEvent.CANCEL && (
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
            <div className="flex items-center gap-4">
                <p>{moment(activity.createdAt).fromNow()}</p>
                <CancelBidButton activity={activity} onClick={handleOpenCancelBidModal} />
            </div>
        </div>
    )
}

export default TableRow
