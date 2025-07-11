import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

import { LoginParams, RewardUserParams } from './types'

import { SESAME_PUBLIC_KEY } from 'utils/constants/sesame'

class SesameService {
    protected publicKey: string

    constructor() {
        this.publicKey = SESAME_PUBLIC_KEY
    }

    isSesameWidgetReady(): boolean {
        return typeof window !== 'undefined' && 'Sesame' in window
    }

    open(): void {
        if (!this.isSesameWidgetReady()) return
        window.Sesame.open()
    }

    close(): void {
        if (!this.isSesameWidgetReady()) return
        window.Sesame.close()
    }

    hide(): void {
        if (!this.isSesameWidgetReady()) return
        window.Sesame.hide()
    }

    show(): void {
        if (!this.isSesameWidgetReady()) return
        window.Sesame.show()
    }

    protected _encryptLoginParams(msgParams: string): LoginParams {
        const ephemeralKeyPair = nacl.box.keyPair()
        const pubKeyUInt8Array = naclUtil.decodeBase64(this.publicKey)
        const msgParamsUInt8Array = naclUtil.decodeUTF8(msgParams)
        const nonce = nacl.randomBytes(nacl.box.nonceLength)
        const encryptedMessage = nacl.box(
            msgParamsUInt8Array,
            nonce,
            pubKeyUInt8Array,
            ephemeralKeyPair.secretKey
        )

        return {
            payload: naclUtil.encodeBase64(encryptedMessage),
            publicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
            nonce: naclUtil.encodeBase64(nonce),
        }
    }

    login(walletAddress: string): void {
        const message = {
            walletAddress,
            nonce: `login message for ${walletAddress}`,
        }

        const authData = this._encryptLoginParams(JSON.stringify(message))

        if (!this.isSesameWidgetReady()) return

        window.Sesame.login(authData)
    }

    rewardUser(params: RewardUserParams): void {
        if (!this.isSesameWidgetReady()) return
        window.Sesame.rewardUser(params)
    }

    async isLoggedIn(): Promise<boolean> {
        if (!this.isSesameWidgetReady()) return

        return window.Sesame.isLoggedIn()
    }
}

const sesameService = new SesameService()

export default sesameService
