import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 100 })

export function toBigNumber(value: string | number, decimals: number): ethers.BigNumber {
    return ethers.BigNumber.from(
        BigNumber(value).multipliedBy(BigNumber(10).pow(decimals)).toString()
    )
}
