import { FC, useState } from 'react'

import { useQuery } from 'react-query'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import NftCard from 'components/common/nftCard/newNftCard'
import MarketplaceCardsWrapper from 'components/common/wrappers/marketplaceCardsWrapper'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useServiceStore from 'store/service'

const ClaimedNftsTab: FC = () => {
    const [page, setPage] = useState(0)
    const [limit] = useState(15)
    const [tokens, setTokens] = useState<IMarketplaceToken.TBodyResponse[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [count, setCount] = useState(0)

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { isLoading, isError, isFetched, isRefetching } = useQuery(
        ['get-nfts-claim', page, limit],
        ({ signal }) =>
            marketplaceService.getTokensForClaim({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                signal,
            }),
        {
            onSuccess(data) {
                setTokens(data.docs)
                setTotalCount(data.totalDocs)
                setCount(data.docs?.length)
            },
            refetchOnWindowFocus: false,
        }
    )

    useSubscribeToNFTEvent(`claim`, event => {
        setTokens(prev => prev.filter(nft => nft._id !== event.target._id))
        setTotalCount(prev => prev - 1)
        setCount(prev => prev - 1)
    })

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
                <div className="mb-4 grid grid-cols-nft-card-profile gap-3">
                    {!isLoading && tokens.length
                        ? tokens.map(nft => <NftCard key={nft._id} nft={nft} />)
                        : null}
                </div>
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

export default ClaimedNftsTab
