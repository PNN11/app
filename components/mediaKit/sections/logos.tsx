import { FC } from 'react'

import Image from 'next/image'

import MediaKitCard from '../cards/mediaKitCard'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const logos = [
    {
        title: 'Variant 1',
        imgSrcForShow: '/images/mediaKit/forShow/logo.png',
        imgSrcForDownload: [
            '/images/mediaKit/forDownload/logo.svg',
            '/images/mediaKit/forDownload/logo.png',
        ],
        imgWidth: 205,
        imgHeight: 117,
    },
    {
        title: 'Variant 2',
        imgSrcForShow: '/images/mediaKit/forShow/logoOnDarkBackground.png',
        imgSrcForDownload: [
            '/images/mediaKit/forDownload/logoOnDarkBackground.svg',
            '/images/mediaKit/forDownload/logoOnDarkBackground.png',
        ],
        imgWidth: 120,
        imgHeight: 120,
    },
]

const Logos: FC = () => {
    return (
        <BlockWrapper className="relative xl:mb-40">
            <TitleWithDescription title="Logos" classes={{ title: 'mb-6' }} />
            <div
                className="relative z-[1] flex flex-wrap items-center justify-center gap-4"
                data-aos="fade-zoom-in"
            >
                {logos.map(el => (
                    <MediaKitCard key={el.title} {...el} imgClassName="py-5" />
                ))}
            </div>
            <Image
                width={880}
                height={1108}
                src="/images/mediaKit/ellipse_2.png"
                alt="blur"
                className="absolute right-1/3 -top-40"
                data-aos="fade-zoom-in"
            />
            <Image
                width={942}
                height={865}
                src="/images/mediaKit/ellipse_3.png"
                alt="blur"
                className="absolute top-[20%] md:left-20 md:-top-40"
                data-aos="fade-zoom-in"
            />
            <Image
                width={795}
                height={963}
                src="/images/mediaKit/ellipse_4.png"
                alt="blur"
                className="absolute top-2/3 left-1/3 2xs:top-0"
                data-aos="fade-zoom-in"
            />
        </BlockWrapper>
    )
}

export default Logos
