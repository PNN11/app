import { FC } from 'react'

import Image from 'next/image'
import { Navigation, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import NavigationSliderButton from 'components/mainPage/bannersSlider/navigationSliderButton'
import { IModal } from 'components/modals/interfaces/modalInterface'
import { ModalOverlay } from 'components/modals/overlay'

interface GalleryProps extends IModal {
    images: string[]
    currentImageIndex: number
}

const Gallery: FC<GalleryProps> = ({ isOpen, close, images, currentImageIndex }) => {
    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <div
                className="grid h-full w-full grid-cols-[2rem_1fr_2rem] items-center"
                onClick={close}
            >
                <NavigationSliderButton className="arrow-prev rotate-180" />
                <Swiper
                    className="m-8"
                    slidesPerView={1}
                    modules={[Navigation, Keyboard]}
                    navigation={{ nextEl: '.arrow-next', prevEl: '.arrow-prev' }}
                    initialSlide={currentImageIndex}
                    keyboard={{
                        enabled: true,
                        onlyInViewport: true,
                    }}
                    loop
                >
                    {images?.map(image => (
                        <SwiperSlide key={image} className="">
                            <Image
                                src={image}
                                width={1264}
                                height={700}
                                alt="Game screenshot"
                                className="mx-auto max-h-[calc(100vh-4rem)] select-none rounded-5"
                                onClick={e => e.stopPropagation()}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <NavigationSliderButton className="arrow-next" />
            </div>
        </ModalOverlay>
    )
}

export default Gallery
