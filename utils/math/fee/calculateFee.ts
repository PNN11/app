export const defaultFee = 0

export const calculateFee = (price: number, fee = defaultFee): string => {
    if (!price || !fee) return '0'
    const feeAmount = (price * fee) / 100
    const decimals = feeAmount.toString().split('-')[1]

    if (!decimals) return feeAmount.toString()

    return feeAmount.toFixed(+decimals)
}
