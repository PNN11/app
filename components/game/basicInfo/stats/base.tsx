import { FC } from 'react'

import Image from 'next/image'

import Skeleton from 'components/common/skeleton'

export interface GameStatProps {
    isLoading: boolean
    value: number
    title: string
    icon?: string
    classes?: { wrapper?: string; value?: string; title?: string }
}

const GameStat: FC<GameStatProps> = ({ isLoading, title, value, icon, classes = {} }) => {
    return (
        <div className={`rounded-xl bg-base-100/10 px-4 py-2 text-xl ${classes?.wrapper ?? ''}`}>
            <div className={`flex items-center justify-center gap-1 ${classes?.value ?? ''}`}>
                <Skeleton isLoading={isLoading}>
                    <div>{value}</div>
                    {icon && <Image src={icon} width={16} height={16} alt="icon" />}
                </Skeleton>
            </div>
            <div className={`text-center text-sm text-base-300 ${classes?.title ?? ''}`}>
                {title}
            </div>
        </div>
    )
}

export default GameStat
