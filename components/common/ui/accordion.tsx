import { FC, MutableRefObject, useCallback, useEffect, useRef } from 'react'

import useResizeObserver from 'use-resize-observer'

interface AccordionProps {
    open: boolean
    children: any
    className?: string
}

const Accordion: FC<AccordionProps> = ({ open, children, className = '' }) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>

    const onResize = useCallback(
        (size: { width: number | undefined; height: number | undefined }) => {
            if (ref.current) {
                ref.current.style.setProperty('--h', `${size.height}px`)
            }
        },
        []
    )

    const { ref: child } = useResizeObserver({ onResize })

    useEffect(() => {
        const removeOverflow = (e: AnimationEvent): void => {
            if (e.animationName === 'open') ref.current?.style.setProperty('overflow', 'visible')
        }
        const addOverflow = (e: AnimationEvent): void => {
            if (e.animationName === 'colaps') ref.current?.style.removeProperty('overflow')
        }

        ref.current?.addEventListener('animationend', removeOverflow)
        ref.current?.addEventListener('animationstart', addOverflow)

        return () => {
            ref.current?.removeEventListener('animationend', removeOverflow)
            ref.current?.removeEventListener('animationstart', addOverflow)
        }
    }, [])

    useEffect(() => {
        if (open) {
            ref.current.setAttribute('closing', '')
        }

        return () => {}
    }, [open])

    return (
        <div {...(className ? { className } : {})}>
            <div ref={ref} {...{ open }} className="accordion">
                <div ref={child} className="flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Accordion
