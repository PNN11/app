import { FC } from 'react'

import Image from 'next/image'

import MediaKitPersonCard from '../cards/mediaKitPersonCard'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const people = {
    imgSrcForShow: '/images/mediaKit/forShow/people.png',
    imgSrcForDownload: '/images/mediaKit/forDownload/people.png',
}

const People: FC = () => {
    return (
        <BlockWrapper className="relative xl:mb-40">
            <TitleWithDescription title="People" classes={{ title: 'mb-6' }} />
            <div className="relative z-[1] flex justify-center" data-aos="fade-zoom-in">
                <MediaKitPersonCard
                    imgSrcForShow={people.imgSrcForShow}
                    imgSrcForDownload={people.imgSrcForDownload}
                    title="Arena Games CEO"
                />
            </div>
            <div className="relative w-[166rem]">
                <Image
                    width={2666}
                    height={1933}
                    src="/images/mediaKit/vector.png"
                    alt="vector"
                    className="absolute bottom-[-50rem] left-[-50rem]"
                    data-aos="fade-zoom-in"
                />
            </div>
        </BlockWrapper>
    )
}

export default People
