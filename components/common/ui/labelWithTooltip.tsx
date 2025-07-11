import { FC } from 'react'

import Tooltip from 'components/common/ui/Tooltip'

type PropsType = {
    label: string
    infoText: string
    labelClassName?: string
}

const LabelWithTooltip: FC<PropsType> = ({ infoText, label, labelClassName }) => {
    return (
        <div className="flex items-center gap-1">
            <span className={labelClassName || ''}>{label}</span>
            <Tooltip text={infoText} />
        </div>
    )
}

export default LabelWithTooltip
