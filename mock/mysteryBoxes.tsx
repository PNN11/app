import { Economics } from 'common-types/economics'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { Web3Core } from 'common-types/web3core'
import { RecursivePartial } from 'utils/types/helpers'

export const mysteryBoxesMock: RecursivePartial<IMarketplaceToken.TBodyResponse>[] = []

export const seriesMock = [
    { name: 'Edition blue', quantity: 9, probability: 12.8 },
    { name: 'Edition gold', quantity: 2, probability: 2.4 },
    { name: 'Edition green', quantity: 23, probability: 25.2 },
    { name: 'Edition purple', quantity: 5, probability: 4.3 },
]
