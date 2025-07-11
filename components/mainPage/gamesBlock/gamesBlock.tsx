/* eslint-disable react/no-array-index-key */
import { FC } from 'react'

import Link from 'next/link'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// eslint-disable-next-line import/no-unresolved
import 'swiper/css'

import NavigationSliderButton from '../bannersSlider/navigationSliderButton'
import TitleWithDescription from '../titleWIthDescription'

import { MainPage } from 'common-types/mainPage'
import GameCard from 'components/common/gameCard'
import ComingSoonGameCard from 'components/common/gameCard/comingSoonCard'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import { defaultDelay } from 'utils/constants/animations'
import { SlidersBreackpoints } from 'utils/types/common'

const mockGame = {
    title: 'Medieval Battle',
    description: 'Based puzzle game',
    preview: '/images/gamesBlock/mock-game.png',
    platforms: [
        { title: 'Desktop', createdAt: '1', id: '12', updatedAt: '1' },
        { title: 'iOS', createdAt: '1', id: '12', updatedAt: '1' },
        { title: 'Android', createdAt: '1', id: '12', updatedAt: '1' },
    ],
}

interface GamesBlockProps {
    games: MainPage.Game[]
    title: string
    description?: string
    subTitle?: string
    actionButton: { title: string; link: string; variant?: 'contained' | 'outlined' }
}

const GamesBlock: FC<GamesBlockProps> = ({ games, title, description, actionButton, subTitle }) => {
    return (
        <BlockWrapper className="relative">
            <Container>
                <TitleWithDescription title={title} description={description} subTitle={subTitle} />
            </Container>
            <div className="relative mx-auto max-w-grid-container">
                <Container>
                    <Swiper
                        breakpoints={{
                            [SlidersBreackpoints['0px']]: { slidesPerView: 1.25 },
                            [SlidersBreackpoints['768px']]: { slidesPerView: 2 },
                            [SlidersBreackpoints['1024px']]: { slidesPerView: 3 },
                        }}
                        spaceBetween={16}
                        className="mb-10"
                        style={{ paddingTop: '0.75rem' }}
                        navigation={{ nextEl: '.next-arrow', prevEl: '.prev-arrow' }}
                        modules={[Navigation]}
                    >
                        {games.map(
                            (
                                {
                                    countTokens,
                                    description,
                                    id,
                                    preview,
                                    title,
                                    platforms,
                                    status,
                                    address,
                                },
                                index
                            ) => (
                                <SwiperSlide key={id}>
                                    <div
                                        data-aos="fade-up"
                                        data-aos-delay={
                                            index < 3
                                                ? defaultDelay + index * defaultDelay
                                                : defaultDelay
                                        }
                                    >
                                        <GameCard
                                            countTokens={countTokens}
                                            description={description}
                                            address={address}
                                            preview={preview}
                                            title={title}
                                            platforms={platforms}
                                            status={status}
                                            classes={{ image: 'aspect-video object-cover' }}
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                        <SwiperSlide>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={games.length * defaultDelay + defaultDelay}
                            >
                                <ComingSoonGameCard {...mockGame} />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </Container>
                <div className="top-1/3 mb-10 flex w-full items-start justify-center gap-4 px-2 text-base-100 md:absolute md:mb-0 md:justify-between">
                    <NavigationSliderButton className="prev-arrow rotate-180" />
                    <NavigationSliderButton className="next-arrow" />
                </div>
            </div>

            <Container>
                <div className="flex justify-center">
                    <Link className="block w-full sm:w-fit" href={actionButton.link}>
                        <SmallButton
                            className="w-full"
                            variant={actionButton.variant ?? 'outlined'}
                        >
                            {actionButton.title}
                        </SmallButton>
                    </Link>
                </div>
            </Container>
        </BlockWrapper>
    )
}

export default GamesBlock
