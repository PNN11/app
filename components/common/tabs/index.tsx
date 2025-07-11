import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from './button'
import { TabsContext } from './hooks'
import { Tab } from './tab'
import { ITabsProps } from './types'

export function useEffectAfterMount(cb: () => void, dependencies: any[]): void {
    const justMounted = useRef(true)

    useEffect(() => {
        if (!justMounted.current) {
            return cb()
        }
        justMounted.current = false
    }, dependencies)
}

const Tabs = ({ defaultTab, value, children, onChange }: ITabsProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState(defaultTab ?? '')

    const _value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab, setActiveTab])

    useEffect(() => {
        onChange?.(activeTab)
    }, [activeTab])

    useEffect(() => {
        if (value) setActiveTab(value)
    }, [value])

    return <TabsContext.Provider value={_value}>{children}</TabsContext.Provider>
}

export default Tabs

Tabs.Button = Button
Tabs.Tab = Tab
