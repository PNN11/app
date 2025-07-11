import { MutableRefObject } from 'react'

export interface ITableContext {
    containerWidth: number
    tableWidth: number
    widthPercent: number
    leftPercent: number
    table: MutableRefObject<HTMLDivElement>
    container: MutableRefObject<HTMLDivElement>
}

export interface ITableProps {
    children: JSX.Element | React.ReactNode
    className?: string
}

export interface ITableScrollProps {}
