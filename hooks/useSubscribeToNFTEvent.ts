import { useEffect, useRef } from 'react'

import { NFTEventsMap } from 'services/events/types'
import useEventStore from 'store/useEventStore'

export function useSubscribeToNFTEvent<K extends keyof NFTEventsMap>(
    event: K,
    handler: (e: NFTEventsMap[K]) => void,
    cleanup = () => {}
): void {
    const _handler = useRef(handler)
    const _cleanup = useRef(cleanup)

    const subscribe = useEventStore(s => s.subscribe)
    const unsubsribe = useEventStore(s => s.unsubsribe)

    useEffect(() => {
        const wrap = (e): void => {
            _handler.current?.(e)
        }

        subscribe(event, wrap)

        return () => {
            unsubsribe(event, wrap)
            _cleanup.current?.()
        }
    }, [])
}
