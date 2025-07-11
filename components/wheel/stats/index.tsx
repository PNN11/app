import { FC } from 'react'

import { useQuery } from 'react-query'

import CurrencyStat from './currency'
import ERC721Stat from './erc721'
import { WheelRewardStatsProps } from './types'

import { WheelCore } from 'common-types/wheel'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import { QueryKeys } from 'utils/constants/reactQuery'

const rewardsMap = new Map<WheelCore.RewardType, FC<{ drop: WheelCore.Drop; isLoading?: boolean }>>(
    [
        ['CRYPTO_CURRENCY', CurrencyStat],
        ['VIRTUAL_CURRENCY', CurrencyStat],
        ['ERC721', ERC721Stat],
    ]
)

const WheelRewardStats: FC<WheelRewardStatsProps> = ({ alias }) => {
    const api = useServiceStore(s => s.wheelService)
    const isAuth = useAuthStore(store => store.isAuth)

    const { data, isFetching } = useQuery(
        [QueryKeys.WHEEL_REWARDS, alias],
        () => api.getMyRewards({ alias }),
        { keepPreviousData: true, enabled: isAuth }
    )

    return (
        <div>
            <h5 className="text-center text-custom-2.5xl">My rewards</h5>
            {data && (
                <div className=" mt-10 flex flex-wrap justify-center gap-6">
                    {data?.map(drop => {
                        const Component = rewardsMap.get(drop.reward.type)

                        if (!Component) {
                            console.error('There is no component for this type')

                            return null
                        }

                        return (
                            <Component
                                key={drop.reward.meta.image}
                                drop={drop}
                                isLoading={isFetching}
                            />
                        )
                    })}
                </div>
            )}
            <div className="mt-4 text-center text-base-300">
                Mainnet rewards will be distributed after the campaign is over
            </div>
        </div>
    )
}

export default WheelRewardStats
