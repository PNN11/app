import { MutableRefObject, useCallback, useRef } from 'react'

export function useAbortController() {
    const abortController = useRef() as MutableRefObject<AbortController>

    const abort = useRef(() => {})

    const createSignal = useCallback(() => {
        if (abortController.current) {
            abortController.current.abort()
        }

        abortController.current = new AbortController()
        abort.current = () => {
            abortController.current?.abort()
        }

        return abortController.current.signal
    }, [])

    return { createSignal, abort }
}
