import { useLayoutEffect, useState } from 'react'

export function useHydrated(): boolean {
    const [isHydrated, setIsHydrated] = useState(false)

    // Wait till NextJS rehydration completes
    useLayoutEffect(() => {
        setIsHydrated(true)
    }, [])

    return isHydrated
}
