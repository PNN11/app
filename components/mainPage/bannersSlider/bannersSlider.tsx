/* eslint-disable import/no-unresolved */
import { FC, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import NavigationSliderButton from './navigationSliderButton'

import { MainPage } from 'common-types/mainPage'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'

interface BannersSliderProps {
    slides: MainPage.MainPageBanner[]
}

const BannersSlider: FC<BannersSliderProps> = ({ slides }) => {
    const [activeSlide, setActiveSlide] = useState(0)
    const [slideProgress, setSlideProgress] = useState(0)

    return (
        <BlockWrapper className="xl:mb-20">
            <Container className="mb-2 min-h-[25rem] px-0 sm:px-0 md:h-[60vh] xl:px-0">
                <Swiper
                    navigation={{ nextEl: '.next-arrow', prevEl: '.prev-arrow' }}
                    modules={[Navigation, Autoplay]}
                    loop
                    autoplay={{
                        delay: 5000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false,
                    }}
                    className="relative h-full"
                    onAutoplayTimeLeft={(s, t, p) => {
                        const value = Math.floor(100 - p * 100)

                        if (value !== slideProgress) setSlideProgress(value)
                    }}
                    onSlideChange={s => {
                        setSlideProgress(0)
                        setActiveSlide(s.realIndex)
                    }}
                >
                    {slides?.map(banner => (
                        <SwiperSlide
                            key={banner.title}
                            className="relative !grid h-full grid-cols-8 pl-14.5 pr-10.5 md:px-16 xl:grid-cols-12"
                        >
                            <Image
                                src="/images/bannersSlider/shadow-for-banner.png"
                                width={784}
                                height={500}
                                alt="shadow"
                                className="absolute top-0 bottom-0 left-0 z-[2] hidden xl:block"
                            />
                            <Image
                                src={banner.image}
                                width={1440}
                                height={500}
                                alt={banner.title}
                                priority
                                quality={100}
                                className="absolute top-0 right-0 h-[50vw] min-h-73 object-cover object-right-top md:inset-0 md:h-full"
                            />
                            <div className="relative z-[2] col-span-full mt-63 text-base-100 md:col-span-5 md:mt-28 xl:mt-44">
                                <div className="absolute inset-0 blur-3xl sm:bg-bg/40" />
                                <div className="relative z-[3]">
                                    <h5 className="mb-5 text-3.5xl font-bold leading-8 md:text-custom-4xl md:font-extrabold">
                                        {banner.title}
                                    </h5>
                                    <div className="mb-5 drop-shadow-banner-description">
                                        {banner.description}
                                    </div>
                                    <div className="flex flex-col items-center gap-4 pb-23 md:flex-row">
                                        <Link
                                            className="block w-full md:w-fit"
                                            href={banner.actionButton.url}
                                        >
                                            <SmallButton className="w-full">
                                                {banner.actionButton.label}
                                            </SmallButton>
                                        </Link>
                                        {banner.secondaryActions &&
                                            banner.secondaryActions.map(action => (
                                                <Link
                                                    className="block w-full md:w-fit"
                                                    href={action.url}
                                                    key={action.label}
                                                >
                                                    <SmallButton
                                                        className="w-full"
                                                        variant="outlined"
                                                    >
                                                        {action.label}
                                                    </SmallButton>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="absolute top-1/2 flex w-full items-start justify-between px-2 text-base-100">
                        <NavigationSliderButton className="prev-arrow rotate-180" />
                        <NavigationSliderButton className="next-arrow" />
                    </div>
                    <div className="absolute left-1/2 bottom-17 z-[1] flex -translate-x-1/2 items-center gap-2 md:bottom-2.5">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="relative h-0.5 w-11 rounded-sm  bg-base-700 md:w-15 xl:w-16"
                            >
                                <div
                                    style={{
                                        width: index === activeSlide ? `${slideProgress}%` : 0,
                                    }}
                                    className={`absolute h-full rounded-sm bg-base-100 transition-all duration-75 ${
                                        index === activeSlide ? 'block' : 'hidden'
                                    }`}
                                />
                            </div>
                        ))}
                    </div>
                    <div />
                </Swiper>
            </Container>
        </BlockWrapper>
    )
}

export default BannersSlider
