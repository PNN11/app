import test from 'ava'
import BigNumber from 'bignumber.js'
import { expToEthersString } from 'utils/math/ethers/expToString'

test('expToEthersString should convert a number or string to a valid Ether string representation', t => {
    // Test case 1: Regular number within range
    const input1 = 12345
    const expectedOutput1 = '12345'
    t.deepEqual(expToEthersString(input1), expectedOutput1, 'Test case 1 failed')

    // Test case 2: Regular string within range
    const input2 = '6789.9876'
    const expectedOutput2 = '6789.9876'
    t.deepEqual(expToEthersString(input2), expectedOutput2, 'Test case 2 failed')

    // Test case 3: Large number under the maximum range
    const input3 = '1.23e+10'
    const expectedOutput3 = '1.23e+10'
    t.deepEqual(expToEthersString(input3), expectedOutput3, 'Test case 3 failed')

    // Test case 4: Large number exceeding the maximum range
    const input4 = '9.99e+17'
    const expectedOutput4 = '999000000000000000' // Value clipped to MAX_NUMBER (1e16)
    t.deepEqual(expToEthersString(input4), expectedOutput4, 'Test case 4 failed')

    // Test case 3: Large number exceeding the maximum range without sign of power
    const input5 = '1.23e23'
    const expectedOutput5 = '123000000000000000000000'
    t.deepEqual(expToEthersString(input5), expectedOutput5, 'Test case 5 failed')

    // Test case 5: Invalid input (NaN)
    const input6 = 'invalid_number'
    const expectedOutput6 = '0'
    t.deepEqual(expToEthersString(input6), expectedOutput6, 'Test case 6 failed')
})
