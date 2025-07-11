import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { Web3Core } from 'common-types/web3core'

export const getNftChainId = (nft: IMarketplaceToken.TBodyResponse): Web3Core.EChainID => {
    return nft.currency.chaiId as Web3Core.EChainID
}
