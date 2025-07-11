import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'

import { Web3Core } from 'common-types/web3core'
import { BlockchainProvider } from 'services/wallets/blockchainProvider'

export type WalletAdapter = {
    connect: (chainId: Web3Core.EChainID) => Promise<string>
    getAddress: () => Promise<string>
    getChainId: () => Promise<Web3Core.EChainID>
    getProvider: () => JsonRpcProvider | null
    getSigner: () => Promise<JsonRpcSigner | null>
    postTx: (tx: any) => Promise<string>
    providerId: Web3Core.EWalletProvider
    icon: string
    title: string
    sign: (message: string) => Promise<string>
    switchChain: (chain: BlockchainProvider) => Promise<boolean>
    waitForTx: (txHash: string) => Promise<TxResult>
    getUnlocked: () => Promise<boolean>
    getBalance: () => Promise<number>
    setMnemonic?: (value: string) => void
    chainType?: Web3Core.ChainType
}

export type TxBase = { hash: string }

export type TxResult = { success: boolean; error?: Error }
