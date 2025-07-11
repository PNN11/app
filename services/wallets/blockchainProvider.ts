import { mainnetChainConfigs, testnetChainConfigs } from '@arenavs/blockchain-configs'

import { Web3Core } from 'common-types/web3core'
import { prod } from 'utils/environment'

export type BlockchainProvider = {
    name: string
    id: {
        hex: Web3Core.EChainID
        number: number
    }
    nativeCurrency: {
        name: string
        symbol: string
        decimals: number
    }
    rpcUrls: string[]
    img?: string
    fcdURL?: string
    lcdURL?: string
    chainType: Web3Core.ChainType
}

export type TChainIds = `${Web3Core.EChainID}`

const chainImages: Record<string, string> = {
    '0x13881': '/images/matic-icon.png',
    '0x89': '/images/matic-icon.png',
    '0x3a14269b': '/images/skale-icon.png',
}

export const testnetBlockchains: Record<TChainIds, BlockchainProvider> = testnetChainConfigs.reduce(
    (acc, curr) => {
        return {
            ...acc,
            [curr.eth.id.hex]: {
                name: curr.chainName,
                id: curr.eth.id,
                nativeCurrency: curr.eth.nativeCurrency,
                rpcUrls: [curr.eth.providerDsn],
                chainType: curr.chainType,
                img: chainImages[curr.eth.id.hex],
            },
        }
    },
    {} as Record<TChainIds, BlockchainProvider>
)

export const mainnetBlockchains: Record<TChainIds, BlockchainProvider> = mainnetChainConfigs.reduce(
    (acc, curr) => {
        return {
            ...acc,
            [curr.eth.id.hex]: {
                name: curr.chainName,
                id: curr.eth.id,
                nativeCurrency: curr.eth.nativeCurrency,
                rpcUrls: [curr.eth.providerDsn],
                chainType: curr.chainType,
                img: chainImages[curr.eth.id.hex],
            },
        }
    },
    {} as Record<TChainIds, BlockchainProvider>
)
export const blockchains: Record<TChainIds, BlockchainProvider> = prod.value(
    mainnetBlockchains,
    testnetBlockchains
)
