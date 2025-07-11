import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import MainPageBlockWrapper from '../blockWrapper'
import TitleWithColorWords from '../titleWithColorWords'

import MainPageGameItem from './item'
import MainPageGamesSlider from './slider'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'

const games = [
    {
        logo: '/images/gamesBlock/arena-master-logo.png',
        titleLogo: '/images/gamesBlock/arkane-merge-title.png',
        title: 'Arcane Merge',
        links: {
            appStore: 'https://apps.apple.com/us/app/arcane-merge-puzzle-game/id1625081403',
            google: 'https://play.google.com/store/apps/details?id=com.Sambrela.ArenaMasterPuzzleGame&hl=en&gl=US',
        },
        description: 'Legendary turn-based puzzle game with multiplayer matchmaking',
        stats: { gameplays: '1 000 000+', wallets: '70 000+', rating: '4.5' },
        preview: '/video/mainPage/arena_master.mp4',
        previewBg: { image: '/images/gamesBlock/iphone-bg-vertical.png', width: 298, height: 606 },
        poster: '/images/gamesBlock/arena-master-poster.png',
    },
    {
        logo: '/images/gamesBlock/tank-master-logo.png',
        titleLogo: '/images/gamesBlock/tank_master_title.png',
        title: 'Tank Master',
        links: {
            appStore: 'https://apps.apple.com/ge/app/tank-master-multiplayer-game/id6449257637',
            google: 'https://play.google.com/store/apps/details?id=com.sambrela.tankmaster.multiplayer.action.battle.game&hl=en&gl=US',
        },
        description:
            'Engage in intense 2v2 and 4v4 tank battles. Customizable tanks, intuitive controls, and thrilling challenges await',
        stats: { gameplays: '100 000+', wallets: '5 000+', rating: '4.5' },
        preview: '/video/mainPage/tank_master.mp4',
        previewBg: {
            image: '/images/gamesBlock/iphone-bg-horizontal.png',
            width: 632,
            height: 312,
        },
        poster: '/images/gamesBlock/tank-master-poster.png',
    },
]

const MainPageGames: FC = () => {
    return (
        <div>
            <Container className="relative">
                <div
                    className="absolute top-0 h-66 w-66 rotate-12 rounded-full bg-[#B237A5] blur-[9.75rem] sm:h-100 sm:w-100 sm:blur-[14.375rem]"
                    data-aos="fade-in-zoom"
                />
                <MainPageBlockWrapper className="relative z-[1]">
                    <MainPageGameItem {...games[0]} classes={{ wrapper: 'mb-37' }} />
                </MainPageBlockWrapper>
                <MainPageBlockWrapper className="relative">
                    <MainPageGameItem
                        {...games[1]}
                        classes={{
                            wrapper: 'lg:flex-row-reverse mb-15 relative z-[1]',
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 h-92 w-100 rotate-12 rounded-full bg-[#3321A3] blur-[10rem] sm:-top-44 sm:-right-48 sm:h-[40.3125rem]
                         sm:w-[37.875rem] sm:blur-[15.625rem]"
                        data-aos="fade-in-zoom"
                    />
                    <Link href="/games" className="flex justify-center" data-aos="fade-in-zoom">
                        <SmallButton color="white">Explore all games</SmallButton>
                    </Link>
                </MainPageBlockWrapper>
            </Container>
            <TitleWithColorWords
                classes={{ title: 'max-w-xl mx-auto', colorWords: 'bg-mainPageLeaderboardTitle' }}
                title="Rise to the Top of Arena's "
                colorWords="Leaderboard"
            />
            <Link
                href="/auth/sign-up"
                className="mt-5 mb-8 flex justify-center"
                data-aos="fade-in-zoom"
            >
                <SmallButton color="white">Enter the Arena</SmallButton>
            </Link>
            <MainPageGamesSlider />
            <MainPageBlockWrapper className="">
                <Container>
                    <div
                        className="relative z-[1] mx-auto max-w-[51rem] rounded-8 bg-main-page-tournaments-bg p-12"
                        data-aos="fade-in-zoom"
                    >
                        <Image
                            src="/images/developersPage/logo-AG.png"
                            width={128}
                            height={73}
                            alt="Arena logo"
                            className="mb-6 w-27 md:w-32"
                        />
                        <Image
                            src="/images/gamesBlock/amt1.png"
                            width={96}
                            height={97}
                            alt="amt coin"
                            className="absolute -top-8 right-20 w-18 sm:right-13 sm:w-24"
                        />
                        <Image
                            src="/images/gamesBlock/amt2.png"
                            width={140}
                            height={141}
                            alt="amt coin"
                            className="absolute -top-8 right-0 w-22 sm:top-6 sm:-right-6 sm:w-35 lg:-right-17"
                        />
                        <p className="mb-1 text-3.5xl font-bold md:text-custom-6xl md:font-semibold">
                            Arcane Merge and Tank Master Tournaments
                        </p>
                        <p className="mb-10 text-xl md:text-2xl">
                            Get prepared to compete for ultimate championship where your efforts are
                            rewarded with AMT prizes
                        </p>
                        <Link href="/auth/sign-up">
                            <SmallButton color="white">Create an account</SmallButton>
                        </Link>
                    </div>
                </Container>
            </MainPageBlockWrapper>
        </div>
    )
}

export default MainPageGames
