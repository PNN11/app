import 'aos/dist/aos.css'
import { FC, useEffect, useRef, useState } from 'react'

import Aos from 'aos'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from 'react-query'

import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import BenefitsItems from 'components/mainPage/benefitsItems'
import MainPageBlog from 'components/mainPage/blog'
import Faq from 'components/mainPage/faq/faq'
import MainPageFirstScreen from 'components/mainPage/firstScreen'
import MainPageGames from 'components/mainPage/games'
import Grants from 'components/mainPage/grants'
import Partners from 'components/mainPage/partners'
import TitleWithColorWords from 'components/mainPage/titleWithColorWords'
import WelcomeToCommunity from 'components/mainPage/welcomeToCommunity'
import AnimationLogoSvg from 'components/svg/animationLogoSvg'
import WingsSvg from 'components/svg/wingsSvg'
import { useWindowSize } from 'hooks/useWindowSize'
import { GameService } from 'services/api/game'
import { PageService } from 'services/api/mainPage'
import useServiceStore from 'store/service'
import { applyAnimationOnMainPage } from 'utils/animation/mainPage'
import { QueryKeys } from 'utils/constants/reactQuery'
import Debouncer from 'utils/debouncer'

type PropsType = {}

const debouncer = new Debouncer()

const Home: FC<PropsType> = () => {
    const pageService = useServiceStore(store => store.pageService)
    const { data } = useQuery(QueryKeys.MAIN_PAGE_DATA, pageService.getMainPageData)
    const { height, width } = useWindowSize()
    const [padding, setPadding] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [isSafari] = useState(false)
    const router = useRouter()

    const { formId } = router.query

    if (formId === 'ido') {
        router.push('/ido')
    }
    if (formId === 'claimnft') {
        router.push('/nft-giveaway')
    }

    const containerRef = useRef<HTMLDivElement>(null)
    const qwe = useRef<HTMLDivElement>(null)
    const gamesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        Aos.init({ duration: 700, once: true })
    }, [])

    useEffect(() => {
        const h = qwe.current.scrollHeight - height + 150

        setPadding(h)
    }, [height])

    useEffect(() => {
        if (mounted) {
            debouncer.execute(() => {
                window.location.reload()
            }, 700)
        }

        setMounted(true)
    }, [width])

    useEffect(() => {
        const animations = applyAnimationOnMainPage(containerRef)

        return () => {
            animations?.forEach(animation => animation?.kill())
        }
    }, [])

    useEffect(() => {
        const handler = (): void => {
            // @ts-ignore
            window.scroll({ top: 0, behavior: 'instant' })
        }

        window.addEventListener('beforeunload', handler)

        return () => {
            window.removeEventListener('beforeunload', handler)
        }
    }, [])

    return (
        <NegativeTopMarginWrapper>
            <div className="overflow-x-hidden">
                <div className="relative w-full" id="animation-container" ref={containerRef}>
                    <MainPageFirstScreen />
                    {!isSafari && (
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0"
                            id="logo-container"
                        >
                            <AnimationLogoSvg
                                width={1600}
                                height={1000}
                                className="logo relative w-50"
                            />
                            <WingsSvg
                                width={1600}
                                height={1000}
                                className="logo-shadow absolute top-[40%] left-1/2 w-full -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-0 sm:top-[42%]
                                 lg:top-1/2 2xl:top-[52%]"
                            />
                        </div>
                    )}

                    <div
                        className={`mb-20 flex w-full flex-col items-center  ${
                            isSafari ? 'relative' : 'absolute top-[9%] opacity-0'
                        }`}
                        id="third-screen"
                        ref={qwe}
                        data-aos={isSafari ? 'fade-in-zoom' : ''}
                    >
                        {isSafari && (
                            <WingsSvg
                                className=" absolute top-[25.8125rem] z-[1] mx-[-98px] max-h-[40.1875rem] w-[114%] s:top-20"
                                data-aos="fade-in-zoom"
                                width={1900}
                                height={1200}
                            />
                        )}

                        <div className="relative z-[3] mb-[10.5625rem] flex flex-col items-center justify-center pt-22 s:mb-[120px]">
                            <TitleWithColorWords
                                title={
                                    <>
                                        <p>One platform — </p>
                                        <span>many ways to </span>
                                    </>
                                }
                                colorWords="have fun"
                                classes={{ colorWords: 'bg-mainPageBenefitsTitle' }}
                            />
                        </div>
                        <BenefitsItems />
                    </div>
                </div>

                <div ref={gamesRef} style={{ paddingTop: isSafari ? 0 : padding }}>
                    <MainPageGames />
                </div>
                <WelcomeToCommunity />
                <MainPageBlog />
                <Partners />
                <Grants />
                {data && <Faq items={data?.faq} />}
            </div>
        </NegativeTopMarginWrapper>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const pageService = new PageService()
    const gameService = new GameService()
    const queryClient = new QueryClient()

    await Promise.allSettled([
        queryClient.prefetchQuery(QueryKeys.MAIN_PAGE_DATA, () => pageService.getMainPageData()),
        queryClient.prefetchQuery([QueryKeys.GET_ALL_GAMES, 100], () =>
            gameService.getGames({ limit: '100', offset: '0' })
        ),
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    }
}
