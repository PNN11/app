import { useEffect, useState } from 'react'

import { timeout } from 'utils/timer/timeout'

export const useTimer = (
    defaultTimestamp?: number
): {
    timer: number
    setTimestamp: (value: ((prevState: number) => number) | number) => void
} => {
    const [timestamp, setTimestamp] = useState(defaultTimestamp || Date.now())
    const [timer, setTimer] = useState(0)
    const [isTimeout, setIsTimeout] = useState<NodeJS.Timeout>(null as unknown as NodeJS.Timeout)

    useEffect(() => {
        if (isTimeout) clearTimeout(isTimeout)
        setIsTimeout(timeout(timestamp, setTimer, setIsTimeout))

        return () => {
            clearTimeout(isTimeout)
        }
    }, [timer, timestamp])

    return { timer, setTimestamp }
}
