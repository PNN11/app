import { useQuery, UseQueryResult } from 'react-query'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import useServiceStore from 'store/service'

const useCollectionQuery = (
    collectionId: string
): UseQueryResult<IMarketplaceCollection.TResponseBody, unknown> => {
    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const collectionQuery = useQuery(
        ['get-game-collection', collectionId],
        () => marketplaceService.getCollection({ collectionId }),
        { enabled: !!collectionId }
    )

    return collectionQuery
}

export default useCollectionQuery
