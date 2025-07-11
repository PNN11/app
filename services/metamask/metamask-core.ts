import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import web3 from 'web3'

import { AddressNotFoundException } from 'services/metamask/address-not-found.exceptions'

export class MetamaskCore {
    // @ts-ignore
    ethereum?: typeof window.ethereum | null

    web3?: web3 | null

    constructor() {
        if (typeof window !== 'undefined') {
            const protocol = window?.location?.protocol === 'https:' ? 'wss' : 'ws'

            this.web3 = new web3((window as any).ethereum || `${protocol}://remotenode.com:8546`)

            // @ts-ignore
            this.ethereum = window.ethereum
        }
    }

    public get isMetamask(): boolean {
        return (window as any).ethereum?.isMetaMask
    }

    public async getActiveAddress(): Promise<string> {
        try {
            const accounts = await this?.web3?.eth?.getAccounts()

            if (accounts?.length && accounts?.length >= 1) {
                return accounts[0]
            }
        } catch (error) {
            throw new AddressNotFoundException()
        }
        throw new AddressNotFoundException()
    }

    public async connectWallet(): Promise<string> {
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            const accounts: string[] = await (window as any).ethereum.request({
                method: 'eth_requestAccounts',
            })

            return accounts[0]
        }
        throw new AddressNotFoundException()
    }

    public async getBalance(): Promise<string | undefined> {
        const walletAddress: any = await this.web3?.eth.requestAccounts()
        const balanceInWei: any = await this.web3?.eth.getBalance(walletAddress[0])

        return this.web3?.utils.fromWei(balanceInWei)
    }

    public async getSigner(): Promise<Web3Provider> {
        return new ethers.providers.Web3Provider((window as any).ethereum)
    }

    public async signByDefaultAddress(message: string): Promise<string> {
        const address = await this.getActiveAddress()

        return (await this?.web3?.eth?.personal?.sign(
            this.web3.utils.utf8ToHex(message),
            address,
            'test password'
        )) as string
    }
}
