import { useState } from 'react'

import { NextPage } from 'next'
import { useQuery } from 'react-query'
import { SwiperSlide } from 'swiper/react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import Slider from 'components/common/slider'
import GamesBannerSlider from 'components/common/slider/gamesBannerSlider'
import { Container } from 'components/common/wrappers/container'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import LiveGameCard from 'components/mysteryBox/liveGameCard'
import MysteryBoxCardForBoxesPage from 'components/mysteryBox/mysteryBoxCardForBoxesPage'
import { mockGameBanners } from 'mock/games'
import { mockLiveGames, mockUpcomingGames } from 'mock/ourGames'
import useServiceStore from 'store/service'

const MysteryBoxes: NextPage = () => {
    const [page] = useState(0)
    const [limit] = useState(8)
    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { data, isLoading, isError, isFetched } = useQuery(
        ['get-mystery-box', page, limit],
        ({ signal }) =>
            marketplaceService.getTokens({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                resolution: 'MYSTER_BOX',
                lastDateTimeEnd: { gte: Date.now() },
                signal,
            })
    )

    return (
        <PageWrapper>
            <Container className="pt-2 pb-18">
                <GamesBannerSlider
                    games={mockGameBanners}
                    className="relative mb-9 mt-11 hidden lg:block"
                />
                <div className="mb-8 mt-3 lg:mt-0">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="text-custom-2.5xl font-medium">Arena Games Passes</div>
                        <div className="text-link">Get your pass</div>
                    </div>
                    <MarketplaceCardsWrapper
                        dataLength={data?.totalDocs}
                        isError={isError}
                        isLoading={isLoading}
                        isFetched={isFetched}
                    >
                        <Slider
                            breakpoints={{
                                0: {
                                    slidesPerView: 1.1,
                                    initialSlide: 0,
                                },
                                520: {
                                    slidesPerView: 1.5,
                                    initialSlide: 0,
                                },
                                640: {
                                    slidesPerView: 1.9,
                                    initialSlide: 0,
                                },
                                920: {
                                    slidesPerView: 3,
                                    initialSlide: 0,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    initialSlide: 0,
                                },
                            }}
                            spaceBetween={16}
                            className="-my-8 -mx-3 py-8 px-3 md:-mx-3.75 md:px-3.75"
                        >
                            {data?.docs &&
                                data.docs.map(box => (
                                    <SwiperSlide key={box._id}>
                                        <MysteryBoxCardForBoxesPage
                                            mysteryBox={box as IMarketplaceToken.TBodyResponse}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Slider>
                    </MarketplaceCardsWrapper>
                </div>
                <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="text-2xl font-medium">Live</div>
                        <div className="text-link">Explore all Mystery Boxes</div>
                    </div>
                    <Slider
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1,
                                initialSlide: 0,
                            },
                            520: {
                                slidesPerView: 1.5,
                                initialSlide: 0,
                            },
                            640: {
                                slidesPerView: 1.9,
                                initialSlide: 0,
                            },
                            920: {
                                slidesPerView: 3,
                                initialSlide: 0,
                            },
                            1200: {
                                slidesPerView: 4,
                                initialSlide: 0,
                            },
                        }}
                        spaceBetween={16}
                        className="-my-8 -mx-3 py-8 px-3 md:-mx-3.75 md:px-3.75"
                    >
                        {mockLiveGames.map(game => (
                            <SwiperSlide key={game.title}>
                                <div className="">
                                    <LiveGameCard game={game} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
                <div>
                    <div className="mb-3 text-2xl font-medium">Upcoming</div>
                    <Slider
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1,
                                initialSlide: 0,
                            },
                            520: {
                                slidesPerView: 1.5,
                                initialSlide: 0,
                            },
                            640: {
                                slidesPerView: 1.9,
                                initialSlide: 0,
                            },
                            920: {
                                slidesPerView: 3,
                                initialSlide: 0,
                            },
                            1200: {
                                slidesPerView: 4,
                                initialSlide: 0,
                            },
                        }}
                        spaceBetween={16}
                        className="-my-8 -mx-3 py-8 px-3 md:-mx-3.75 md:px-3.75"
                    >
                        {mockUpcomingGames.map(game => (
                            <SwiperSlide key={game.title}>
                                <div className="">
                                    <LiveGameCard game={game} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Slider>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default MysteryBoxes
