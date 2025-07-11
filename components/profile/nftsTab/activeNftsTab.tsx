import { FC, useEffect, useState } from 'react'

import { useQuery } from 'react-query'

import {
    IMarketplaceToken,
    MarketplaceTokenStatus,
} from 'common-types/marketplace/marketplace-token'
import NftCard from 'components/common/nftCard/newNftCard'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import { MarketplaceFilter } from 'components/marketplace/filter/types'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useServiceStore from 'store/service'
import useFilterStore from 'store/useFilterStore'
import useUserStore from 'store/useUserStore'

type PropsType = {
    filters?: {
        status?: MarketplaceTokenStatus
        resolution?: IMarketplaceToken.ResolutionType
        isStaked?: boolean
    }
}
const ActiveNftsTab: FC<PropsType> = ({ filters }) => {
    const [page, setPage] = useState(0)
    const [limit] = useState(15)
    const [tokens, setTokens] = useState<IMarketplaceToken.TBodyResponse[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [count, setCount] = useState(0)
    const userId = useUserStore(state => state.userId)
    const filter: MarketplaceFilter = useFilterStore(s => s.filter)
    const mounted = useFilterStore(state => state.mounted)

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { isLoading, isError, isFetched, isRefetching, refetch } = useQuery(
        ['get-nfts', page, limit, filter, userId],
        ({ signal }) =>
            marketplaceService.getTokens({
                userId,
                ...filters,
                sort: filter.sort?.sortBy ? filter.sort.sortBy : undefined,
                searchText: filter?.searchText?.length > 2 ? filter.searchText : undefined,
                limit: limit.toString(),
                offset: (page * limit).toString(),
                signal,
            }),
        {
            enabled: mounted,
            onSuccess(data) {
                setTokens(data.docs)
                setTotalCount(data.totalDocs)
                setCount(data.docs?.length)
            },
            refetchOnWindowFocus: false,
        }
    )

    useSubscribeToNFTEvent(`cancel`, event => {
        if (filters?.status === MarketplaceTokenStatus.SALE) {
            setTokens(prev => prev.filter(nft => nft._id !== event.target._id))
            setTotalCount(prev => prev - 1)
            setCount(prev => prev - 1)
        }
    })

    useSubscribeToNFTEvent('unlock', () => {
        refetch()
    })

    useEffect(() => {
        setPage(0)
    }, [filters])

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
                {!isLoading && tokens.length
                    ? tokens.map(nft => <NftCard key={nft._id} nft={nft} />)
                    : null}
            </MarketplaceCardsWrapper>
            <PaginationBlock
                totalCount={totalCount}
                count={count}
                page={page}
                setPage={setPage}
                pageSize={limit}
                isLoading={isLoading}
            />
        </>
    )
}

export default ActiveNftsTab
