export const getMetaMaskErrorMessage = (e: any): string => {
    if (e.code === 'CALL_EXCEPTION') return "Smart-contract doesn't exist in this network"

    if (e.code === 'NETWORK_ERROR') return 'Please reload the page'

    console.warn(e.data?.message ?? e.message)

    let message = e.message

    if (e.code === -32603 && e.data?.code === -32000) message = 'Insufficient funds'

    const match = message.match(/(.+:)(.+)$/)

    if (match && match[2])
        return match[2]
            .trim()
            .replaceAll(/user's/gi, 'your')
            .replaceAll(/user/gi, 'you')
            .replace(/./, (m: string) => m.toUpperCase())

    return message
}
