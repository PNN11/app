import { FC, ReactNode, useCallback } from 'react'

import Tabs from 'components/common/tabs'

interface TabButtonProps {
    name: string
    children: ReactNode
    callBack?: () => void
}

const NftTabButton: FC<TabButtonProps> = ({ name, children, callBack }) => {
    const className = useCallback(
        (active: boolean) =>
            `flex cursor-pointer items-center gap-2 rounded-2xl py-2 px-3 text-sm text-base-300 ${
                active ? 'bg-base-700 text-base-100' : ''
            }`,
        []
    )

    return (
        <Tabs.Button name={name} className={className} callBack={callBack}>
            {children}
        </Tabs.Button>
    )
}

export default NftTabButton
