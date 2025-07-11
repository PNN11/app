import EventEmitter from 'eventemitter3'
import create from 'zustand'

import { BaseNFTEvents, EventOptions, NFTEventsMap } from 'services/events/types'

interface EventStore {
    nft: EventEmitter
    emit<K extends keyof NFTEventsMap>(event: K, evArg: NFTEventsMap[K]): void
    subscribe<K extends keyof NFTEventsMap>(
        event: K,
        handler: (e: NFTEventsMap[K]) => void,
        options?: EventOptions
    ): void
    unsubsribe<K extends keyof NFTEventsMap>(event: K, handler: (e: NFTEventsMap[K]) => void): void
}

const baseEventsMap: { [key in keyof BaseNFTEvents]: true } = {
    bid: true,
    buy: true,
    cancel: true,
    expired: true,
    lowerprice: true,
    sell: true,
    sellended: true,
    sellstarted: true,
    statuschanged: true,
    claim: true,
    'already-claimed': true,
    cancelBid: true,
    open: true,
    lock: true,
    unlock: true,
}

const useEventStore = create<EventStore>((set, get) => {
    return {
        nft: new EventEmitter(),
        emit(event, evArg) {
            const emitter = get().nft

            const match = event.match(/.+(?=-)/)

            if (baseEventsMap[match?.[0]]) emitter.emit(match[0], evArg)

            emitter.emit(event, evArg)
        },
        subscribe(event, handler, options) {
            if (event.match(/^[^-]+-$/)) throw new Error(`Passed ${event} as event name`)

            const emitter = get().nft

            if (options?.once) {
                emitter.once(event, handler)

                return
            }
            emitter.on(event, handler)
        },
        unsubsribe(event, handler) {
            get().nft.off(event, handler)
        },
    }
})

export default useEventStore
