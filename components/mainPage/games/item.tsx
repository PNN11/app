import { FC } from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import GameSocialLink from './socialLink'

import AppStoreIcon from 'components/svg/mainPage/appStore'
import GooglePlayIcon from 'components/svg/mainPage/googlePlay'
import useStopVideoOutOfView from 'hooks/useStopVideoOutOfView'

interface Props {
    logo: string
    titleLogo: string
    title: string
    links: { appStore: string; google: string }
    description: string
    stats: { gameplays: string; wallets: string; rating: string }
    preview: string
    previewBg: { image: string; width: number; height: number }
    classes?: { wrapper?: string; screen?: { video?: string; image?: string; wrapper?: string } }
    poster: string
}

const MainPageGameItem: FC<Props> = ({
    description,
    links,
    logo,
    preview,
    title,
    titleLogo,
    stats,
    classes,
    previewBg,
    poster,
}) => {
    const gameStats = [
        { title: 'gameplays', value: stats.gameplays },
        { title: 'wallets', value: stats.wallets },
        { title: 'in stores', value: stats.rating },
    ]

    const ref = useStopVideoOutOfView()

    return (
        <div
            className={twMerge(
                'flex flex-col items-center justify-center lg:flex-row lg:gap-22',
                classes?.wrapper
            )}
            data-aos="fade-in-zoom"
        >
            <div className="contents max-w-[21.75rem] lg:block">
                <div className="order-1 flex items-center justify-center gap-2.25 lg:order-none">
                    <Image src={logo} width={115} height={115} alt={title} quality={100} />
                    <Image src={titleLogo} width={193} height={164} alt={title} quality={100} />
                </div>
                <div className="order-2 mb-7 flex items-center gap-2.25 lg:order-none lg:mb-10">
                    <GameSocialLink Icon={AppStoreIcon} link={links.appStore} />
                    <GameSocialLink Icon={GooglePlayIcon} link={links.google} />
                </div>
                <div className="order-4 mb-5 text-center text-xl text-base-150 lg:order-none">
                    {description}
                </div>
                <div className="order-5 flex items-center justify-center gap-5 lg:order-none">
                    {gameStats.map(stat => (
                        <div
                            className="text-center text-2xl font-semibold leading-7 tracking-[-0.0625rem]"
                            key={`${title}${stat.title}`}
                        >
                            <div>{stat.value}</div>
                            <div>{stat.title}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={twMerge(
                    'relative order-3 mb-7 lg:order-none lg:mb-0',
                    classes?.screen?.wrapper
                )}
            >
                <Image
                    src={previewBg.image}
                    width={previewBg.width}
                    height={previewBg.height}
                    alt="iphone background"
                    className={twMerge('relative z-[1]', classes?.screen?.image)}
                />
                <video
                    className={twMerge(
                        'absolute inset-0 m-auto h-[96%] w-[96%] rounded-3xl',
                        classes?.screen?.video
                    )}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    ref={ref}
                    poster={poster}
                >
                    <source src={preview} />
                </video>
            </div>
        </div>
    )
}

export default MainPageGameItem
