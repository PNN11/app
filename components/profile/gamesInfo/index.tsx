import { FC, useState } from 'react'

import Link from 'next/link'
import { useInfiniteQuery } from 'react-query'
import { SwiperSlide } from 'swiper/react'

import WrapperBlock from '../wrapperBlock'

import GameCard from 'components/common/gameCard'
import Slider from 'components/common/slider'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'

const GamesInfo: FC = () => {
    const gameService = useServiceStore(state => state.gameService)
    const isAuth = useAuthStore(store => store.isAuth)
    const [limit] = useState(5)

    const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
        'my-games',
        ({ pageParam = 0, signal }) =>
            gameService.getMyGames({
                limit: limit.toString(),
                offset: (limit * pageParam).toString(),
                signal,
            }),
        {
            enabled: isAuth,
            getNextPageParam: lastPage => {
                if (lastPage?.hasNextPage && lastPage?.nextPage) return lastPage.nextPage
            },
            refetchOnWindowFocus: false,
        }
    )

    return (
        <WrapperBlock title="My games" className="mb-6">
            <>
                {!isLoading && !isError && data?.pages?.[0]?.totalDocs ? (
                    <Slider
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1,
                            },
                            420: {
                                slidesPerView: 1.5,
                            },
                            600: {
                                slidesPerView: 2.1,
                            },
                            768: {
                                slidesPerView: 2.7,
                            },
                            1024: {
                                slidesPerView: 3.5,
                            },
                            1280: {
                                slidesPerView: 4,
                            },
                        }}
                        spaceBetween={16}
                        className="-mt-3 pt-3"
                        onReachEnd={() => {
                            fetchNextPage()
                        }}
                    >
                        {data.pages.map(page =>
                            page?.docs?.map(
                                ({
                                    id,
                                    countTokens,
                                    description,
                                    preview,
                                    title,
                                    platforms,
                                    status,
                                    address,
                                }) => (
                                    <SwiperSlide key={id} className="">
                                        <GameCard
                                            countTokens={countTokens}
                                            description={description}
                                            address={address}
                                            preview={preview}
                                            title={title}
                                            platforms={platforms}
                                            status={status}
                                            classes={{ image: 'aspect-[4/3] object-cover' }}
                                        />
                                    </SwiperSlide>
                                )
                            )
                        )}
                    </Slider>
                ) : null}
                {!isLoading && !data?.pages?.[0]?.totalDocs && (
                    <div className="my-3 text-center text-base-300">Games was not found</div>
                )}
                <div className="flex justify-center">
                    <Link href="/games" className="block w-full sm:w-fit">
                        <SmallButton className="w-full" variant="outlined">
                            See all games
                        </SmallButton>
                    </Link>
                </div>
            </>
        </WrapperBlock>
    )
}

export default GamesInfo
