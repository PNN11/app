import { useCallback, useState } from 'react'

type UnboxPromise<T extends any> = T extends Promise<infer U> ? U : T

export const useAsyncWrapper = (): {
    processing: boolean
    reset: () => void
    finished: boolean
    wrap: typeof wrap
} => {
    const [processing, setProcessing] = useState(false)
    const [finished, setFinished] = useState(false)

    const reset = useCallback(() => {
        setProcessing(false)
        setFinished(false)
    }, [])

    const wrap = useCallback(
        <T extends (...args: any) => any>(
                func: T,
                context: any = null
            ): ((
                ...args: Parameters<typeof func>
            ) => Promise<[data: UnboxPromise<ReturnType<typeof func>> | null, error: any]>) =>
            async (...args: Parameters<typeof func>) => {
                reset()

                try {
                    setProcessing(true)
                    const result = await func.call(context, ...args)

                    setProcessing(false)
                    setFinished(true)

                    return [result, null]
                } catch (e: any) {
                    setFinished(false)
                    setProcessing(false)

                    return [null, e]
                }
            },
        []
    )

    return { wrap, processing, finished, reset }
}
