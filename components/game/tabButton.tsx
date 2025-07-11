import { FC, ReactNode, useCallback } from 'react'

import Tabs from 'components/common/tabs'

interface TabButtonProps {
    name: string
    children: ReactNode
}

const TabButton: FC<TabButtonProps> = ({ name, children }) => {
    const className = useCallback(
        (active: boolean) =>
            `cursor-pointer grow sm:grow-0 pb-2 text-sm ${
                active ? 'border-b border-b-white text-base-100' : 'text-base-300'
            }`,
        []
    )

    return (
        <Tabs.Button name={name} className={className}>
            {children}
        </Tabs.Button>
    )
}

export default TabButton
