export interface IMetamaskError {
    reason: string
    code: string
    action: string
    transaction: {
        data: string
        to: string
        from: string
    }
}
