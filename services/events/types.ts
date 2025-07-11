import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

export type EventOptions = Partial<{
    once: true
}>

export type NFTEvent = { target: IMarketplaceToken.TBodyResponse }
export interface BaseNFTEvents {
    buy: NFTEvent
    sell: NFTEvent
    expired: NFTEvent
    cancel: NFTEvent
    cancelBid: NFTEvent
    lowerprice: NFTEvent
    bid: NFTEvent
    sellstarted: NFTEvent
    sellended: NFTEvent
    statuschanged: NFTEvent
    claim: NFTEvent
    'already-claimed': NFTEvent
    open: NFTEvent
    lock: NFTEvent
    unlock: NFTEvent
}

export type IndexedNFTEvent = `${keyof BaseNFTEvents}-${string}`
export interface IndexedNFTEvents extends Record<IndexedNFTEvent, NFTEvent> {}

export type NFTEventsMap = BaseNFTEvents & IndexedNFTEvents
