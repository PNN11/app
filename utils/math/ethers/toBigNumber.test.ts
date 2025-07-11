import test from 'ava'
import { ethers } from 'ethers'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'

test('toBigNumber should convert a number or string to ethers.BigNumber with the correct precision', t => {
    // Test case 1: Regular number with decimals
    const input1 = 1234.567
    const decimals1 = 3
    const expectedOutput1 = ethers.BigNumber.from('1234567')
    t.deepEqual(toBigNumber(input1, decimals1), expectedOutput1, 'Test case 1 failed')

    // Test case 2: Regular string with decimals
    const input2 = '9876.54321'
    const decimals2 = 5
    const expectedOutput2 = ethers.BigNumber.from('987654321')
    t.deepEqual(toBigNumber(input2, decimals2), expectedOutput2, 'Test case 2 failed')

    // Test case 3: Number with 0 decimals
    const input3 = 789
    const decimals3 = 0
    const expectedOutput3 = ethers.BigNumber.from('789')
    t.deepEqual(toBigNumber(input3, decimals3), expectedOutput3, 'Test case 3 failed')

    // Test case 4: Large number with a large number of decimals
    const input4 = '1.23456789e15'
    const decimals4 = 18
    const expectedOutput4 = ethers.BigNumber.from('1234567890000000000000000000000000')
    t.deepEqual(toBigNumber(input4, decimals4), expectedOutput4, 'Test case 4 failed')
})
