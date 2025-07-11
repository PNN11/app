import { FC, useMemo } from 'react'

import Image from 'next/image'

import { Game } from 'common-types/game'
import Skeleton from 'components/common/skeleton'

interface IGameInfo {
    isLoading: boolean
    game: Game.IGame & {
        challengeTitle: string
    }
}

const BaseGameInfo: FC<IGameInfo> = ({ isLoading, game }) => {
    const stores = useMemo(
        () =>
            [
                {
                    title: 'AppStore',
                    image: '/img/games/AppStore.png',
                    link: game?.stores?.apple,
                    width: 127,
                },
                {
                    title: 'GooglePlay',
                    image: '/img/games/GooglePlay.png',
                    link: game?.stores?.google,
                    width: 127,
                },
                {
                    title: 'Web',
                    image: '/img/games/WebStore.png',
                    link: game?.stores?.web,
                    width: 137,
                },
                {
                    title: 'Galaxy',
                    image: '/img/games/galaxy.png',
                    link: game?.stores?.galaxy,
                    width: 133,
                },
                {
                    title: 'PC',
                    image: '/img/games/microsoft.png',
                    link: game?.stores?.pc,
                    width: 99,
                },
            ].filter(item => item.link),
        [game]
    )

    return (
        <div className="pb-3 md:pb-6">
            <Skeleton isLoading={isLoading}>
                <div className="mb-2 text-custom-3xl font-bold leading-9 text-base-100 md:mb-5 md:text-custom-5xl md:font-extrabold">
                    {game?.title}
                </div>
            </Skeleton>

            <Skeleton count={3} isLoading={isLoading}>
                <div className="mb-6 text-base text-base-100 md:mb-5">{game?.shortDescription}</div>
            </Skeleton>
            {stores.length ? (
                <div className="flex flex-wrap gap-1.5">
                    {stores.map(store => (
                        <a key={store.link} href={store.link} target="_blank" rel="noreferrer">
                            <Image
                                src={store.image}
                                alt={store.title}
                                width={store.width}
                                height={36}
                                className="h-9"
                                quality={100}
                            />
                        </a>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default BaseGameInfo
