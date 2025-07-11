import { FC, useState } from 'react'

import { useQuery } from 'react-query'

import GameAssetCardForShop from 'components/common/nftCard/gameAsset/forShop'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import useServiceStore from 'store/service'

const GameAssetsTab: FC = () => {
    const [page, setPage] = useState(0)
    const [limit] = useState(15)

    const gameService = useServiceStore(state => state.gameService)

    const { data, isLoading, isError, isFetched, isRefetching } = useQuery(
        ['get-game-assets', page, limit],
        ({ signal }) =>
            gameService.getMyGameAssets({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                signal,
            }),
        { refetchOnWindowFocus: false }
    )

    const totalCount = data?.totalDocs

    return (
        <>
            <MarketplaceCardsWrapper
                dataLength={totalCount}
                isError={isError}
                isLoading={isLoading || isRefetching}
                isFetched={isFetched}
                limit={limit}
                loadingCardType="nft"
            >
                {!isLoading && data?.totalDocs && data?.docs?.length
                    ? data.docs.map(asset => (
                          <GameAssetCardForShop key={asset.gameAssetId} {...asset} />
                      ))
                    : null}
            </MarketplaceCardsWrapper>
            <PaginationBlock
                totalCount={totalCount}
                count={data?.docs?.length}
                page={page}
                setPage={setPage}
                pageSize={limit}
                isLoading={isLoading}
            />
        </>
    )
}

export default GameAssetsTab
