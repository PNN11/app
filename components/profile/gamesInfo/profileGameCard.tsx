import { FC, MutableRefObject, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Badge from '../referralInfo/badge'

import { Game } from 'common-types/game'

interface GameCardProps {
    game: Game.IGame
}

const ProfileGameCard: FC<GameCardProps> = ({ game }) => {
    const videoRef = useRef() as MutableRefObject<HTMLVideoElement>

    return (
        <div
            className="rounded-platform group relative h-fit w-fit"
            onMouseEnter={() => game?.shortVideo && videoRef.current.play()}
            onMouseLeave={() => game?.shortVideo && videoRef.current.pause()}
        >
            <Link href={`/games/${game.address}`}>
                <Image
                    src={game.preview}
                    alt={game.title}
                    width={336}
                    height={188}
                    quality={100}
                    priority
                    className={`h-[11.75rem] rounded-5 object-cover transition-all duration-[400ms] ${
                        game?.shortVideo ? 'md:group-hover:opacity-0' : ''
                    }`}
                />
                {game?.shortVideo ? (
                    <video
                        poster={game.preview}
                        muted
                        preload="metadata"
                        ref={videoRef}
                        loop
                        className="absolute top-0 left-0 hidden h-full w-full rounded-5 object-cover opacity-0 transition-all duration-[400ms] 
                                        md:block md:group-hover:opacity-100"
                    >
                        <source src={game.shortVideo} />
                    </video>
                ) : null}

                <div className="absolute top-2 right-2">
                    <Badge title="Beta Testing Live" className="bg-pink-brightly" />
                </div>
            </Link>
            <div
                className="absolute -bottom-px left-0 right-0 flex  items-center justify-between gap-2 rounded-b-5 
                                        py-5 px-2 text-base-100"
                style={{
                    background: 'linear-gradient(0deg, #030c26 0%, rgba(32, 38, 60, 0) 100%)',
                }}
            >
                <Link href={`/games/${game.address}`}>
                    <div className="flex flex-nowrap items-center gap-2 text-custom-xs font-bold uppercase">
                        <Image
                            src={game.icon}
                            width={34}
                            height={34}
                            quality={100}
                            alt={game.title}
                            className="rounded-[0.625rem]"
                        />

                        <p className="max-w-[5rem]">{game.title}</p>
                    </div>
                </Link>
                <div className="flex flex-nowrap items-center gap-[0.625rem]">
                    {game?.stores?.apple ? (
                        <a href={game?.stores?.apple} target="_blank" rel="noreferrer">
                            <Image
                                src="/img/games/app1.png"
                                width={70}
                                height={21}
                                quality={100}
                                alt="App Store"
                            />
                        </a>
                    ) : null}
                    {game?.stores?.google ? (
                        <a href={game?.stores?.google} target="_blank" rel="noreferrer">
                            <Image
                                src="/img/games/app2.png"
                                width={70}
                                height={21}
                                quality={100}
                                alt="Google play"
                            />
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ProfileGameCard
