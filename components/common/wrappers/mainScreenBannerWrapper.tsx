import { FC, ReactNode } from 'react'

import Image from 'next/image'

import { BlockWrapper } from './blockWrapper'
import { Container } from './container'

interface Props {
    title: string
    subTitle: string
    description: string

    image: string
    imageMobile: string
    children: ReactNode
}

const MainScreenBannerWrapper: FC<Props> = ({
    description,
    image,
    imageMobile,
    subTitle,
    title,
    children,
}) => {
    return (
        <div className="mx-auto max-w-grid-container">
            <BlockWrapper className="xl:mb-20">
                <div
                    className="grid items-center gap-6 md:grid-cols-12 md:gap-4"
                    data-aos="fade-zoom-in"
                >
                    <div className="order-1 md:order-none md:col-span-7">
                        <Container>
                            <div className="relative space-y-5 text-center md:mt-[22%] md:text-left">
                                <div className="absolute inset-0 z-[-1] blur-3xl sm:bg-bg/40" />
                                <div className="text-custom-lg font-medium lg:text-custom-2.5xl">
                                    {subTitle}
                                </div>
                                <h1 className="text-custom-3xl leading-9 lg:text-6xl lg:leading-[1.06]">
                                    {title}
                                </h1>
                                <div className="text-base text-base-200 lg:text-xl">
                                    {description}
                                </div>
                                {children}
                            </div>
                        </Container>
                    </div>
                    <div>
                        <Image
                            src={image}
                            width={1440}
                            height={531}
                            alt="Arena Games"
                            priority
                            quality={100}
                            className="absolute top-0 right-0 z-[-2] hidden object-cover object-right-top md:block md:h-100 lg:h-140"
                        />
                        <Image
                            src={imageMobile}
                            width={728}
                            height={586}
                            alt="Arena Games"
                            priority
                            quality={100}
                            className="w-full md:hidden"
                        />
                    </div>
                </div>
            </BlockWrapper>
        </div>
    )
}

export default MainScreenBannerWrapper
