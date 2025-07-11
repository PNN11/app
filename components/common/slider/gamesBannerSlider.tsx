// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination'

import { FC } from 'react'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Game } from 'common-types/game'
import { GameBanner } from 'components/game/gameBanner'

type PropsType = {
    games: Game.TGameBanner[]
    className?: string
}
const GamesBannerSlider: FC<PropsType> = ({ games, className }) => {
    return (
        <div className={className}>
            <Swiper
                pagination={{
                    bulletActiveClass: 'swiper-pagination-bullet-active,custom-bullet-active',
                    bulletClass: 'swiper-pagination-bullet,custom-bullet',
                    horizontalClass: 'swiper-pagination-horizontal,horizontal',
                }}
                modules={[Pagination]}
                spaceBetween={40}
                className="pb-3.5"
            >
                {games.map((game, index) => (
                    <SwiperSlide key={+index}>
                        <GameBanner {...game} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default GamesBannerSlider
