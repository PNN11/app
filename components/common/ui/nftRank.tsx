import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

interface INftRankProps {
    nft: IMarketplaceToken.TBodyResponse
    className?: string
}

const NftRank = ({ nft, className }: INftRankProps): JSX.Element => {
    return <p className={`text-blue-light ${className}`}>Rank {nft.rank}</p>
}

export default NftRank
