import { FC, useEffect } from 'react'

import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'

import NftForStakingTableHeader from './table/header'
import NftForStakingTableRow from './table/row'

import Table from 'components/common/table'
import CallToAction from 'components/common/ui/ctaMessage'
import TableSkeletonLoader from 'components/common/ui/tableSkeletonLoader'
import { useHydrated } from 'hooks/useHydrated'
import { useSubscribeToNFTEvent } from 'hooks/useSubscribeToNFTEvent'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'

interface Props {
    collectionId: string
}

const limit = 10

const MyNftList: FC<Props> = ({ collectionId }) => {
    const marketplaceService = useServiceStore(store => store.marketplaceService)
    const userId = useUserStore(store => store.userId)
    const isHydrated = useHydrated()

    const { isLoading, data, fetchNextPage, isFetchingNextPage, refetch, remove } =
        useInfiniteQuery(
            [QueryKeys.GET_NFTS, limit, userId],
            ({ pageParam = 0 }) =>
                marketplaceService.getTokens({
                    userId,
                    collections: [collectionId],
                    limit: limit.toString(),
                    offset: (pageParam * limit).toString(),
                    status: 'SOLD',
                }),
            {
                refetchOnMount: 'always',
                enabled: !!collectionId && !!userId && isHydrated,
                getNextPageParam: lastPage => {
                    if (lastPage.hasNextPage) return lastPage.nextPage
                },
                refetchOnWindowFocus: true,
            }
        )

    const { ref } = useInView({
        onChange(inView) {
            if (inView) fetchNextPage()
        },
    })

    useSubscribeToNFTEvent(`lock`, () => {
        refetch()
    })
    useSubscribeToNFTEvent(`unlock`, () => {
        refetch()
    })

    useEffect(() => {
        if (data) {
            refetch()
        }

        return () => {
            remove()
        }
    }, [])

    return (
        <div>
            <h5 className="mb-4 text-custom-2.5xl font-medium">My NFTs</h5>

            {!isLoading && data?.pages?.length && data.pages[0].totalDocs ? (
                <Table>
                    <div className="divide-y divide-base-600 rounded-t-5 bg-base-700">
                        <NftForStakingTableHeader />
                        <Table.Scroll />
                        {data.pages.map(page =>
                            page?.docs?.map(nft => (
                                <NftForStakingTableRow
                                    key={nft._id}
                                    nft={nft}
                                    collectionId={collectionId}
                                />
                            ))
                        )}
                        <div ref={ref} />
                    </div>
                    <Table.Scroll />
                </Table>
            ) : null}
            {(isLoading || isFetchingNextPage) && (
                <div
                    className={`divide-y divide-base-600 bg-base-700 ${
                        isLoading ? 'rounded-t-5' : ''
                    }`}
                >
                    <TableSkeletonLoader
                        isLoading={isLoading || isFetchingNextPage}
                        rowsCount={limit}
                        columnsCount={4}
                        classes={{ row: 'h-22 py-3', column: 'rounded-xl' }}
                    />
                </div>
            )}

            {!isLoading && !data?.pages?.[0]?.totalDocs && (
                <CallToAction
                    actionButton="Buy NFTs"
                    title="You don't have available NFTs for staking"
                    description="You need to buy NFTs"
                    link="/marketplace"
                />
            )}
        </div>
    )
}

export default MyNftList
