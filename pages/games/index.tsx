import { FC, useEffect, useState } from 'react'

import { useQuery } from 'react-query'

import GameCard from 'components/common/gameCard'
import { Container } from 'components/common/wrappers/container'
import GamesCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import FilterContainer from 'components/game/marketplace/filterContainer'
import SortAndSearchPanel from 'components/game/marketplace/sortAndSearchPanel'
import FilterBadges from 'components/marketplace/filter/filterBadges'
import FilterButtons from 'components/marketplace/filter/filterButtons'
import GameStatusFilter, { GameStatusPreview } from 'components/marketplace/filter/gameStatusFilter'
import GamesWithChallengeFilter, {
    GamesWithChallengePreview,
} from 'components/marketplace/filter/gamesWithChallengeFilter'
import GenresFilter, { GenresPreview } from 'components/marketplace/filter/genresFilter'
import PlatformFilter, { PlatformPreview } from 'components/marketplace/filter/platformFilter'
import { GamesFilter, MarketplaceFilter } from 'components/marketplace/filter/types'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import useDebounce from 'hooks/useDebounce'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import { gamesSortOptions } from 'utils/constants/sortOptions'

const Games: FC = () => {
    const [page, setPage] = useState(0)
    const [limit] = useState(10)
    const [open, setOpen] = useState(false)
    const filters: MarketplaceFilter & GamesFilter = useFilterStore(store => store.filter)
    const mounted = useFilterStore(store => store.mounted)

    const gameService = useServiceStore(store => store.gameService)

    const searchText = useDebounce(
        filters?.searchText?.length ? filters.searchText : undefined,
        300
    )

    const { data, isLoading, isError, isFetched } = useQuery(
        [
            'all-games',
            limit,
            page,
            searchText,
            filters?.sort?.sortBy?.createdAt,
            filters?.genres,
            filters?.platforms,
            filters?.gameStatus,
            filters?.gameWithChallenges,
        ],
        ({ signal }) =>
            gameService.getGames({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                createdAt: filters?.sort?.sortBy?.createdAt,
                genres: filters?.genres?.length ? filters.genres.map(items => items.id) : undefined,
                platforms: filters?.platforms?.length
                    ? filters.platforms.map(items => items.id)
                    : undefined,
                status: filters?.gameStatus || undefined,
                isActiveChallenge: filters?.gameWithChallenges === 'With challenges' || undefined,
                searchText,
                signal,
            }),
        { enabled: mounted }
    )

    useEffect(() => {
        setPage(0)
    }, [filters])

    return (
        <PageWrapper className="border-t border-base-700">
            <Container>
                <div className="grid grid-cols-1 gap-4 pb-22 lg:grid-cols-marketplace-container lg:pb-9">
                    <FilterContainer open={open} setOpen={setOpen} className="lg:top-18">
                        <GameStatusFilter />
                        <GamesWithChallengeFilter />
                        <GenresFilter />
                        <PlatformFilter />
                        {/* <BlockchainFilter /> */}
                    </FilterContainer>

                    <div className="mt-6">
                        <div className="mb-3 flex flex-col justify-between gap-3 sm:mb-5 sm:flex-row sm:items-center">
                            <div className="flex items-center">
                                Total results: {data?.totalDocs}
                            </div>
                            <SortAndSearchPanel
                                defaultSortParam={gamesSortOptions[1]}
                                sortParams={gamesSortOptions}
                            />
                        </div>
                        <div className="mb-5 flex flex-wrap gap-2">
                            <FilterBadges
                                previews={[
                                    GameStatusPreview,
                                    GamesWithChallengePreview,
                                    GenresPreview,
                                    PlatformPreview,
                                    // BlockchainPreview,
                                ]}
                            />
                        </div>
                        <GamesCardsWrapper
                            dataLength={data?.totalDocs}
                            isError={isError}
                            isLoading={isLoading}
                            isFetched={isFetched}
                            noDataMessage="According to your request games was not found"
                            limit={limit}
                            loadingCardType="game"
                            classes={{
                                skeletonLoading: {
                                    wrapper:
                                        'grid-cols-nft-card-marketplace 2xs:grid-cols-nft-card-marketplace',
                                },
                                cardsWrapper:
                                    'grid-cols-nft-card-marketplace 2xs:grid-cols-nft-card-marketplace',
                            }}
                        >
                            {!isLoading && data?.docs?.length
                                ? data?.docs.map(
                                      ({
                                          id,
                                          description,
                                          title,
                                          preview,
                                          countTokens,
                                          platforms,
                                          status,
                                          address,
                                      }) => (
                                          <GameCard
                                              key={id}
                                              countTokens={countTokens}
                                              description={description}
                                              address={address}
                                              preview={preview}
                                              title={title}
                                              platforms={platforms}
                                              status={status}
                                              classes={{ image: 'aspect-[4/3] object-cover' }}
                                          />
                                      )
                                  )
                                : null}
                        </GamesCardsWrapper>
                        <PaginationBlock
                            totalCount={data?.totalDocs}
                            count={data?.docs?.length}
                            page={page}
                            setPage={setPage}
                            pageSize={limit}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </Container>
            <FilterButtons open={open} setOpen={setOpen} />
        </PageWrapper>
    )
}

export default Games
