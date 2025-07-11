import { useMemo, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import OwnedId from 'components/common/ui/owned'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import ItemActivity from 'components/marketplace/nft/Activity/itemActivity'
import Characteristics from 'components/marketplace/nft/characteristics'
import Details from 'components/marketplace/nft/details'
import GameLink from 'components/marketplace/nft/gameLink'
import NftSubHeader from 'components/marketplace/nft/nftSubHeader'
import PriceHistory from 'components/marketplace/nft/priceHistory'
import SellInfo from 'components/marketplace/nft/sellInfo'
import Skills from 'components/marketplace/nft/skills'
import Traits from 'components/marketplace/nft/traits'
import { useLocation } from 'hooks/useLocation'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import { MarketplaceService } from 'services/api/marketplace'
import { blockchains } from 'services/wallets/blockchainProvider'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'

interface NftPageProps {
    id: string
}

const NftPage: NextPage<NftPageProps> = ({ id }) => {
    const location = useLocation()
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const userId = useUserStore(state => state.userId)
    const [nftOwner, setNftOwner] = useState<string>()

    const { data, isLoading, isError, refetch } = useQuery(
        [QueryKeys.GET_NFT, id],
        () => marketplaceService.getToken({ id }),
        {
            onSuccess(data) {
                setNftOwner(data.payload.ownerId)
            },

            refetchOnMount: 'always',
        }
    )

    const url = useMemo(() => `${location?.origin}/nft/${data._id}`, [location, data])
    const blockchain = useMemo(
        () => data?.payload?.type === 'MINT' && blockchains[data.payload.chainId],
        [data]
    )

    useSubscribeToNFTEvent(`buy-${data._id}`, event => {
        setNftOwner(event.target.payload.ownerId)
    })

    useSubscribeToNFTEvent(`lowerprice-${data._id}`, () => {
        refetch()
    })

    useSubscribeToNFTEvent(`claim-${data._id}`, () => {
        refetch()
    })

    useSubscribeToNFTEvent(`already-claimed-${data._id}`, () => {
        refetch()
    })

    useSubscribeToNFTEvent(`unlock-${data._id}`, () => {
        refetch()
    })

    return (
        <>
            <Head>
                <title>{data.payload.name}</title>
                <meta property="og:title" content={data.payload.name} key="og:title" />
                <meta
                    property="og:description"
                    content={data.payload.description}
                    key="og:description"
                />
                <meta property="og:url" content={url} key="og:url" />
                <meta property="og:image" content={data.payload.logo} key="og:image" />

                <meta name="twitter:title" content={data.payload.name} key="twitter:title" />
                <meta
                    name="twitter:description"
                    content={data.payload.description}
                    key="twitter:description"
                />
                <meta name="twitter:site" content={url} key="twitter:site" />
                <meta name="twitter:image" content={data.payload.logo} key="twitter:image" />

                <meta name="description" content={data.payload.description} key="description" />
            </Head>
            <PageWrapper>
                <Container>
                    {!isLoading && !isError && data ? (
                        <div className="grid grid-cols-1 pt-5 pb-14 md:grid-cols-2 md:gap-4">
                            {nftOwner === userId && <NftSubHeader nft={data} />}
                            <div className="contents md:block">
                                <div className="mb-4">
                                    <Image
                                        src={data.payload.logo}
                                        width={688}
                                        height={688}
                                        alt="nft"
                                        className="rounded-2xl"
                                        priority
                                    />
                                </div>
                                <div className="order-1">
                                    <Characteristics description={data.payload.description} />
                                </div>
                                <div className="order-2">
                                    <Details
                                        tokenId={
                                            data.payload.type === 'MINT'
                                                ? data.payload?.tokenId?.toString()
                                                : undefined
                                        }
                                        blockchain={blockchain?.name}
                                        address={
                                            data.collection?.payload?.type === 'MINT' &&
                                            data.collection.payload.address
                                        }
                                    />
                                </div>
                            </div>
                            <div className="contents md:block">
                                <div className="mb-2 flex justify-between">
                                    <GameLink game={data.payload.game} />
                                    {/* {data?.rank ? <NftRank className="text-sm" nft={data} /> : null} */}
                                </div>
                                <div className="mb-2 flex items-center gap-3">
                                    <div className="text-4xl font-medium uppercase">
                                        {data.payload.name}
                                    </div>
                                    {/* <RarityBadge
                                        rankResolution={data.payload.rankResolution}
                                        resolution={data.payload.resolution}
                                    /> */}
                                </div>
                                {nftOwner && <OwnedId ownerId={nftOwner} />}
                                <SellInfo nft={data} />
                                <Skills skills={data.skills} />
                                <Traits traits={data.traits} />
                                <PriceHistory tokenId={data._id} />
                                {/* <Listings /> */}
                            </div>
                            <div className="order-3 col-span-full mt-7 md:mt-10">
                                <h3 className="mb-4 text-center text-28 font-medium">
                                    Item Activity
                                </h3>
                                <ItemActivity tokenId={data._id} />
                            </div>
                        </div>
                    ) : null}
                </Container>
            </PageWrapper>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { id = '' } = context.query
    const queryClient = new QueryClient()
    const marketplaceService = new MarketplaceService()

    await queryClient.prefetchQuery([QueryKeys.GET_NFT, id], () =>
        marketplaceService.getToken({ id: id as string })
    )

    return { props: { id, dehydratedState: dehydrate(queryClient) } }
}

export default NftPage
