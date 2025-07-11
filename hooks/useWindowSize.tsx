import { useLayoutEffect, useState } from 'react'

type Size = {
    width: number
    height: number
}

export const useWindowSize = (): Size => {
    const [windowSize, setWindowSize] = useState<Size>({
        width: 0,
        height: 0,
    })

    useLayoutEffect(() => {
        const handleResize = (): void => {
            const newWindowSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            }

            setWindowSize(newWindowSize)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
