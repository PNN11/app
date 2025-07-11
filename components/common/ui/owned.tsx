import { FC } from 'react'

import { useHydrated } from 'hooks/useHydrated'
import useUserStore from 'store/useUserStore'
import { maskInfo } from 'utils/mask-info'

type PropsType = {
    ownerId: string
}
const OwnedAddress: FC<PropsType> = ({ ownerId }) => {
    const userId = useUserStore(state => state.userId)
    const isHydrated = useHydrated()

    return (
        <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <div className="text-base-300">Owned by</div>
            <div className="text-link">
                {isHydrated && userId === ownerId ? 'you' : maskInfo(ownerId)}
            </div>
        </div>
    )
}

export default OwnedAddress
