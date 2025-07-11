/* eslint-disable no-await-in-loop */
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { BlockchainProvider, blockchains as provider } from './blockchainProvider'

import { Web3Core } from 'common-types/web3core'
import { AddressNotFoundException } from 'services/metamask/address-not-found.exceptions'
import { TxResult, WalletAdapter } from 'services/wallets/types'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { openLink } from 'utils/openLink'
import { wait } from 'utils/sitemap'
import { AsyncFunc } from 'utils/types/asyncFunc'

const waitForTxDelay = 1000

export class MetamaskAdapter implements WalletAdapter {
    providerId = Web3Core.EWalletProvider.METAMASK

    title = 'MetaMask'

    icon = '/wallets/metamask.svg'

    getAddress: AsyncFunc<void, string> = async () => {
        try {
            // @ts-ignore
            const walletAddress: string[] = await window?.ethereum.request({
                method: 'eth_requestAccounts',
            })

            return walletAddress[0]
        } catch (e: any) {
            if (e.code === 4001) {
                console.warn('Please connect to MetaMask.')

                return ''
            }
            console.error(e)

            return ''
        }
    }

    connect: AsyncFunc<Web3Core.EChainID, string> = async id => {
        const chain = provider[id]

        // @ts-ignore

        if (window?.ethereum?.isOkxWallet) {
            toast(
                `If you'd like to connect Metamask instead of Okx wallet, please go to Okx wallet > Settings > Preferences and disable "Set as default wallet". To applay changes pleas reload page.`
            )

            return
        }

        // @ts-ignore
        if (window?.ethereum?.isMetaMask) {
            try {
                const chainId = await this.getChainId()

                const isCorrectChain = chainId.toLowerCase() === chain.id.hex.toLocaleLowerCase()

                if (isCorrectChain) {
                    try {
                        // @ts-ignore
                        if (window.ethereum) {
                            // @ts-ignore
                            if (!window?.ethereum?._metamask) {
                                toast(
                                    "If you'd like to connect Metamask instead of Okx wallet, please press disconnect wallet button, than go to Okx wallet > More > DApps connection and disconnect wallet from site. Than reload page and try again."
                                )

                                return
                            }

                            // @ts-ignore
                            const accounts: string[] = await (window as any).ethereum.request({
                                method: 'eth_requestAccounts',
                            })

                            return accounts[0]
                        }
                        throw new AddressNotFoundException()
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
        } else {
            openLink(`https://metamask.app.link/dapp/arenavs.com`)

            return ''
        }
    }

    getProvider = (): JsonRpcProvider | null => {
        try {
            return new ethers.providers.Web3Provider((window as any).ethereum)
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
        try {
            const signer: JsonRpcSigner = await new ethers.providers.Web3Provider(
                (window as any).ethereum
            ).getSigner()

            return signer
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getChainId: AsyncFunc<void, Web3Core.EChainID> = async () => {
        // @ts-ignore
        const chainId: Web3Core.EChainID = await window?.ethereum?.request({
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
            // @ts-ignore
            await window?.ethereum?.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chain.id.hex }],
            })

            return true
        } catch (switchError: any) {
            if (!switchError || switchError?.code === 4001) return false

            console.warn(switchError)

            try {
                // @ts-ignore
                await window?.ethereum?.request({
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
        const provider = this.getProvider()

        try {
            const tx = await provider.getTransaction(txHash)

            if (!tx) {
                return { success: false, error: new Error('Missing transaction') }
            }

            const receipt = await tx.wait().catch(e => {
                console.warn(e)
            })

            if (!receipt) {
                let confirmations = 0

                while (!confirmations) {
                    await wait(waitForTxDelay)
                    const tx = await provider.getTransaction(txHash)

                    if (tx?.confirmations) confirmations = tx.confirmations
                }

                if (confirmations) return { success: true }

                return { success: false }
            }

            return { success: true }
        } catch (error) {
            toast(ethersContractExecutionError(error))

            return { success: false, error }
        }
    }

    getUnlocked: AsyncFunc<void, boolean> = async () => {
        const isUnlocked = await (window as any).ethereum?._metamask?.isUnlocked()

        return isUnlocked
    }

    getBalance: AsyncFunc<void, number> = async () => {
        const provider = this.getProvider()

        const address = await this.getAddress()

        const value = await provider.getBalance(address)

        return value ? +ethers.utils.formatEther(value) : 0
    }
}
