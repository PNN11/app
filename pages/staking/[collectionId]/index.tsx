import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useInfiniteQuery, useQuery } from 'react-query'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'
import CollectionStats from 'components/staking/collectionStats'
import MyNftList from 'components/staking/nftList'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import {
    getMultiplierFromNFT,
    getReferralMultiplierFromNFT,
    getSpinsAmountFromNFT,
} from 'utils/wheel/bonuses'

interface Props {
    collectionId: string
}

const limit = 10

const stakedOffset = 0

const CollectionStackingPage: NextPage<Props> = ({ collectionId }) => {
    const marketplaceService = useServiceStore(store => store.marketplaceService)
    const userId = useUserStore(store => store.userId)

    const { data: collection } = useQuery(
        [QueryKeys.GET_COLLECTION, collectionId],
        () => marketplaceService.getCollection({ collectionId }),
        { enabled: !!collectionId, refetchOnWindowFocus: false }
    )

    const {
        data: tokens,
        refetch: refetchStaked,
        isLoading: stakedIsLoading,
    } = useQuery(
        [QueryKeys.GET_STAKED_TOKENS, collectionId],
        () =>
            marketplaceService.getStakedTokens({
                collectionId,
                userId,
                limit: limit.toString(),
                offset: stakedOffset.toString(),
            }),
        { enabled: !!collectionId && !!userId, refetchOnWindowFocus: false }
    )

    const refreshStakedTokens = (): void => {
        setTimeout(() => refetchStaked(), 500)
    }

    useSubscribeToNFTEvent('lock', refreshStakedTokens)
    useSubscribeToNFTEvent('unlock', refreshStakedTokens)

    const getNftsQuery = useInfiniteQuery<IMarketplaceToken.TBodyResponses>(
        [QueryKeys.GET_NFTS, limit, userId],
        { refetchOnWindowFocus: true, enabled: !!collectionId && !!userId }
    )

    const stakedToken = tokens?.docs?.[0]

    const freeSpins = getSpinsAmountFromNFT(stakedToken, true)

    const multiplier = getMultiplierFromNFT(stakedToken, true)

    const referralMultiplier = getReferralMultiplierFromNFT(stakedToken, true)

    const isPrivilegesRemoved = (stakedToken?.payload as IMarketplaceToken.TPayloadMint<'MINT'>)
        ?.isPrivilegesRemoved

    return (
        <div className="mb-50">
            <div className="bg-subheader p-4 text-center">
                <h5 className="font-medium">Staking Page is in Beta</h5>
                <p className="text-sm text-base-200">
                    This page is under development, so for now you can stake 1 NFT only.
                </p>
            </div>
            <Image
                src="/images/collection-banner.png"
                width={1440}
                height={140}
                alt="Collection banner"
                className="min-h-35 w-full object-cover"
                quality={100}
            />
            <Container>
                <div className="mb-10">
                    <div className="mb-6 flex gap-6">
                        <div className="max-w-3 flex h-31 min-h-[7.75rem] w-31 min-w-[7.75rem] items-center justify-center rounded-full border border-base-300">
                            <Image
                                src="/logo.png"
                                alt={collection?.payload?.name}
                                width={93}
                                height={52}
                            />
                        </div>
                        <div className="w-full">
                            <div className="mb-3 text-custom-2.5xl font-medium">
                                {collection?.payload?.name}
                            </div>

                            <div className="hidden flex-wrap items-center justify-between gap-6 md:flex">
                                <CollectionStats
                                    classes={{
                                        wrapper: 'flex-1 basis-[calc(100%-7.125rem)]',
                                        stat: {
                                            wrapper:
                                                'flex flex-col-reverse 2xs:bg-transparent w-max 2xs:p-0',
                                            title: 'leading-6 text-start',
                                            value: '!justify-start',
                                        },
                                    }}
                                    isLoading={getNftsQuery?.isLoading || stakedIsLoading}
                                    myNftCount={getNftsQuery?.data?.pages?.[0].totalDocs ?? 0}
                                    stakedNftCount={tokens?.totalDocs ?? 0}
                                    raffleMultiplier={multiplier}
                                    raffleSpins={freeSpins}
                                    referralMultiplier={referralMultiplier}
                                />
                                <Link href="/marketplace" className="flex shrink grow basis-20">
                                    <SmallButton className="w-full min-w-max">Buy NFTs</SmallButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 block md:hidden">
                        <CollectionStats
                            classes={{
                                wrapper: 'grid grid-cols-2 sm:grid-cols-5 mb-6',
                                stat: {
                                    wrapper:
                                        'flex flex-col-reverse !bg-transparent w-max !p-0 basis-max flex-1',
                                    title: 'leading-6 text-start w-max',
                                    value: '!justify-start',
                                },
                            }}
                            isLoading={getNftsQuery?.isLoading || stakedIsLoading}
                            myNftCount={getNftsQuery?.data?.pages?.[0].totalDocs ?? 0}
                            stakedNftCount={tokens?.totalDocs ?? 0}
                            raffleMultiplier={multiplier}
                            raffleSpins={freeSpins}
                            referralMultiplier={referralMultiplier}
                        />
                        <Link href="/marketplace" className="w-full">
                            <SmallButton className="w-full">Buy NFTs</SmallButton>
                        </Link>
                    </div>
                    {isPrivilegesRemoved && (
                        <div className="rounded-xl bg-dark-blue p-3 font-medium">
                            {stakedToken?.payload?.name} staking period is over. You are not
                            receiving any utilities at this moment. To stake it again please unstake
                            first.
                        </div>
                    )}
                </div>
                <MyNftList collectionId={collectionId} />
            </Container>
        </div>
    )
}

export default CollectionStackingPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { collectionId } = query

    return { props: { collectionId } }
}
