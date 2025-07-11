import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

interface SuccessItemDescriptionProps {
    nft: IMarketplaceToken.TBodyResponse
    description: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuccessItemDescription: FC<SuccessItemDescriptionProps> = ({ nft, description }) => {
    return null

    // return (
    //     <div className="max-w-[26.6875rem] text-lg">
    //         <Link
    //             href={{
    //                 pathname: `/games/${nft.payload.game.id}`,
    //                 query: {
    //                     'filter[gameTab]': 'NFTs',
    //                     'filter[collections]': `${[nft.collection._id]}`,
    //                 },
    //             }}
    //         >
    //             <span className="text-link">{nft.payload.name}</span>
    //         </Link>{' '}
    //         from the{' '}
    //         <Link href={`/games/${nft.payload.game.id}`}>
    //             <span className="text-link">{nft.payload.game.title}</span>
    //         </Link>{' '}
    //         collection {description}
    //     </div>
    // )
}

export default SuccessItemDescription
