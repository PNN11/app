import { FC, useState } from 'react'

import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'

import GameStats from '../basicInfo/gameStats'

import { Game } from 'common-types/game'
import NftCard from 'components/common/nftCard/newNftCard'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import useCollectionQuery from 'hooks/useCollectionQuery'
import useServiceStore from 'store/service'

interface NftsBlockProps {
    game: Game.IGame
}

const NftsBlock: FC<NftsBlockProps> = ({ game }) => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const [limit] = useState(8)

    const { data: collection, isLoading: statsIsLoading } = useCollectionQuery(
        game?.collections?.[0]?._id
    )

    const { data, isLoading, isError, isFetched } = useQuery(
        ['get-game-nfts', game],
        () =>
            marketplaceService.getTokens({
                limit: limit.toString(),
                offset: '0',
                games: [game.id],
            }),
        { enabled: !!game?.id }
    )

    return (
        <BlockWrapper>
            <div className="items-center justify-between lg:flex">
                <BlockTitle>NFTs from this game</BlockTitle>
                <GameStats
                    currency={collection?.currencies?.[0]}
                    statistics={collection?.statistics}
                    isLoading={statsIsLoading}
                />
            </div>
            <div>
                <MarketplaceCardsWrapper
                    dataLength={data?.totalDocs}
                    isError={isError}
                    isLoading={isLoading}
                    isFetched={isFetched}
                    limit={limit}
                    loadingCardType="nft"
                >
                    <div className="hidden grid-cols-2 gap-4 sm:grid lg:grid-cols-4">
                        {!isLoading && !isError && data?.docs
                            ? data.docs.map(nft => <NftCard nft={{ ...nft }} key={nft._id} />)
                            : null}
                    </div>
                    <Swiper
                        slidesPerView={1.25}
                        spaceBetween={8}
                        className="slider-overflow mb-4 sm:hidden"
                        style={{ paddingTop: '0.75rem' }}
                    >
                        {!isLoading && !isError && data?.docs
                            ? data.docs.map(nft => (
                                  <SwiperSlide key={nft._id}>
                                      <NftCard nft={{ ...nft }} />
                                  </SwiperSlide>
                              ))
                            : null}
                    </Swiper>
                </MarketplaceCardsWrapper>
            </div>
        </BlockWrapper>
    )
}

export default NftsBlock
