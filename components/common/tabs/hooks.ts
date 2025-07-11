import { createContext, useContext } from 'react'

import { ITabsContext } from './types'

export const TabsContext = createContext<ITabsContext | null>(null)

export function useTabsContext(): ITabsContext {
    const context = useContext(TabsContext)

    if (!context) {
        throw new Error(`Tabs compound components cannot be rendered outside the Tabs component`)
    }

    return context
}
