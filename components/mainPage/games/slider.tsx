import { FC } from 'react'

import Image from 'next/image'
import { useQuery } from 'react-query'

import MainPageBlockWrapper from '../blockWrapper'

import { Game } from 'common-types/game'
import SliderWithAutoplay from 'components/common/slider/withAutoplay'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const limit = 100
const page = 0
const gamesSlidesMinLength = 7

const getGamesSlides = (arr: Game.IGame[]): Game.IGame[] => {
    const multiplier = gamesSlidesMinLength / arr.length

    if (multiplier > 1) {
        return new Array<Game.IGame[]>(Math.ceil(multiplier)).fill(arr).flat()
    }

    return arr
}

const GameSlide: FC<Game.IGame> = ({ preview, title }) => {
    return (
        <div className="relative rounded-2xl">
            <Image
                src={preview}
                width={207}
                height={275}
                alt={title}
                className="aspect-[3/4] w-52 rounded-2xl object-cover"
                quality={100}
            />
            <div className="absolute bottom-0 z-[1] h-[60%] w-full rounded-b-2xl bg-main-page-game-shadow" />
            <div className="absolute left-5 bottom-5 z-[2] max-w-[8rem] text-2xl font-bold leading-7">
                {title}
            </div>
        </div>
    )
}

const MainPageGamesSlider: FC = () => {
    const gameService = useServiceStore(s => s.gameService)

    const { data, isLoading } = useQuery([QueryKeys.GET_ALL_GAMES, limit], () =>
        gameService.getGames({ limit: limit.toString(), offset: (limit * page).toString() })
    )

    return (
        <MainPageBlockWrapper>
            <div
                className="relative mx-auto flex max-w-grid-container items-center justify-center"
                data-aos="fade-in-zoom"
            >
                <Image
                    src="/images/gamesBlock/iphone-leaderboard.png"
                    width={585}
                    height={1193}
                    alt=""
                    quality={100}
                    className="relative z-[1] w-52 sm:w-73"
                />
                <div className="absolute" data-aos="fade-in-zoom">
                    {!isLoading && data?.docs?.length && (
                        <SliderWithAutoplay
                            data={getGamesSlides(data.docs)}
                            keyForComponent={(data, index) => `${data.id}${index}`}
                            Component={GameSlide}
                        />
                    )}
                </div>
            </div>
        </MainPageBlockWrapper>
    )
}

export default MainPageGamesSlider
