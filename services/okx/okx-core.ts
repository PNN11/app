import web3 from 'web3'

import { AddressNotFoundException } from 'services/metamask/address-not-found.exceptions'

export class OkxCore {
    // @ts-ignore
    okxwallet?: typeof window.okxwallet | null

    web3?: web3 | null

    constructor() {
        if (typeof window !== 'undefined') {
            // const protocol = window?.location?.protocol === 'https:' ? 'wss' : 'ws'
            //
            // this.web3 = new web3(web3.givenProvider || `${protocol}://remotenode.com:8546`)

            this.okxwallet = (window as any).okxwallet
        }
    }

    public get isOkx(): boolean {
        return Boolean((window as any)?.okxwallet?.isOkxWallet)
    }

    public get isConnected(): boolean {
        return (window as any).okxwallet?.isConnected?.()
    }

    public async connectWallet(): Promise<string> {
        if ((window as any).okxwallet) {
            const accounts: string[] = await this.okxwallet.request({
                method: 'eth_requestAccounts',
            })

            return accounts[0]
        }
        throw new AddressNotFoundException()
    }
}
