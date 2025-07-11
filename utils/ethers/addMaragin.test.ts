import test from 'ava'
import { ethers } from 'ethers'
import addMargin from 'utils/ethers/addMargin'

test('addMargin should return the input value plus 20% of itself', t => {
    // Test case 1: Positive value
    const input1 = ethers.BigNumber.from(100)
    const expectedOutput1 = input1.add(input1.div(10).mul(2))
    t.deepEqual(addMargin(input1), expectedOutput1, 'Test case 1 failed')

    // Test case 2: Zero value
    const input2 = ethers.BigNumber.from(0)
    const expectedOutput2 = input2.add(input2.div(10).mul(2))
    t.deepEqual(addMargin(input2), expectedOutput2, 'Test case 2 failed')

    // Test case 3: Negative value
    const input3 = ethers.BigNumber.from(-50)
    const expectedOutput3 = input3.add(input3.div(10).mul(2))
    t.deepEqual(addMargin(input3), expectedOutput3, 'Test case 3 failed')
})
