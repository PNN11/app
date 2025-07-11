import { useCallback, useMemo } from 'react'

import { useTabsContext } from './hooks'
import { ITabsComponentProps } from './types'

export const Button = ({
    name,
    className,
    children,
    callBack,
}: ITabsComponentProps): JSX.Element => {
    const { activeTab, setActiveTab } = useTabsContext()

    const isActive = useMemo(() => name === activeTab, [activeTab])

    const setActive = useCallback(() => setActiveTab(name), [])

    return (
        <button
            type="button"
            onClick={() => {
                setActive()
                callBack?.()
            }}
            className={`${className?.call(undefined, isActive)} group hover:text-base-100`}
        >
            {children}
        </button>
    )
}
