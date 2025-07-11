import { NextPage } from 'next'

import CollectionStackingPage from './[collectionId]'

const Stacking: NextPage = () => {
    // const { data, isLoading, isError, fetchNextPage, isFetched, isFetchingNextPage } =
    //     useInfiniteQuery(
    //         QueryKeys.ALL_STAKING_COLLECTIONS,
    //         ({ pageParam = 0, signal }) =>
    //             marketplaceService.getStakingCollections({
    //                 limit: limit.toString(),
    //                 offset: (pageParam * limit).toString(),
    //                 signal,
    //             }),
    //         {
    //             getNextPageParam: lastPage => {
    //                 if (lastPage.hasNextPage) return lastPage.nextPage
    //             },
    //             refetchOnWindowFocus: false,
    //         }
    //     )

    return (
        <CollectionStackingPage collectionId={process.env.NEXT_PUBLIC_STAKING_ID} />
        // <Container className="mt-11">
        //     <TitleWithDescription
        //         title="Stake NFT and Earn AGP"
        //         description="Deposit and stake your NFTs using our seamless process to earn daily AGP rewards!"
        //         classes={{
        //             title: 'text-start',
        //             description: 'text-start max-w-full',
        //             wrapper: 'lg:mb-7',
        //         }}
        //     />
        //     <CardsWrapper
        //         dataLength={data?.pages?.[0]?.totalDocs ?? 0}
        //         isError={isError}
        //         isLoading={isLoading}
        //         isFetched={isFetched}
        //         noDataMessage="According to your request games was not found"
        //         limit={limit}
        //         loadingCardType="game"
        //         classes={{ skeletonLoading: { wrapper: 'grid-cols-game-card' } }}
        //         isFetchingNextPage={isFetchingNextPage}
        //         onScrollEnd={fetchNextPage}
        //     >
        //         <div className="mb-4 grid grid-cols-game-card gap-3">
        //             {!isLoading && data?.pages?.length
        //                 ? data?.pages.map(page => {
        //                       return page?.docs?.map(({ _id, payload, statistics }) => (
        //                           <CollectionCard
        //                               key={_id}
        //                               _id={_id}
        //                               nftsCount={statistics?.countTokens}
        //                               preview={payload.logo}
        //                               name={payload.name}
        //                           />
        //                       ))
        //                   })
        //                 : null}
        //         </div>
        //     </CardsWrapper>
        // </Container>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const collectionId = process.env.NEXT_PUBLIC_STAKING_ID

//     const queryClient = new QueryClient()
//     const marketplaceService = new MarketplaceService()

//     await queryClient.prefetchQuery([QueryKeys.GET_COLLECTION, collectionId], () =>
//         marketplaceService.getCollection({ collectionId })
//     )

//     return { props: { collectionId, dehydratedState: dehydrate(queryClient) } }
// }

export default Stacking
