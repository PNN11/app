import { FC } from 'react'

import MediaKitCard from '../cards/mediaKitCard'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const assets = [
    {
        title: 'Character 1',
        imgSrcForShow: '/images/mediaKit/forShow/asset_1.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_1.png'],
        imgWidth: 170,
        imgHeight: 280,
    },
    {
        title: 'Character 2',
        imgSrcForShow: '/images/mediaKit/forShow/asset_2.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_2.png'],
        imgWidth: 260,
        imgHeight: 280,
    },
    {
        title: 'Character 3',
        imgSrcForShow: '/images/mediaKit/forShow/asset_3.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_3.png'],
        imgWidth: 268.5,
        imgHeight: 280,
    },
    {
        title: 'Character 4',
        imgSrcForShow: '/images/mediaKit/forShow/asset_4.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_4.png'],
        imgWidth: 268.5,
        imgHeight: 280,
    },
    {
        title: 'Platform NFT Pass Common',
        imgSrcForShow: '/images/mediaKit/forShow/asset_5.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_5.png'],
        imgWidth: 260,
        imgHeight: 280,
    },
    {
        title: 'Platform NFT Pass Epic',
        imgSrcForShow: '/images/mediaKit/forShow/asset_6.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_6.png'],
        imgWidth: 268.5,
        imgHeight: 280,
    },
    {
        title: 'Platform NFT Pass Legendary',
        imgSrcForShow: '/images/mediaKit/forShow/asset_7.png',
        imgSrcForDownload: ['/images/mediaKit/forDownload/asset_7.png'],
        imgWidth: 268.5,
        imgHeight: 280,
    },
]

const Assets: FC = () => {
    return (
        <BlockWrapper className="xl:mb-40">
            <TitleWithDescription title="Assets" classes={{ title: 'mb-6' }} />
            <div
                className="relative z-[1] flex flex-wrap items-center justify-center gap-4"
                data-aos="fade-zoom-in"
            >
                {assets.map(el => (
                    <MediaKitCard key={el.title} {...el} />
                ))}
            </div>
        </BlockWrapper>
    )
}

export default Assets
