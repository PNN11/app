import { FC } from 'react'

import Image from 'next/image'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const TransitionGames: FC = () => {
    return (
        <BlockWrapper>
            <TitleWithDescription
                title="Transitioning Games Web2 → Web3"
                description="Our SDK empowers game developers to integrate blockchain technology, NFTs and gaming tokens"
                classes={{
                    title: 'max-w-88.5 text-38 lg:text-38 mx-auto mb-3',
                    wrapper: ' max-w-xl mb-8 mx-auto md:mb-14.5',
                }}
            />
            <div
                className="flex flex-col items-center justify-center gap-9 md:flex-row xl:flex-row xl:gap-20"
                data-aos="fade-zoom-in"
            >
                <div className="flex flex-col justify-center gap-7 md:pl-[4%]">
                    <div className="relative">
                        <Image
                            src="/images/aboutUsPage/mmo.png"
                            alt="MMO Games"
                            height={66}
                            width={332}
                        />
                        <div
                            className="absolute top-48 right-[28%] h-0.5 w-64 rotate-[90deg] bg-[#484848] 3xs:top-50 3xs:right-25 
                            2xs:left-[-3.5rem] 2xs:top-[12.75rem] md:top-2/4 md:left-[102%] md:w-30 md:rotate-0"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/aboutUsPage/hyper.png"
                            alt="Hypercoagulation Games"
                            height={66}
                            width={332}
                        />
                        <div
                            className="absolute top-36 left-[20%] h-0.5 w-40 rotate-90 bg-[#484848] 3xs:top-38 3xs:left-18 
                            2xs:top-40 2xs:left-22 md:top-2/4 md:left-[102%] md:w-30 md:rotate-0"
                        />
                    </div>
                    <div className="relative">
                        <Image
                            src="/images/aboutUsPage/traditional.png"
                            alt="Traditional Games"
                            height={66}
                            width={332}
                        />
                        <div
                            className="absolute top-28 right-5 h-0.5 w-20 rotate-90 bg-[#484848] 3xs:top-30 3xs:right-8 
                        md:top-2/4 md:left-[102%] md:w-30 md:rotate-0"
                        />
                    </div>
                </div>
                <div className="relative">
                    <Image
                        src="/images/aboutUsPage/sdk.png"
                        alt="sdk"
                        height={276}
                        width={276}
                        className="relative z-[1]"
                    />
                    <Image
                        src="/images/aboutUsPage/arrow.png"
                        alt="arrow"
                        height={100}
                        width={248}
                        className="absolute bottom-6 rotate-90 3xs:left-3 md:left-1/3 md:top-[36%] md:rotate-0 
                        lg:top-[37.5%] lg:left-1/3 xl:left-[45%]"
                    />
                    <Image
                        src="/images/aboutUsPage/blue.png"
                        alt="blue"
                        height={915}
                        width={843}
                        className="absolute top-[-70%] left-[-100%] h-[57.1875rem] min-w-[52.6875rem] 
                        md:top-[-25rem] md:left-[-14rem] lg:top-[-25rem] lg:left-[-10rem]"
                    />
                    <Image
                        src="/images/aboutUsPage/pink.png"
                        alt="pink"
                        height={1108}
                        width={1059}
                        className="absolute bottom-[-140%] right-[-120%] h-[69.25rem] min-w-[66.1875rem]
                        md:bottom-[-30rem] md:right-[-25rem]"
                    />
                </div>
                <Image
                    src="/images/aboutUsPage/web3.png"
                    quality={100}
                    alt="Web3 Games"
                    height={292}
                    width={377}
                    className=" min-w-[13rem]"
                />
            </div>
        </BlockWrapper>
    )
}

export default TransitionGames
