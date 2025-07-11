import { FC } from 'react'

import Skeleton from 'components/common/skeleton'

const GameCardSkeletonLoading: FC = () => {
    return (
        <div className="pb-4">
            <Skeleton isLoading classes={{ skeleton: 'aspect-[4/3] rounded-xl' }}>
                <div />
            </Skeleton>

            <Skeleton count={3} classes={{ skeleton: 'rounded-xl', wrapper: 'mt-4' }} isLoading>
                <div />
            </Skeleton>
        </div>
    )
}

export default GameCardSkeletonLoading
