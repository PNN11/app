import { FC } from 'react'

import NftInfoWrapper from 'components/common/nftCard/infoWrapper'
import Skeleton from 'components/common/skeleton'

const NftCardSkeletonLoader: FC = () => {
    return (
        <div className="flex min-w-[10rem] flex-col">
            <Skeleton classes={{ skeleton: 'aspect-square w-full rounded-t-xl' }} isLoading>
                <div />
            </Skeleton>
            <NftInfoWrapper>
                <Skeleton count={2} classes={{ skeleton: 'rounded-xl', wrapper: 'mt-1' }} isLoading>
                    <div />
                </Skeleton>
            </NftInfoWrapper>
        </div>
    )
}

export default NftCardSkeletonLoader
