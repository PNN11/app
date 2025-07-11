import { FC } from 'react'

import Image from 'next/image'

import { Pages } from 'common-types/pages'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

type AboutUsMainScreenProps = Pages.AboutUsTextContent['banner']

const AboutUsMainScreen: FC<AboutUsMainScreenProps> = ({ description, subtitle, title }) => {
    return (
        <BlockWrapper className="relative mb-[8.250rem] pt-15 md:mb-[15.25rem] md:pt-0 xl:mb-[15.25rem]">
            <Image
                src="/images/aboutUsPage/arena-logo.png"
                width={1312}
                height={517}
                alt="logo"
                className="absolute w-full"
                data-aos="fade-in-zoom"
                data-aos-delay="200"
                priority
            />

            <div
                className="-translate-z-1 absolute top-[60%] h-20 w-full bg-about-us-main-screen-blur blur-[4.5rem] sm:top-[50%] sm:h-35 sm:blur-[6.25rem]
                 md:top-[50%] lg:top-[35%]"
                data-aos="fade-in-zoom"
                data-aos-delay="200"
            />
            <div
                className="translate-z-4 relative z-[1] mx-auto max-w-204.5 space-y-4 md:pt-[13%]"
                data-aos="fade-up"
            >
                <div className="text-center text-xl font-normal lg:text-custom-2.5xl lg:font-medium">
                    {subtitle}
                </div>
                <h1 className="text-center text-custom-3xl font-medium leading-9 lg:text-6xl lg:leading-[1.06]">
                    {title}
                </h1>
                <div className="mx-auto max-w-lg text-center text-base text-base-200 lg:text-xl">
                    {description}
                </div>
            </div>
        </BlockWrapper>
    )
}

export default AboutUsMainScreen
