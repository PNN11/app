import { Wallet, ContractTransaction, Contract, Signer, providers, Event, BigNumber } from 'ethers'
import {
    ABI,
    ABIEntryBase,
    ABIEvent,
    ABIEventsToInputsMap,
    ABIFunction,
    ABIFunctionsToInputsMap,
    ABIInput,
    ABIReadFunctionsToOutpustMap,
} from '../types/abi'
import axios from 'axios'
import addMargin from './addMargin'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'
import { GasPriceResponse } from 'utils/types/transactions'

type EthersSigner = Wallet | Signer
export class EthersContract<T extends ABI> {
    private contract
    private eventDescriptors = new Map<string, ABIEvent>()
    private functionDescriptors = new Map<string, ABIFunction>()
    signer: EthersSigner

    constructor(abi: T, address: string, signer: EthersSigner) {
        this.contract = new Contract(address, abi, signer)
        this.signer = signer
        for (let entry of abi) {
            let e = entry as ABIEntryBase
            if (e.type === 'function') {
                this.functionDescriptors.set(e.name, entry as ABIFunction)
                continue
            }

            if (e.type === 'event') {
                this.eventDescriptors.set(e.name, entry as ABIEvent)
                continue
            }
        }
    }

    async method<M extends keyof ABIFunctionsToInputsMap<T>>(
        name: M,
        args: ABIFunctionsToInputsMap<T>[M]
    ): Promise<
        M extends keyof ABIReadFunctionsToOutpustMap<T>
            ? ABIReadFunctionsToOutpustMap<T>[M]
            : ContractTransaction
    > {
        const descriptor = this.functionDescriptors.get(name as string)

        const values = descriptor.inputs.map(({ name }) => args[name])

        return this.contract[name](...values)
    }

    on<M extends keyof ABIEventsToInputsMap<T>>(
        event: M,
        _listener: (args: ABIEventsToInputsMap<T>[M], event: Event) => void
    ) {
        const descriptor = this.eventDescriptors.get(event as string)

        const listener = (...args) => {
            const options = descriptor.inputs.reduce((prev, current, index) => {
                prev[(current as ABIInput).name] = args[index]

                return prev
            }, {}) as ABIEventsToInputsMap<T>[M]
            const event = args.at(-1)

            _listener(options, event)
        }

        this.contract.on(event as string, listener)

        return () => this.contract.off(event as string, listener)
    }

    async estimate<M extends keyof ABIFunctionsToInputsMap<T>>(
        method: M,
        args: ABIFunctionsToInputsMap<T>[M],
        options?: { toPrice: boolean }
    ) {
        const descriptor = this.functionDescriptors.get(method as string)

        const estimatedGas = await this.contract.estimateGas[method as string](
            ...descriptor.inputs.map(({ name }) => args[name])
        )

        if (!options?.toPrice) return estimatedGas as BigNumber

        const { data } = await axios.get<GasPriceResponse>(
            'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=gasoracle'
        )
        const price = toBigNumber(data.result.SafeGasPrice, 9)
        const fee = BigNumber.from(price).mul(estimatedGas)

        const withMargin = addMargin(fee)

        return withMargin
    }

    getEventArgs<M extends keyof ABIEventsToInputsMap<T>>(
        events: Event[],
        event: M
    ): ABIEventsToInputsMap<T>[M] | undefined {
        const _event = events.find(_event => {
            return _event.event === (event as string)
        })
        return _event.args as ABIEventsToInputsMap<T>[M]
    }

    // TODO: add
    // removeAllListeners
}
