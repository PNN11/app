import { FC, useState } from 'react'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import Gallery from './gallery'

import { useModal } from 'hooks/useModal'

interface Props {
    screenshots: string[]
}

const Screenshots: FC<Props> = ({ screenshots }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>()

    const [isOpenGallery, openGallery, closeGallery] = useModal(false)

    return (
        <>
            <div>
                <Image
                    src={screenshots?.[currentImageIndex ?? 0]}
                    width={981}
                    height={420}
                    alt="Game screenshot"
                    className="mb-4 max-h-45.5 w-full cursor-pointer rounded-5 object-cover sm:max-h-72 lg:max-h-105"
                    onClick={openGallery}
                />

                <Swiper
                    loop
                    breakpoints={{
                        0: {
                            slidesPerView: 2.75,
                        },
                        640: {
                            slidesPerView: 5.5,
                        },
                    }}
                    spaceBetween={16}
                >
                    {screenshots?.map((screenshot, index) => (
                        <SwiperSlide key={screenshot}>
                            <Image
                                className="max-h-17 w-full cursor-pointer select-none rounded-lg object-cover sm:max-h-14.5 lg:max-h-22"
                                src={screenshot}
                                alt="Game screenshot"
                                width={211}
                                height={159}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Gallery
                currentImageIndex={currentImageIndex}
                images={screenshots}
                isOpen={isOpenGallery}
                close={closeGallery}
            />
        </>
    )
}

export default Screenshots
