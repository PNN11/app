export interface LoginParams {
    payload: string
    publicKey: string
    nonce: string
}

export interface RewardUserParams {
    id: string
    xp: number
    credits: number
    eventName: string
}
