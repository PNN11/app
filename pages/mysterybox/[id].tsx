import { useEffect, useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import OwnedId from 'components/common/ui/owned'
import { Container } from 'components/common/wrappers/container'
import { Development } from 'components/common/wrappers/environment/dev'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import MysteryBoxSubheader from 'components/marketplace/mysteryBox/mysteryBoxSubHeader'
import ItemActivity from 'components/marketplace/nft/Activity/itemActivity'
import Characteristics from 'components/marketplace/nft/characteristics'
import Details from 'components/marketplace/nft/details'
import GameLink from 'components/marketplace/nft/gameLink'
import PriceHistory from 'components/marketplace/nft/priceHistory'
import SellInfo from 'components/marketplace/nft/sellInfo'
import BoxContents from 'components/mysteryBox/boxContents'
import { useHydrated } from 'hooks/useHydrated'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import { MarketplaceService } from 'services/api/marketplace'
import { blockchains } from 'services/wallets/blockchainProvider'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'

interface MysteryBoxPageProps {
    id: string
}

const MysteryBoxPage: NextPage<MysteryBoxPageProps> = ({ id }) => {
    const userId = useUserStore(state => state.userId)
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const isHydrated = useHydrated()

    const [nftOwner, setNftOwner] = useState<string>()

    const { data, refetch } = useQuery(
        [QueryKeys.GET_MYSTERY_BOX, id],
        () => marketplaceService.getToken({ id }),
        {
            onSuccess(data) {
                setNftOwner(data.payload.ownerId)
            },
        }
    )

    useSubscribeToNFTEvent(`buy-${data._id}`, event => {
        setNftOwner(event.target.payload.ownerId)
    })

    useSubscribeToNFTEvent(`lowerprice-${data._id}`, () => {
        refetch()
    })

    const blockchain = data.payload.type === 'MINT' && blockchains[data.payload.chainId]

    useEffect(() => {
        setNftOwner(data.payload.ownerId)
    }, [data])

    return (
        <PageWrapper>
            <Container>
                <div
                    className={`grid grid-cols-1 pt-5 pb-14 md:grid-cols-2 md:gap-4 ${
                        nftOwner === userId ? 'lg:pt-24' : ''
                    }`}
                >
                    {isHydrated && nftOwner === userId && <MysteryBoxSubheader mysteryBox={data} />}
                    <div className="contents md:block">
                        <div className="relative mb-4">
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
                                    data.collection.payload.type === 'MINT' &&
                                    data.collection.payload.address
                                }
                            />
                        </div>
                    </div>
                    <div className="contents md:block">
                        <div className="mb-2 flex justify-between">
                            <GameLink game={data.payload.game} />
                        </div>
                        <div className="mb-2 text-4xl font-medium uppercase">
                            {data.payload.name}
                        </div>
                        {data.payload.ownerId && <OwnedId ownerId={data.payload.ownerId} />}
                        <Development>
                            <SellInfo nft={data} />
                        </Development>
                        <BoxContents
                            series={
                                data.payload.resolution === 'MYSTER_BOX' &&
                                data.payload.mysteryBox?.series
                            }
                        />

                        <PriceHistory tokenId={data._id} />
                        {/* <Listings /> */}
                    </div>
                    <div className="order-3 col-span-full mt-7 md:mt-10">
                        <h3 className="mb-4 text-center text-28 font-medium">Item Activity</h3>
                        <ItemActivity tokenId={data._id} />
                    </div>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default MysteryBoxPage

export const getServerSideProps: GetServerSideProps = async context => {
    const { id = '' } = context.query
    const queryClient = new QueryClient()
    const marketplaceService = new MarketplaceService()

    await queryClient.prefetchQuery([QueryKeys.GET_MYSTERY_BOX, id], () =>
        marketplaceService.getToken({ id: id as string })
    )

    return { props: { id, dehydratedState: dehydrate(queryClient) } }
}
