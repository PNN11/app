import { FC, ReactNode } from 'react'

import Tooltip from 'components/common/ui/Tooltip'

interface ValueWithTooltipProps {
    value: ReactNode
    className?: string
}

const ValueWithTooltip: FC<ValueWithTooltipProps> = ({ value, className = '' }) => {
    return (
        <Tooltip text={`${value}`}>
            <div className={`truncate ${className}`}>{value}</div>
        </Tooltip>
    )
}

export default ValueWithTooltip
