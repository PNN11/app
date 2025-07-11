import BigNumber from 'bignumber.js'

const MAX_NUMBER = BigNumber(1e16)

export function expToEthersString(value: string | number): string {
    const str = `${value}`

    if (!Number.isFinite(parseFloat(str)) || Number.isNaN(parseFloat(str))) return '0'

    if (BigNumber(str).lt(MAX_NUMBER)) return str

    if (Number.isFinite(parseFloat(str)) && !str.includes('e')) return str

    const [, firstDigit, , significant, pow] = str.match(/(\d)(\.(\d+))?e[+-]?(\d+)/)

    return `${firstDigit}${significant ?? ''}`.padEnd(Number.parseInt(pow, 10) + 1, '0')
}
