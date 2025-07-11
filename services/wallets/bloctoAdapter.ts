import BloctoSDK from '@blocto/sdk'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { BlockchainProvider, blockchains as provider } from './blockchainProvider'

import { Web3Core } from 'common-types/web3core'
import { TxResult, WalletAdapter } from 'services/wallets/types'
import { prod } from 'utils/environment'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { AsyncFunc } from 'utils/types/asyncFunc'

const bloctoAppId = prod.value('ec034753-8270-4f8a-a500-c45e0a4374fd')

export class BloctoAdapter implements WalletAdapter {
    providerId = Web3Core.EWalletProvider.BLOCTO

    title = 'Blocto'

    icon = '/wallets/blocto.png'

    sdk: BloctoSDK

    constructor() {
        const defProvider = prod.value(provider['0x89'], provider['0x13881'])

        this.sdk = new BloctoSDK({
            ethereum: {
                chainId: defProvider.id.hex,
                rpc: defProvider.rpcUrls[0],
            },
            appId: bloctoAppId,
        })
    }

    getAddress: AsyncFunc<void, string> = async () => {
        try {
            const walletAddress: string[] = await this.sdk.ethereum.request({
                method: 'eth_requestAccounts',
            })

            return walletAddress[0]
        } catch (e: any) {
            if (e.code === 4001) {
                console.warn('Please connect to blocto.')

                return ''
            }
            console.error(e)

            return ''
        }
    }

    connect: AsyncFunc<Web3Core.EChainID, string> = async id => {
        const chain = provider[id]

        // TODO: how to check if blocto installed?
        // @ts-ignore
        // if (window?.ethereum?.isMetaMask) {
        try {
            const chainId = await this.getChainId()

            const isCorrectChain = chainId.toLowerCase() === chain.id.hex.toLocaleLowerCase()

            if (isCorrectChain) {
                try {
                    const accounts: string[] = await this.sdk.ethereum.request({
                        method: 'eth_requestAccounts',
                    })

                    return accounts[0]
                } catch (e) {
                    if (e.code === -32002) {
                        toast(`Please open your wallet and confirm connection.`)
                    }
                    console.warn(e)

                    return ''
                }
            }

            const isSwitchSucceed = await this.switchChain(chain)

            if (isSwitchSucceed) return this.connect(id)

            return ''
        } catch (e) {
            console.warn('[SWITCH NETWORK]', e)

            return ''
        }
        // } else {
        //     openLink(`https://blocto.app/link?url=${encodeURI(`https://arenavs.com/`)}`)

        //     return ''
        // }
    }

    getProvider = (): JsonRpcProvider | null => {
        try {
            return new ethers.providers.Web3Provider(this.sdk.ethereum)
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
        try {
            const signer: JsonRpcSigner = await this.getProvider().getSigner()

            return signer
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getChainId: AsyncFunc<void, Web3Core.EChainID> = async () => {
        const chainId: Web3Core.EChainID = await this.sdk.ethereum.request({
            method: 'eth_chainId',
        })

        return chainId
    }

    sign: AsyncFunc<string, string> = async message => {
        try {
            const signer = await this.getSigner()

            if (signer) {
                return await signer.signMessage(message)
            }
            console.warn('Failed to get signature')

            return ''
        } catch (e) {
            console.warn('Failed to get signature')

            return ''
        }
    }

    postTx: AsyncFunc<any, string> = async () => {
        return ''
    }

    switchChain: AsyncFunc<BlockchainProvider, boolean> = async (chain: BlockchainProvider) => {
        try {
            await this.sdk.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain.id.hex }],
            })

            return true
        } catch (switchError: any) {
            if (!switchError || switchError?.code === 4001) return false

            console.warn(switchError)

            try {
                // @ts-ignore
                await this.sdk.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chain.id.hex,
                            chainName: chain.name,
                            nativeCurrency: {
                                name: chain.nativeCurrency.name,
                                symbol: chain.nativeCurrency.symbol,
                                decimals: chain.nativeCurrency.decimals,
                            },
                            rpcUrls: chain.rpcUrls,
                            iconUrls: [chain.img],
                        },
                    ],
                })

                return true
            } catch (addError) {
                console.warn(addError)

                return false
            }
        }
    }

    waitForTx: AsyncFunc<string, TxResult> = async txHash => {
        if (!txHash) {
            return { success: false, error: new Error('txHash required') }
        }
        try {
            const tx = await this.getProvider().getTransaction(txHash)

            await tx.wait()

            return { success: true }
        } catch (error) {
            toast(ethersContractExecutionError(error))

            return { success: false, error }
        }
    }

    getUnlocked: AsyncFunc<void, boolean> = async () => true

    getBalance: AsyncFunc<void, number> = async () => {
        const provider = this.getProvider()

        const address = await this.getAddress()

        const value = await provider.getBalance(address)

        return value ? +ethers.utils.formatEther(value) : 0
    }
}
