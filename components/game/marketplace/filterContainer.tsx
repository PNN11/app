import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import useAddOrRemoveBodyOverflow from 'hooks/useAddOrRemoveBodyOverflow'
import useAddOrRemoveTransition from 'hooks/useAddOrRemoveTransition'

interface FilterContainerProps {
    children: ReactNode
    className?: string
    open: boolean
    setOpen: (value: boolean) => void
}

const FilterContainer: FC<FilterContainerProps> = ({ children, className = '', open, setOpen }) => {
    const ref = useRef<HTMLDivElement>(null)
    const childrenWrapper = useRef<HTMLDivElement>(null)
    const [scrollable, setScrollable] = useState(false)

    const { classes, handleRemoveOrAddTransition } = useAddOrRemoveTransition()

    useEffect(() => {
        const resizeHandler = (): void => {
            if (window.innerWidth > 1024) {
                setOpen(false)
            }

            handleRemoveOrAddTransition({ ref })
        }

        resizeHandler()

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (childrenWrapper.current.clientHeight > ref.current.clientHeight) {
                setScrollable(true)
            } else {
                setScrollable(false)
            }
        })

        resizeObserver.observe(ref.current)
        resizeObserver.observe(childrenWrapper.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    useAddOrRemoveBodyOverflow(open)

    return (
        <div className="lg:w-79">
            <div
                className={`filters-container fixed inset-x-0 bottom-16 z-10 max-h-[90vh] overflow-x-hidden overflow-y-scroll bg-bg
                     lg:sticky lg:z-auto ${open ? 'top-13' : 'top-full'} ${
                    scrollable ? 'filters-container-scrollable' : ''
                } ${className} ${classes}`}
                ref={ref}
            >
                <div
                    className="divide-y divide-base-700 border-base-700 lg:border-b"
                    ref={childrenWrapper}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default FilterContainer
