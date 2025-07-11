import { FC } from 'react'

import moment from 'moment'
import Link from 'next/link'
import { useQuery, useQueryClient } from 'react-query'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import Skeleton from 'components/common/skeleton'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import ImageWithSkeletonLoading from 'components/common/ui/loaders/image'
import openStakeNftModal from 'components/modals/nft/staking'
import useGetEndStakingTime from 'hooks/nft/lock/useGetEndStakingTime'
import { QueryKeys } from 'utils/constants/reactQuery'
import {
    getMultiplierFromNFT,
    getReferralMultiplierFromNFT,
    getSpinsAmountFromNFT,
} from 'utils/wheel/bonuses'

interface Props {
    nft: IMarketplaceToken.TBodyResponse
    collectionId: string
}

const numberFormatter = new Intl.NumberFormat('en', { minimumIntegerDigits: 2 })

const getEndStakeDuration = (durationToUnstake: moment.Duration): string => {
    const days = durationToUnstake.days()

    const hours = numberFormatter.format(durationToUnstake.hours())

    const minutes = numberFormatter.format(
        durationToUnstake.minutes() || (!!durationToUnstake.seconds() && 1)
    )

    return `${days}:${hours}:${minutes}`
}

const NftForStakingTableRow: FC<Props> = ({ nft, collectionId }) => {
    const queryClient = useQueryClient()

    const queryKey = [QueryKeys.GET_STAKED_TOKENS, collectionId]

    const isStaked = nft.payload.type === 'MINT' && nft.payload.isStaked

    const { timestamp, isLoading } = useGetEndStakingTime(nft)

    const durationToUnstake = timestamp && moment.duration(timestamp)

    const handleClick = async (): Promise<void> => {
        openStakeNftModal({ nft }).then(async ({ nft, type }) => {
            await queryClient.cancelQueries({ queryKey })

            if (type === 'unstake') {
                queryClient.setQueryData(queryKey, { docs: [] })
            }

            if (type === 'stake') {
                const payload = nft.payload as IMarketplaceToken.TPayloadMint<'MINT'>

                payload.isPrivilegesRemoved = false
                payload.isStaked = true

                queryClient.setQueryData(queryKey, { docs: [nft] })
            }

            queryClient.fetchQuery(queryKey)
        })
    }

    const freeSpins = getSpinsAmountFromNFT(nft)

    const multiplier = getMultiplierFromNFT(nft)

    const referralMultiplier = getReferralMultiplierFromNFT(nft)

    const stakedTokensQuery = useQuery<IMarketplaceToken.TBodyResponses>(queryKey, {
        refetchOnWindowFocus: false,
    })

    const isAnotherStaked = stakedTokensQuery?.data?.totalDocs > 0

    return (
        <div className="grid grid-cols-staking-row grid-rows-1 items-center justify-between px-5 py-3 xl:grid-cols-staking-row-xl">
            <Link href={`/nft/${nft._id}`} className="flex items-center gap-3">
                <ImageWithSkeletonLoading
                    src={nft.payload.logo}
                    width={88}
                    height={88}
                    alt={nft.payload.name}
                    classes={{ skeleton: 'rounded !rounded-t' }}
                    className="rounded"
                />
                <p className="text-xl font-semibold">{nft.payload.name}</p>
            </Link>
            <div className="text-end">{referralMultiplier}</div>
            <div className="text-end">{multiplier}</div>
            <div className="text-end">{freeSpins}</div>
            <Skeleton classes={{ skeleton: 'w-1/2 ml-auto' }} isLoading={isLoading}>
                <div className="text-end">
                    {isStaked && durationToUnstake && timestamp > 0
                        ? getEndStakeDuration(durationToUnstake)
                        : '-'}
                </div>
            </Skeleton>
            <div className="flex justify-end">
                <SmallButton
                    disabled={
                        (!isStaked && isAnotherStaked) || (isStaked && timestamp > 0) || isLoading
                    }
                    variant={isStaked ? 'outlined' : 'contained'}
                    onClick={handleClick}
                >
                    {isStaked ? 'Unstake' : 'Stake'}
                </SmallButton>
            </div>
        </div>
    )
}

export default NftForStakingTableRow
