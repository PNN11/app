import { FC, useMemo } from 'react'

import { useTabsContext } from 'components/common/tabs/hooks'

type PropsType = {
    name: string
    Icon?: FC<{ isActive: boolean }>
}

export const TabButtonChildren: FC<PropsType> = ({ name, Icon }) => {
    const { activeTab } = useTabsContext()
    const isActive = useMemo(() => name === activeTab, [activeTab])

    return (
        <>
            {Icon ? <Icon isActive={isActive} /> : null}
            <p>{name}</p>
        </>
    )
}
