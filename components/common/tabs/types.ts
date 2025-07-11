import { FC } from 'react'

export interface ITabsContext {
    activeTab: string
    setActiveTab: (value: string) => void
}

export interface ITabsProps {
    defaultTab: string
    children: JSX.Element | JSX.Element[]
    value?: string
    onChange?: <T extends string>(current: T) => void
}

export interface ITabsComponentProps {
    Icon?: FC<{ isActive?: boolean }>
    callBack?: () => void
    name: string
    children: any
    className?: (active: boolean) => string
}
