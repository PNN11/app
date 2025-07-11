import { FC } from 'react'

import Skeleton from 'components/common/skeleton'

interface ChartItemInfoProps {
    title: string
    value: string | number
    color: string
    classes?: { title?: string; value?: string; icon?: string }
    isLoading?: boolean
}

const ChartItemInfo: FC<ChartItemInfoProps> = ({
    title,
    value,
    color,
    classes = { icon: '', title: '', value: '' },
    isLoading,
}) => {
    return (
        <div className="flex items-center gap-1">
            <div style={{ backgroundColor: color }} className={`h-4 w-4 rounded ${classes.icon}`} />
            <div className={`text-base-200 ${classes.title}`}>{title}:</div>
            <Skeleton isLoading={isLoading} classes={{ skeleton: 'w-[3rem] rounded-sm' }}>
                <div className={classes.value}>{value}</div>
            </Skeleton>
        </div>
    )
}

export default ChartItemInfo
