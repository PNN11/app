import { ethers } from 'ethers'

export type ABI = readonly unknown[]
type ABITypeMap = {
    'tuple[]': unknown
    address: string
    uint2: ethers.BigNumber
    uint4: ethers.BigNumber
    uint8: ethers.BigNumber
    uint16: ethers.BigNumber
    uint32: ethers.BigNumber
    uint64: ethers.BigNumber
    uint128: ethers.BigNumber
    uint256: ethers.BigNumber
    string: string
    bool: boolean
    bytes1: string
    bytes2: string
    bytes3: string
    bytes4: string
    bytes5: string
    bytes6: string
    bytes7: string
    bytes8: string
    bytes9: string
    bytes10: string
    bytes11: string
    bytes12: string
    bytes13: string
    bytes14: string
    bytes15: string
    bytes16: string
    bytes17: string
    bytes18: string
    bytes19: string
    bytes20: string
    bytes21: string
    bytes22: string
    bytes23: string
    bytes24: string
    bytes25: string
    bytes26: string
    bytes27: string
    bytes28: string
    bytes29: string
    bytes30: string
    bytes31: string
    bytes32: string
    bytes: string
}

export type ABIInput = {
    readonly internalType: string
    readonly name: string
    readonly components?: readonly unknown[]
    readonly type: keyof ABITypeMap
}
type ABIItem = 'function' | 'event'
type StateMutability = 'payable' | 'nonpayable' | 'view'

export type ABIEntryBase = {
    readonly type: string
    readonly name?: string
}

export type ABIFunction = ABIEntryBase & {
    readonly type: 'function'
    readonly inputs: readonly unknown[]
    readonly outputs?: readonly unknown[]
    readonly stateMutability: StateMutability
}

export type ABIReadFunction = ABIFunction & {
    stateMutability: 'view'
}

export type ABIEvent = ABIEntryBase & {
    readonly type: 'event'
    readonly inputs: readonly unknown[]
}

type InputsToOptions<T extends readonly unknown[]> = T extends readonly [
    infer Head extends ABIInput,
    ...infer Tail
]
    ? Head['type'] extends 'tuple[]'
        ? {
              [K in Head['name']]: InputsToOptions<Head['components']>[]
          } & InputsToOptions<Tail>
        : {
              [K in Head['name']]: ABITypeMap[Head['type']]
          } & InputsToOptions<Tail>
    : {}

type FirstToType<T extends readonly unknown[]> = T extends readonly [
    infer Head extends ABIInput,
    ...infer Tail
]
    ? Head['type'] extends 'tuple[]'
        ? FirstToType<Head['components']>[]
        : ABITypeMap[Head['type']]
    : {}

export type ABIToNames<T extends ABI, K extends ABIItem> = T extends readonly [
    infer Head extends ABIEntryBase,
    ...infer Tail
]
    ? Head['type'] extends K
        ? Head['name'] | ABIToNames<Tail, K>
        : ABIToNames<Tail, K>
    : never

export type ABIFunctionsNames<T extends ABI> = ABIToNames<T, 'function'>
export type ABIEventNames<T extends ABI> = ABIToNames<T, 'event'>
export type ABINames<T extends ABI> = ABIToNames<T, 'event' | 'function'>

export type ABIEntryToInputsMap<
    T extends ABI,
    E extends ABIFunction | ABIEvent
> = T extends readonly [infer Head extends ABIEntryBase, ...infer Tail]
    ? Head extends E
        ? {
              [K in Head['name']]: InputsToOptions<Head['inputs']>
          } & ABIEntryToInputsMap<Tail, E>
        : ABIEntryToInputsMap<Tail, E>
    : {}

export type ABIReadFunctionsToOutpustMap<T extends ABI> = T extends readonly [
    infer Head extends ABIEntryBase,
    ...infer Tail
]
    ? Head extends ABIReadFunction
        ? {
              [K in Head['name']]: FirstToType<Head['outputs']>
          } & ABIReadFunctionsToOutpustMap<Tail>
        : ABIReadFunctionsToOutpustMap<Tail>
    : {}

export type ABIFunctionsToInputsMap<T extends ABI> = ABIEntryToInputsMap<T, ABIFunction>
export type ABIEventsToInputsMap<T extends ABI> = ABIEntryToInputsMap<T, ABIEvent>

export type ABIFunctionInputs<
    T extends ABI,
    K extends ABIFunctionsNames<T>
> = ABIFunctionsToInputsMap<T>[K]
export type ABIEventInputs<T extends ABI, K extends ABIEventNames<T>> = ABIEventsToInputsMap<T>[K]
