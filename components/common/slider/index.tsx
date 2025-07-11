/* eslint-disable import/no-unresolved */
import { FC, ReactNode } from 'react'

import { Navigation, SwiperOptions } from 'swiper'
import 'swiper/css/navigation'
import { Swiper, SwiperProps } from 'swiper/react'

import SliderArrow from 'components/svg/sliderArrow'

interface Props extends SwiperProps {
    children?: ReactNode
    loop?: boolean
    breakpoints?: {
        [width: number]: SwiperOptions
        [ratio: string]: SwiperOptions
    }
    className?: string
}

const Slider: FC<Props> = ({
    children,
    breakpoints,
    loop,
    className,
    spaceBetween = 30,
    ...rest
}) => {
    return (
        <Swiper
            navigation={{
                nextEl: '.arrow-next',
                prevEl: '.arrow-prev',
            }}
            breakpoints={breakpoints}
            modules={[Navigation]}
            spaceBetween={spaceBetween}
            loop={loop}
            className={className}
            {...rest}
        >
            {children}
            <div className="mt-5 flex items-center justify-between">
                <div className="arrow-prev cursor-pointer">
                    <SliderArrow className="rotate-180" />
                </div>
                <div className="arrow-next cursor-pointer">
                    <SliderArrow />
                </div>
            </div>
        </Swiper>
    )
}

export default Slider
