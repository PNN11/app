import { FC, useEffect, useState } from 'react'

import { useInfiniteQuery } from 'react-query'

import NftCard from 'components/common/nftCard/newNftCard'
import { Container } from 'components/common/wrappers/container'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import FilterContainer from 'components/game/marketplace/filterContainer'
import SortAndSearchPanel from 'components/game/marketplace/sortAndSearchPanel'
import { CollectionsFilter } from 'components/marketplace/filter/collectionsFilter'
import FilterBadges from 'components/marketplace/filter/filterBadges'
import FilterButtons from 'components/marketplace/filter/filterButtons'
import PriceFilter, {
    PriceFromPreview,
    PriceToPreview,
} from 'components/marketplace/filter/priceFilter'
import { RankFromPreview, RankToPreview } from 'components/marketplace/filter/rankFilter'
import RarityFilter from 'components/marketplace/filter/rarityFilter'
import StatusFilter from 'components/marketplace/filter/statusFilter'
import { TraitsFilter, TraitsPreview } from 'components/marketplace/filter/traitsFilter'
import TypeFilter, { TypePreview } from 'components/marketplace/filter/typeFilter'
import { MarketplaceFilter } from 'components/marketplace/filter/types'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { marketplaceSortOptions, MarketplaceSortOptions } from 'utils/constants/sortOptions'
import { getMarketplaceTokensRequestParamsFromFilters } from 'utils/filters/filtersToParams'
import { isInvalidFromToFilter } from 'utils/filters/fromToFilters'

const Marketplace: FC = () => {
    const [limit] = useState(15)
    const [open, setOpen] = useState(false)

    const marketplaceService = useServiceStore(state => state.marketplaceService)
    const filters: MarketplaceFilter = useFilterStore(s => s.filter)
    const mounted = useFilterStore(state => state.mounted)

    const invalidPriceFilter = isInvalidFromToFilter(filters?.price?.from, filters?.price?.to)

    const invalidRankFilter = isInvalidFromToFilter(filters?.rank?.from, filters?.rank?.to)

    const { data, isLoading, isError, isFetched, fetchNextPage, isFetchingNextPage, remove } =
        useInfiniteQuery(
            [QueryKeys.GET_NFTS, limit, filters],
            ({ signal, pageParam = 0 }) =>
                marketplaceService.getTokens({
                    signal,
                    ...getMarketplaceTokensRequestParamsFromFilters({ filters, limit, pageParam }),
                }),
            {
                enabled: mounted && !invalidPriceFilter && !invalidRankFilter,
                refetchOnWindowFocus: false,
                getNextPageParam: lastPage => {
                    if (lastPage.hasNextPage) return lastPage.nextPage
                },
            }
        )

    const totalNftsCount = data?.pages?.[0]?.totalDocs

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [filters])

    useEffect(() => {
        return () => {
            remove()
        }
    }, [])

    return (
        <>
            <PageWrapper className="border-t border-base-700">
                <Container>
                    <div className="grid grid-cols-1 gap-4 pb-22 lg:grid-cols-marketplace-container lg:pb-9">
                        <FilterContainer open={open} setOpen={setOpen} className="lg:top-18">
                            {/* <SaleStatusFilter /> */}
                            <StatusFilter />
                            <TypeFilter />
                            {/* <RankFilter /> */}
                            <PriceFilter />
                            <RarityFilter />
                            {/* <GamesFilter /> */}
                            <CollectionsFilter />
                            <TraitsFilter />
                        </FilterContainer>

                        <div>
                            <div className="mb-4 bg-subheader p-4 text-center">
                                Marketplace is in Beta, errors might happen!
                            </div>
                            <div className="mb-3 flex flex-col justify-between gap-3 sm:mb-5 sm:flex-row sm:items-center">
                                <div className="flex items-center">
                                    Total results: {totalNftsCount}
                                </div>
                                <SortAndSearchPanel
                                    sortParams={marketplaceSortOptions}
                                    defaultSortParam={
                                        marketplaceSortOptions[
                                            MarketplaceSortOptions.priceAmountASC
                                        ]
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
                                        // RarityPreview,
                                        TraitsPreview,
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
                                          return page?.docs?.map(nft => (
                                              <NftCard key={nft._id} nft={nft} />
                                          ))
                                      })
                                    : null}
                            </MarketplaceCardsWrapper>
                        </div>
                    </div>
                </Container>
            </PageWrapper>
            <FilterButtons open={open} setOpen={setOpen} />
        </>
    )
}

export default Marketplace
