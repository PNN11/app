import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useDragNDrop = (onDrop: (e: DragEvent) => void) => {
    // useState
    const [isHover, setIsHover] = useState<boolean>(false)

    const ref = useRef() as MutableRefObject<HTMLDivElement>

    const handleDrag = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.type === 'dragover') {
            setIsHover(true)

            return
        }
        if (e.type === 'dragleave') {
            setIsHover(false)

            return
        }
        if (e.type === 'dragenter') {
            setIsHover(true)
        }
    }, [])

    const handleDrop = useCallback(
        (e: DragEvent) => {
            handleDrag(e)
            setIsHover(false)
            onDrop(e)
        },
        [onDrop]
    )

    useEffect(() => {
        if (!ref.current) return

        ref.current?.addEventListener('dragstart', handleDrag)
        ref.current?.addEventListener('dragover', handleDrag)
        ref.current?.addEventListener('dragenter', handleDrag)
        ref.current?.addEventListener('dragleave', handleDrag)
        ref.current?.addEventListener('drop', handleDrop)

        return () => {
            ref.current?.removeEventListener('dragstart', handleDrag)
            ref.current?.removeEventListener('dragover', handleDrag)
            ref.current?.removeEventListener('dragenter', handleDrag)
            ref.current?.removeEventListener('dragleave', handleDrag)
            ref.current?.removeEventListener('drop', handleDrop)
        }
    }, [])

    return {
        ref,
        isHover,
    }
}
