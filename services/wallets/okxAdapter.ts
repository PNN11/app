import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { BlockchainProvider, blockchains as provider } from './blockchainProvider'

import { Web3Core } from 'common-types/web3core'
import { AddressNotFoundException } from 'services/metamask/address-not-found.exceptions'
import { TxResult, WalletAdapter } from 'services/wallets/types'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { openLink } from 'utils/openLink'
import { AsyncFunc } from 'utils/types/asyncFunc'

export class OkxAdapter implements WalletAdapter {
    providerId = Web3Core.EWalletProvider.OKX

    title = 'OKX Wallet'

    icon = '/wallets/okx.svg'

    getAddress: AsyncFunc<void, string> = async () => {
        try {
            if ((window as any).okxwallet) {
                // @ts-ignore
                const accounts: string[] = await window.okxwallet.request({
                    method: 'eth_requestAccounts',
                })

                return accounts[0]
            }
            throw new AddressNotFoundException()
        } catch (e: any) {
            if (e.code === -32002) {
                toast(`Please open your wallet and confirm connection.`)
            }
            console.error(e)

            return ''
        }
    }

    connect: AsyncFunc<Web3Core.EChainID, string> = async id => {
        const chain = provider[id]

        if ((window as any)?.okxwallet?.isOkxWallet) {
            try {
                const chainId = await this.getChainId()

                const isCorrectChain = chainId.toLowerCase() === chain.id.hex.toLowerCase()

                if (isCorrectChain) {
                    try {
                        return await this.getAddress()
                    } catch (e) {
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
        } else {
            openLink(`https://www.okx.com/ru/download/`)

            return ''
        }
    }

    getProvider = (): JsonRpcProvider | null => {
        try {
            return new ethers.providers.Web3Provider((window as any).okxwallet)
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
        try {
            const signer: JsonRpcSigner = await new ethers.providers.Web3Provider(
                (window as any).okxwallet
            ).getSigner()

            return signer
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getChainId: AsyncFunc<void, Web3Core.EChainID> = async () => {
        // @ts-ignore
        const chainId: Web3Core.EChainID = await window.okxwallet?.requestChainId()

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
            // @ts-ignore
            await window.okxwallet?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain.id.hex }],
            })

            return true
        } catch (switchError: any) {
            if (!switchError || switchError?.code === 4001) return false

            console.warn(switchError)

            try {
                // @ts-ignore
                await window.okxwallet?.request({
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
        if (!txHash) return
        try {
            const tx = await this.getProvider().getTransaction(txHash)

            await tx.wait()

            return { success: true }
        } catch (error) {
            toast(ethersContractExecutionError(error))

            return { success: false }
        }
    }

    getUnlocked: AsyncFunc<void, boolean> = async () => {
        const isUnlocked = await (window as any).okxwallet?.isUnlock()

        return isUnlocked
    }

    getBalance: AsyncFunc<void, number> = async () => {
        const provider = this.getProvider()

        const address = await this.getAddress()

        const value = await provider.getBalance(address)

        return value ? +ethers.utils.formatEther(value) : 0
    }
}
