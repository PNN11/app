import { FC } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import TimeUnitBadge from 'components/common/ui/timeUnitBadge'
import { TTimeUnit, useTimers } from 'hooks/useTimers'

type PropsType = { nft: IMarketplaceToken.TBodyResponse }

export const Timer: FC<PropsType> = ({ nft }) => {
    let dataTimeStart = 0
    let dataTimeStop = 0

    if (nft.payload.type === 'MINT') {
        dataTimeStart = nft.payload.dataTimeStart
        dataTimeStop = nft.payload.dataTimeStop
    }

    const [timeLeft] = useTimers([dataTimeStart, dataTimeStop], true)

    return (
        <div className="grid grid-cols-4 grid-rows-1 gap-2">
            {Object.keys(timeLeft).map(timeUnit => (
                <TimeUnitBadge
                    key={timeUnit}
                    value={timeLeft[timeUnit as TTimeUnit]}
                    unit={timeUnit as TTimeUnit}
                />
            ))}
        </div>
    )
}
