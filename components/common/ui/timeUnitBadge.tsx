import { FC } from 'react'

import { TTimeUnit } from 'hooks/useTimers'
import { useWindowSize } from 'hooks/useWindowSize'
import { fillStringIn } from 'utils/timer/fillStringIn'

interface ITimeUnitBadgeProps {
    value: number
    unit: TTimeUnit
}
const dict: Record<TTimeUnit, { long: string; short: string }> = {
    days: { long: 'days', short: 'd' },
    hours: { long: 'hours', short: 'hr' },
    minutes: { long: 'minutes', short: 'min' },
    seconds: { long: 'seconds', short: 'sec' },
}

const TimeUnitBadge: FC<ITimeUnitBadgeProps> = ({ unit, value }) => {
    const { width } = useWindowSize()
    const fillStringIn1: string = fillStringIn(value, 2, '0')

    return (
        <div className="flex h-full flex-col items-center justify-center rounded bg-base-650 py-1 text-center md:py-2">
            <p>{fillStringIn1}</p>
            {/* <p>10</p> */}
            <p className="text-xs capitalize text-base-300">
                {width > 768 ? dict[unit].long : dict[unit].short}
            </p>
        </div>
    )
}

export default TimeUnitBadge
