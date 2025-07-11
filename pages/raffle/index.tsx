import { useEffect } from 'react'

import Aos from 'aos'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { WheelCore } from 'common-types/wheel'
import Skeleton from 'components/common/skeleton'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import WheelRewardStats from 'components/wheel/stats'
import WheelDescription from 'components/wheel/wheelDescription'
import { WheelService } from 'services/api/wheel'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { IServerError } from 'utils/types/common'
import { getSpinsAmountFromNFT } from 'utils/wheel/bonuses'

import 'aos/dist/aos.css'

const wheelAlias = process.env.NEXT_PUBLIC_RAFFLE_WHEEL_ALIAS

const Wheel = dynamic(() => import('../../components/wheel').then(mod => mod.default), {
    ssr: false,
    loading: ({ isLoading }) => {
        return isLoading ? (
            <div className="mt-24 flex justify-center sm:mt-32">
                <Image
                    src="/img/loader.png"
                    alt="loading"
                    height={144}
                    width={144}
                    quality={100}
                    className="loading w-15 sm:w-36"
                />
            </div>
        ) : null
    },
})

const RafflePage: NextPage = () => {
    const api = useServiceStore(store => store.wheelService)
    const marketplaceService = useServiceStore(store => store.marketplaceService)
    const userId = useUserStore(s => s.userId)

    const { data: tokens, isFetching: stakedTokensIsFetching } = useQuery(
        [QueryKeys.GET_STAKED_TOKENS, userId],
        () =>
            marketplaceService.getTokens({
                isStaked: true,
                userId,
                limit: (10).toString(),
                offset: (0).toString(),
            }),
        {
            enabled: !!userId,
            refetchOnWindowFocus: false,
        }
    )
    const stakedToken = tokens?.docs?.[0]

    const freeSpins = getSpinsAmountFromNFT(stakedToken)

    const { data: wheel, refetch: refetchWheel } = useQuery(
        QueryKeys.RAFFLE_WHEEL_REWARDS,
        () => api.getWheel({ alias: wheelAlias }),
        { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false }
    )

    const { refetch: refetchRewards } = useQuery([QueryKeys.WHEEL_REWARDS, wheelAlias], {
        enabled: false,
    })

    const update = (): void => {
        refetchRewards()
        refetchWheel()
    }

    useEffect(() => {
        Aos.init({ duration: 700, once: true })
    }, [])

    const hasPrivileges =
        stakedToken &&
        !(stakedToken.payload as IMarketplaceToken.TPayloadMint<'MINT'>).isPrivilegesRemoved

    const freeSpinText = hasPrivileges
        ? `You can spin the wheel for free once in 24 hours`
        : `You can spin the wheel for free once in 24 hours if you staked nft`

    const stakedText = hasPrivileges
        ? `1 NFT staked = ${freeSpins} spins in the Raffle`
        : 'Staked NFT = additional spins in the Raffle'

    return (
        <PageWrapper>
            <div className="bg-subheader p-4 text-center">
                <h5 className="font-medium">Raffle Page is in Beta</h5>
                <p className="text-sm text-base-200">
                    Users that spined it and wait for rewards will get their rewards once its LIVE.
                </p>
            </div>
            <Container className="overflow-hidden">
                <div className="mb-14 space-y-1 pt-15 text-center">
                    <h5 className="text-sm leading-6 text-base-300">
                        Arena Games Raffle powered by Europebet
                    </h5>
                    <h2 className="text-custom-2.5xl font-medium">Spin the wheel</h2>
                    <div
                        className={`flex w-full flex-col items-center ${
                            stakedTokensIsFetching ? 'gap-1' : ''
                        }`}
                    >
                        <Skeleton
                            isLoading={stakedTokensIsFetching}
                            classes={{ skeleton: 'w-40 block rounded' }}
                        >
                            <div className="text-custom-lg font-medium">{freeSpinText}</div>
                        </Skeleton>
                        <Skeleton
                            isLoading={stakedTokensIsFetching}
                            classes={{ skeleton: 'w-30 block rounded' }}
                        >
                            <h5 className="text-sm leading-6 text-base-300">{stakedText}</h5>
                        </Skeleton>
                    </div>
                </div>
                <Wheel
                    rewards={wheel.rewards}
                    onStop={() => update()}
                    description={
                        <WheelDescription
                            maxSpins={wheel.totalMaxSpins}
                            availableSpins={wheel.availableSpins}
                            hasPrivileges={hasPrivileges}
                        />
                    }
                    hasPrivileges={hasPrivileges}
                />
                <div className="pt-20">
                    <WheelRewardStats alias={wheelAlias} />
                </div>
            </Container>
        </PageWrapper>
    )
}

export default RafflePage

export const getServerSideProps: GetServerSideProps = async () => {
    const api = new WheelService()
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(QueryKeys.RAFFLE_WHEEL_REWARDS, () =>
        api.getWheel({ alias: wheelAlias })
    )

    const content = queryClient.getQueryData<WheelCore.Wheel>(QueryKeys.RAFFLE_WHEEL_REWARDS)

    if (!content || (content as unknown as IServerError).message)
        return { redirect: { destination: '/500', permanent: false } }

    return { props: { dehydratedState: dehydrate(queryClient) } }
}
