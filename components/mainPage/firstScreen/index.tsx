import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'
import useStopVideoOutOfView from 'hooks/useStopVideoOutOfView'

const supportedBlockchains = [
    {
        blockchain: 'Polygon',
        image: '/images/blockchains/polygon.png',
    },
    {
        blockchain: 'Skale',
        image: '/images/blockchains/skale.png',
    },
    {
        blockchain: 'Linea',
        image: '/images/blockchains/linea.png',
    },
]
const BlockchainSlideComponent: FC<typeof supportedBlockchains[number]> = ({
    blockchain,
    image,
}) => {
    return <Image src={image} alt={blockchain} width={130} height={40} className="w-25 s:w-32.5" />
}

const MainPageFirstScreen: FC = () => {
    const ref = useStopVideoOutOfView()

    return (
        <div className="h-[100svh] w-full overflow-hidden" id="main-page-first-screen">
            <Container className="relative h-full select-none">
                <div className="absolute top-0 right-[10%] h-[58%] w-[65%] rotate-[20deg] rounded-full bg-[#3321A3] blur-[12.5rem] will-change-transform sm:blur-[15.625rem]" />
                <div className="absolute top-80 left-[20%] h-[40%] w-[46%] rotate-[20deg] rounded-full bg-[#0AB3FB] blur-[12.5rem] will-change-transform sm:blur-[15.625rem]" />
                <div className="absolute top-1/2 left-1/2 z-[0] w-full -translate-x-1/2 -translate-y-1/2">
                    <h1
                        className="relative z-[0] mx-auto mb-6 max-w-3xl px-2 text-center text-6xl font-bold tracking-[-0.25rem] 
                         sm:text-custom-8xl sm:leading-[0.87]"
                    >
                        Earn rewards by playing web3 games
                    </h1>
                </div>
                <div
                    id="main-page-video-container"
                    className="absolute top-1/2 left-1/2 flex aspect-square w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:w-3/4 lg:w-1/2"
                >
                    <video
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full"
                        poster="/images/coins-poster.png"
                        ref={ref}
                    >
                        <source src="/video/mainPage/render-1.mov" type="video/mp4;codecs=hvc1" />
                        <source src="/video/mainPage/render_VP9.webm" />
                    </video>
                </div>
                <div className="absolute top-1/2 left-1/2 z-[2] w-full -translate-x-1/2 -translate-y-1/2">
                    <div className="mx-auto w-full max-w-3xl translate-x-1/2 overflow-hidden">
                        <h1
                            className="relative z-[2] mb-6 w-full -translate-x-1/2 px-2 text-center text-6xl font-bold tracking-[-0.25rem]
                          sm:text-custom-8xl sm:leading-[0.87]"
                        >
                            Earn rewards by playing web3 games
                        </h1>
                    </div>
                    <Link href="/games" className="absolute left-1/2 z-[3] -translate-x-1/2">
                        <SmallButton color="white" className="">
                            Explore Games
                        </SmallButton>
                    </Link>
                </div>
                <div className="absolute left-1/2 bottom-10 w-full max-w-5xl -translate-x-1/2">
                    <p className="mb-1 text-center opacity-50">Supported blockchains</p>
                    <div className="flex items-center justify-center gap-5">
                        {supportedBlockchains.map(chain => (
                            <BlockchainSlideComponent key={chain.image} {...chain} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainPageFirstScreen
