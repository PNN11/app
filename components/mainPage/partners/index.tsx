/* eslint-disable react/destructuring-assignment */
import { FC } from 'react'

import MainPageBlockWrapper from '../blockWrapper'
import TitleWithColorWords from '../titleWithColorWords'

import PartnerPreview, { PartnerPreviewProps } from './preview'

import SliderWithAutoplay from 'components/common/slider/withAutoplay'
import { Container } from 'components/common/wrappers/container'

const partners: PartnerPreviewProps[] = [
    {
        alt: 'vEmpire',
        img: '/images/partners/new/new-vempire.png',
        href: 'https://www.vemp.xyz/',
        width: 186.1,
        height: 40.4,
    },
    {
        alt: 'Polygon',
        img: '/images/partners/new/polygon.png',
        href: 'https://polygon.technology/',
        width: 184,
        height: 46,
    },
    {
        alt: '500',
        img: '/images/partners/new/500.png',
        href: 'https://500.co/',
        width: 166,
        height: 64,
    },
    {
        alt: 'Magic Eden',
        img: '/images/partners/new/me.png',
        href: 'https://polygon.magiceden.io/',
        width: 184,
        height: 21,
    },
    {
        alt: 'PLAN9',
        img: '/images/partners/new/plan9.png',
        href: 'https://plan9.tech/',
        width: 135,
        height: 35,
    },
    {
        alt: 'Sambrela',
        img: '/images/partners/new/sumbrella.png',
        href: 'https://sambrela.com/',
        width: 118,
        height: 56,
    },
    {
        alt: 'OKX',
        img: '/images/partners/new/okx.png',
        href: 'https://www.okx.com/',
        width: 149,
        height: 42,
    },
    {
        alt: 'Binance',
        img: '/images/partners/new/binance-pay.png',
        href: 'https://pay.binance.com/en',
        width: 142,
        height: 52,
    },
]

const gamingPartners: PartnerPreviewProps[] = [
    {
        alt: 'Retrocraft games',
        img: '/images/partners/games/new/retrocraft.png',
        href: 'https://retrocraft.io/',
        width: 66,
        height: 66,
    },
    {
        alt: 'Machinations',
        img: '/images/partners/games/new/machinations.png',
        href: 'https://machinations.io/',
        width: 181,
        height: 32,
    },
    {
        alt: 'Playmakers',
        img: '/images/partners/games/new/play-makers.png',
        href: 'https://www.playmakers.co/',
        width: 119,
        height: 51,
    },
    {
        alt: 'IndiGG',
        img: '/images/partners/games/new/indi.png',
        href: 'https://twitter.com/IndiGG_DAO',
        width: 66,
        height: 68,
    },
    {
        alt: 'Good Games Guild',
        img: '/images/partners/games/new/good-games-guild.png',
        href: 'https://goodgamesguild.com/',
        width: 66,
        height: 66,
    },
    {
        alt: 'DGG Gaming Guild',
        img: '/images/partners/games/new/dgg.png',
        href: 'https://twitter.com/TheRealDGG_',
        width: 66,
        height: 66,
    },
    {
        alt: 'Kratos Studios',
        img: '/images/partners/games/new/kratos.png',
        href: 'https://kratos.global/',
        width: 136,
        height: 67,
    },
    {
        alt: 'Appsflyer',
        img: '/images/partners/games/new/apps-flyer.png',
        href: 'https://www.appsflyer.com/',
        width: 173,
        height: 56,
    },
    {
        alt: 'Lambda Gaming',
        img: '/images/partners/games/new/lambda.png',
        href: 'https://lambdagaming.io/',
        width: 182,
        height: 36,
    },
    {
        alt: 'Revolt Entertainment',
        img: '/images/partners/games/new/revolt.png',
        href: 'https://www.entertainmentrevolt.com/',
        width: 150,
        height: 50,
    },
    {
        alt: 'ForwARdgame',
        img: '/images/partners/games/new/forward-game.png',
        href: 'https://www.forwardgame.com/',
        width: 184,
        height: 45,
    },
    {
        alt: 'Galaxy4Games',
        img: '/images/partners/games/new/galaxy4games.png',
        href: 'https://galaxy4games.com/',
        width: 188,
        height: 34,
    },
    {
        alt: 'Igrove',
        img: '/images/partners/games/new/igrove.png',
        href: 'https://play.google.com/store/apps/details?id=com.iGrove.iGrove&hl=en_US',
        width: 66,
        height: 67,
    },
    {
        alt: 'Cherish Dev',
        img: '/images/partners/games/new/cherish.png',
        href: 'https://www.cherishdev.com/',
        width: 184,
        height: 28,
    },
]

const PartnersSlide: FC<PartnerPreviewProps> = props => {
    return (
        <div className="flex flex-col items-center gap-4">
            <PartnerPreview {...props} />
        </div>
    )
}

const Partners: FC = () => {
    return (
        <>
            <MainPageBlockWrapper className="relative">
                <div
                    className="absolute right-38 -bottom-100 h-[29.25rem] w-[15.75rem] -rotate-12 rounded-[29.25rem] bg-[#0AB3FB] blur-[18.75rem]"
                    data-aos="fade-in-zoom"
                />
                <Container className="px-0 sm:px-0 xl:px-0">
                    <TitleWithColorWords
                        title=""
                        colorWords="Partners"
                        classes={{ colorWords: 'bg-mainPagePartnersTitle' }}
                    />

                    <div className="flex flex-col gap-5">
                        <SliderWithAutoplay
                            data={partners}
                            keyForComponent={(data, i) => `${data.alt}${i}`}
                            Component={PartnersSlide}
                            isOverlayAdded={false}
                        />
                    </div>
                </Container>
            </MainPageBlockWrapper>
            <MainPageBlockWrapper className="relative">
                <div
                    className="absolute right-38 -bottom-100 h-[29.25rem] w-[15.75rem] -rotate-12 rounded-[29.25rem] bg-[#0AB3FB] blur-[18.75rem]"
                    data-aos="fade-in-zoom"
                />
                <Container className="px-0 sm:px-0 xl:px-0">
                    <TitleWithColorWords
                        title=""
                        colorWords="Gaming partners"
                        classes={{ colorWords: 'bg-mainPagePartnersTitle' }}
                    />

                    <div className="flex flex-col gap-5">
                        <SliderWithAutoplay
                            data={gamingPartners}
                            keyForComponent={(data, i) => `${data.alt}${i}`}
                            Component={PartnersSlide}
                            isOverlayAdded={false}
                        />
                    </div>
                </Container>
            </MainPageBlockWrapper>
        </>
    )
}

export default Partners
