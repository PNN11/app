import { useState, useMemo, MutableRefObject, useRef, useLayoutEffect } from 'react'

import { TableContext } from './hooks'
import { Scroll } from './scroll'
import { ITableContext, ITableProps } from './types'

const Table = ({ children, className }: ITableProps): JSX.Element => {
    const containerRef = useRef() as MutableRefObject<HTMLDivElement>
    const tableRef = useRef() as MutableRefObject<HTMLDivElement>

    const [containerWidth, setContainerWidth] = useState(0)
    const [tableWidth, setTableWidth] = useState(0)
    const [leftPercent, setLeftPercent] = useState(0)

    const widthPercent = useMemo(
        () => Math.min(100, (containerWidth / tableWidth) * 100) || 0,
        [containerWidth, tableWidth]
    )

    const _value: ITableContext = useMemo(
        () => ({
            containerWidth,
            tableWidth,
            widthPercent,
            table: tableRef,
            container: containerRef,
            leftPercent,
        }),
        [
            containerWidth,
            tableWidth,
            widthPercent,
            leftPercent,
            tableRef.current,
            containerRef.current,
        ]
    )

    useLayoutEffect(() => {
        const observer = new ResizeObserver(entries => {
            entries.forEach(i => {
                if (i.target === containerRef.current) setContainerWidth(() => i.contentRect.width)
                if (i.target === tableRef.current) setTableWidth(() => i.contentRect.width)
            })
        })

        const table = tableRef.current
        const container = containerRef.current

        observer.observe(container)
        observer.observe(table)

        const handleScroll = (): void => {
            setLeftPercent(
                () =>
                    ((containerRef.current?.scrollLeft || 0) /
                        (containerRef.current?.scrollWidth || 1)) *
                        100 || 0
            )
        }

        containerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            observer.disconnect()
        }
    }, [])

    return (
        <TableContext.Provider value={_value}>
            <div className={`hidden-scroll overflow-x-auto ${className ?? ''}`} ref={containerRef}>
                <div className="min-w-max" ref={tableRef}>
                    {children}
                </div>
            </div>
        </TableContext.Provider>
    )
}

Table.Scroll = Scroll

export default Table
