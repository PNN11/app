import { FC, useContext } from 'react'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'

import TitleWithDescription from '../titleWIthDescription'

import { Pages } from 'common-types/pages'
import NftCardForMainPage from 'components/common/nftCard/mainpage/mock'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import LanguageContext from 'components/context/LanguageContext'
import { defaultDelay } from 'utils/constants/animations'
import { SlidersBreackpoints } from 'utils/types/common'

type MarketplaceBlockProps = Pages.MainPageTextContent['nftBlock']

const MarketplaceBlockMock: FC<MarketplaceBlockProps> = ({ button, description, title }) => {
    const {
        dictionary: { marketplaceBlock },
    } = useContext(LanguageContext)

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
                    {marketplaceBlock.nftCards.map((nft, index) => (
                        <SwiperSlide key={nft._id}>
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
                    <Link
                        href="https://magiceden.io/launchpad/polygon/arena_games_genesis"
                        target="_blank"
                    >
                        <SmallButton className="w-full sm:w-fit" variant="outlined">
                            {button}
                        </SmallButton>
                    </Link>
                </div>
            </Container>
        </BlockWrapper>
    )
}

export default MarketplaceBlockMock
