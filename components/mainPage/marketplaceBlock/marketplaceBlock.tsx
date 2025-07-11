import { FC } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import TitleWithDescription from '../titleWIthDescription'

import { MainPage } from 'common-types/mainPage'
import { Pages } from 'common-types/pages'
import NftCardForMainPage from 'components/common/nftCard/mainpage'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import { defaultDelay } from 'utils/constants/animations'
import { SlidersBreackpoints } from 'utils/types/common'

type MarketplaceBlockProps = {
    nfts: MainPage.MarketplaceToken[]
} & Pages.MainPageTextContent['nftBlock']

const MarketplaceBlock: FC<MarketplaceBlockProps> = ({ nfts, button, description, title }) => {
    return (
        <BlockWrapper className="overflow-hidden">
            <Container className="text-base-100">
                <TitleWithDescription title={title} description={description} />
                <Swiper
                    breakpoints={{
                        [SlidersBreackpoints['0px']]: { slidesPerView: 1.25 },
                        [SlidersBreackpoints['640px']]: { slidesPerView: 2.1 },
                        [SlidersBreackpoints['1024px']]: { slidesPerView: 3 },
                    }}
                    spaceBetween={16}
                    className="slider-overflow mb-10"
                    style={{ paddingTop: '0.75rem' }}
                >
                    {nfts.map((nft, index) => (
                        <SwiperSlide key={nft.id}>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={
                                    index < 3 ? defaultDelay + index * defaultDelay : defaultDelay
                                }
                            >
                                <NftCardForMainPage nft={nft} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-center">
                    <SmallButton disabled className="w-full sm:w-fit" variant="outlined">
                        {button}
                    </SmallButton>
                </div>
            </Container>
        </BlockWrapper>
    )
}

export default MarketplaceBlock
