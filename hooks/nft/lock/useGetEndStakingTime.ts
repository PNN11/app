import { useQuery } from 'react-query'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

type TUseGetEndStakingTime = (nft: IMarketplaceToken.TBodyResponse) => {
    timestamp: number
    isLoading: boolean
}

const minuteInMilliseconds = 60000

const useGetEndStakingTime: TUseGetEndStakingTime = nft => {
    const marketplaceService = useServiceStore(s => s.marketplaceService)
    const isStaked = nft.payload.type === 'MINT' && nft.payload.isStaked

    const { isPrivilegesRemoved } = nft.payload as IMarketplaceToken.TPayloadMint<'MINT'>
    const { data, isLoading } = useQuery(
        [QueryKeys.GET_STAKING_END_TIME, nft._id],
        () => marketplaceService.getStakingEndTime({ tokenId: nft._id }),
        {
            enabled: isStaked && !isPrivilegesRemoved,
            refetchInterval: minuteInMilliseconds,
        }
    )

    const timestamp = data && new Date(data.lockTimeEndAt).valueOf() - Date.now()

    return { timestamp, isLoading }
}

export default useGetEndStakingTime
