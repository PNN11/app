import { FC } from 'react'

import GameStat, { GameStatProps } from './base'

import { Economics } from 'common-types/economics'

type Props = Omit<GameStatProps, 'title' | 'icon'> & { currency: Economics.IAsset }

const VolumeStat: FC<Props> = ({ isLoading, value, classes, currency }) => {
    return (
        <GameStat
            isLoading={isLoading}
            title="volume traded"
            value={value ?? 0}
            icon={currency?.icon}
            classes={{
                title: classes?.title,
                value: classes?.value,
                wrapper: classes?.wrapper,
            }}
        />
    )
}

export default VolumeStat
