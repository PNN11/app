import { MutableRefObject, PointerEventHandler, useCallback, useRef } from 'react'

import { useTableContext } from './hooks'

export const Scroll = (): JSX.Element => {
    const { containerWidth, widthPercent, leftPercent, table, container } = useTableContext()
    const thumbRef = useRef() as MutableRefObject<HTMLDivElement>

    const handlePointerMove: PointerEventHandler<HTMLDivElement> = useCallback((e): void => {
        const { movementX } = e

        const delta =
            (movementX / (container.current.getBoundingClientRect().width || 1)) *
            (table.current.getBoundingClientRect().width || 1)

        const newScrollLeft = Math.max(
            0,
            Math.min((container.current?.scrollLeft || 0) + delta, container.current?.scrollWidth)
        )

        container.current.scroll({ left: newScrollLeft })
    }, [])

    const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e): void => {
        thumbRef.current?.setPointerCapture(e.pointerId)

        // @ts-ignore
        thumbRef.current?.addEventListener('pointermove', handlePointerMove)
        thumbRef.current?.addEventListener('pointerup', () => {
            // @ts-ignore
            thumbRef.current?.removeEventListener('pointermove', handlePointerMove)

            if (thumbRef.current?.hasPointerCapture(e.pointerId))
                thumbRef.current?.releasePointerCapture(e.pointerId)
        })
    }

    if (widthPercent === 100) return null

    return (
        <div className="relative w-full touch-none" id="row">
            <div
                id="container"
                className="sticky left-0 bg-base-100/40"
                style={{ width: containerWidth }}
            >
                <div
                    ref={thumbRef}
                    onPointerDown={handlePointerDown}
                    id="thumb"
                    className=" h-0.5 bg-cta hover:opacity-80"
                    style={{ width: `${widthPercent}%`, marginLeft: `${leftPercent}%` }}
                />
            </div>
        </div>
    )
}
