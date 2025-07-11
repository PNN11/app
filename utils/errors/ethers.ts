import { getMetaMaskErrorMessage } from './metamaskError'

export const ethersContractExecutionError = (e: any): string => {
    if (e?.code === 'ACTION_REJECTED') return 'You rejected transaction'
    if (e?.reason) return e?.reason
    if (e?.code === 'CALL_EXCEPTION') return 'CALL_EXCEPTION ERROR'

    return getMetaMaskErrorMessage(e)
}
