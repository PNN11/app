import { FC, useEffect, useRef, useState } from 'react'

import { useInfiniteQuery } from 'react-query'

import FilterContainer from './filterContainer'
import SortAndSearchPanel from './sortAndSearchPanel'

import { Game } from 'common-types/game'
import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import NftCard from 'components/common/nftCard/newNftCard'
import { useEffectAfterMount } from 'components/common/tabs'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import FilterBadges from 'components/marketplace/filter/filterBadges'
import FilterButtons from 'components/marketplace/filter/filterButtons'
import { GamesPreview } from 'components/marketplace/filter/GamesFilter'
import PriceFilter, {
    PriceFromPreview,
    PriceToPreview,
} from 'components/marketplace/filter/priceFilter'
import { RankFromPreview, RankToPreview } from 'components/marketplace/filter/rankFilter'
import StatusFilter from 'components/marketplace/filter/statusFilter'
import { TraitsFilter } from 'components/marketplace/filter/traitsFilter'
import TypeFilter, { TypePreview } from 'components/marketplace/filter/typeFilter'
import { MarketplaceFilter } from 'components/marketplace/filter/types'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { MarketplaceSortOptions, marketplaceSortOptions } from 'utils/constants/sortOptions'
import { getGameMarketplaceTokensRequestParamsFromFilters } from 'utils/filters/filtersToParams'

interface GameMarketplaceProps {
    game: Game.IGame
}

const GameMarketplace: FC<GameMarketplaceProps> = ({ game }) => {
    const [limit] = useState(15)
    const [open, setOpen] = useState(false)

    const isFiltersMounted = useRef(false)

    const marketplaceContainer = useRef<HTMLDivElement>(null)

    const filters: MarketplaceFilter = useFilterStore(s => s.filter)
    const mounted = useFilterStore(state => state.mounted)

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { data, isLoading, isError, isFetched, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ['get-game-nfts', limit, filters, game],
            ({ signal, pageParam = 0 }) =>
                marketplaceService.getTokens({
                    signal,
                    ...getGameMarketplaceTokensRequestParamsFromFilters({
                        filters,
                        game,
                        limit,
                        pageParam,
                    }),
                }),
            {
                enabled: mounted && !!game?.id,
                getNextPageParam: lastPage => {
                    if (lastPage.hasNextPage) return lastPage.nextPage
                },
                refetchOnWindowFocus: false,
            }
        )

    const totalNftsCount = data?.pages?.[0]?.totalDocs

    useEffectAfterMount(() => {
        const containerOffset = (marketplaceContainer.current?.offsetTop ?? 0) - 80

        if (!isFiltersMounted.current || window.scrollY < containerOffset) return
        window.scrollTo(0, containerOffset)
    }, [filters])

    useEffect(() => {
        if (!mounted) return
        setTimeout(() => {
            isFiltersMounted.current = true
        }, 300)
    }, [mounted])

    return (
        <>
            <div
                className="mx-auto grid grid-cols-1 gap-4 px-0 lg:grid-cols-marketplace-container"
                ref={marketplaceContainer}
            >
                <FilterContainer open={open} setOpen={setOpen} className="lg:top-18">
                    {/* <SaleStatusFilter /> */}
                    <StatusFilter />
                    <TypeFilter />
                    {/* <RankFilter /> */}
                    <PriceFilter />
                    <TraitsFilter
                        gameCollections={game?.collections?.map(({ _id, payload }) => ({
                            _id,
                            name: (payload as IMarketplaceCollection.TPayloadCreated).name,
                        }))}
                    />
                </FilterContainer>

                <div>
                    <div className="mt-5 mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center">Total results: {totalNftsCount}</div>
                        <SortAndSearchPanel
                            sortParams={marketplaceSortOptions}
                            defaultSortParam={
                                marketplaceSortOptions[MarketplaceSortOptions.priceAmountASC]
                            }
                        />
                    </div>
                    <div className="mb-5 flex flex-wrap gap-2">
                        <FilterBadges
                            previews={[
                                TypePreview,
                                PriceFromPreview,
                                PriceToPreview,
                                RankFromPreview,
                                RankToPreview,
                                GamesPreview,
                            ]}
                        />
                    </div>
                    <MarketplaceCardsWrapper
                        dataLength={totalNftsCount}
                        isError={isError}
                        isLoading={isLoading}
                        isFetched={isFetched}
                        limit={limit}
                        loadingCardType="nft"
                        onScrollEnd={fetchNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    >
                        {!isLoading && data?.pages?.length
                            ? data.pages.map(page => {
                                  return page?.docs?.map(nft => <NftCard key={nft._id} nft={nft} />)
                              })
                            : null}
                    </MarketplaceCardsWrapper>
                </div>
            </div>
            <FilterButtons open={open} setOpen={setOpen} />
        </>
    )
}

export default GameMarketplace
