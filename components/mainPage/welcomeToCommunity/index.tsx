import { FC } from 'react'

import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import MainPageBlockWrapper from '../blockWrapper'
import TitleWithColorWords from '../titleWithColorWords'

import { Container } from 'components/common/wrappers/container'
import MainPageSocialArrow from 'components/svg/mainPage/arrow'
import MainPageDiscordIcon from 'components/svg/mainPage/discord'
import MainPageTelegram from 'components/svg/mainPage/telegram'
import MainPageTwitter from 'components/svg/mainPage/twitter'

const socials = [
    {
        Icon: MainPageTwitter,
        name: 'Twitter',
        subscribers: '40000+',
        link: process.env.NEXT_PUBLIC_TWITTER_URL,
    },
    {
        Icon: MainPageDiscordIcon,
        name: 'Discord',
        subscribers: '15000+',
        link: process.env.NEXT_PUBLIC_DISCORD_URL,
    },
    // {
    //     Icon: MainPageMediumIcon,
    //     name: 'Medium',
    //     subscribers: '400+',
    //     link: process.env.NEXT_PUBLIC_MEDIUM_URL,
    // },
    {
        Icon: MainPageTelegram,
        name: 'Telegram',
        subscribers: '',
        link: process.env.NEXT_PUBLIC_TELEGRAM_URL,
        className: 'w-[10.71875rem] sm:w-[11.0625rem]',
    },
    // {
    //     Icon: MainPageInstagram,
    //     name: 'Instagram',
    //     subscribers: '4000+',
    //     link: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    // },
]

const WelcomeToCommunity: FC = () => {
    return (
        <MainPageBlockWrapper className="relative">
            <div
                className="absolute top-0 h-66 w-90 rotate-12 rounded-full bg-[#B237A5] blur-[10.625rem] sm:h-[23.5rem] sm:w-[32.125rem] sm:blur-[14.375rem]"
                data-aos="fade-in-zoom"
            />
            <Container className="relative z-[1]">
                <TitleWithColorWords
                    title="Welcome to the "
                    colorWords="community"
                    subtitle="Join our awesome Twitter community of Arena gamers to stay up to date"
                    classes={{ colorWords: 'bg-mainPageCommunityTitle' }}
                />
                <div className="flex flex-wrap justify-center gap-4" data-aos="fade-in-zoom">
                    {socials.map(({ Icon, link, name, subscribers, className }) => (
                        <Link
                            key={link}
                            href={link}
                            className={twMerge(
                                'block w-[21.4375rem] rounded-xl bg-main-page-social-card px-6 py-5 sm:w-[22.125rem]',
                                className
                            )}
                            target="_blank"
                        >
                            <Icon className="mb-4" />
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-semibold leading-7">{name}</p>
                                <MainPageSocialArrow />
                            </div>
                            <div className="text-custom-lg text-base-150">{subscribers}</div>
                        </Link>
                    ))}
                </div>
            </Container>
        </MainPageBlockWrapper>
    )
}

export default WelcomeToCommunity
