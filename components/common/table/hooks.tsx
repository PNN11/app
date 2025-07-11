import { createContext, useContext } from 'react'

import { ITableContext } from './types'

export const TableContext = createContext<ITableContext | null>(null)

export function useTableContext(): ITableContext {
    const context = useContext(TableContext)

    if (!context) {
        throw new Error(`Table compound components cannot be rendered outside the Table component`)
    }

    return context
}
