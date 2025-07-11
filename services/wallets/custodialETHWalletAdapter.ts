/* eslint-disable no-await-in-loop */
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { BlockchainProvider, blockchains } from './blockchainProvider'

import { Web3Core } from 'common-types/web3core'
import { TxResult, WalletAdapter } from 'services/wallets/types'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { wait } from 'utils/sitemap'
import { AsyncFunc } from 'utils/types/asyncFunc'

const waitForTxDelay = 1000

export class CustodialETHWalletAdapter implements WalletAdapter {
    providerId = Web3Core.EWalletProvider.CUSTODIAL_ETH

    title = 'Custodial ETH wallet'

    icon = '/logop.svg'

    currentChainId = Web3Core.EChainID.TPOLYGON

    chainType: Web3Core.ChainType = 'ETH'

    protected _mnemonic: string

    setMnemonic(value: string): void {
        this._mnemonic = value
    }

    getAddress: AsyncFunc<void, string> = async () => {
        return (await this.getSigner()).getAddress()
    }

    connect: AsyncFunc<Web3Core.EChainID, string> = async id => {
        try {
            this.currentChainId = id

            const address = await this.getAddress()

            return address
        } catch (error) {
            console.warn(error)

            return ''
        }
    }

    getProvider = (): JsonRpcProvider | null => {
        const chain = blockchains[this.currentChainId]

        try {
            return new ethers.providers.JsonRpcProvider(chain.rpcUrls[0])
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getSigner: AsyncFunc<void, JsonRpcSigner | null> = async () => {
        try {
            const signer = ethers.Wallet.fromMnemonic(this._mnemonic).connect(
                this.getProvider()
            ) as unknown as JsonRpcSigner

            return signer
        } catch (e) {
            console.warn(e)

            return null
        }
    }

    getChainId: AsyncFunc<void, Web3Core.EChainID> = async () => {
        return this.currentChainId
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

    switchChain: AsyncFunc<BlockchainProvider, boolean> = async () => {
        return true
    }

    waitForTx: AsyncFunc<string, TxResult> = async txHash => {
        if (!txHash) {
            return { success: false, error: new Error('txHash required') }
        }
        const provider = this.getProvider()

        try {
            const receipt = await provider.waitForTransaction(txHash).catch(e => {
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
        return true
    }

    getBalance: AsyncFunc<void, number> = async () => {
        const provider = this.getProvider()

        const address = await this.getAddress()

        const value = await provider.getBalance(address)

        return value ? +ethers.utils.formatEther(value) : 0
    }
}
