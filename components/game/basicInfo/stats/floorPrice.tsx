import { FC } from 'react'

import GameStat, { GameStatProps } from './base'

import { Economics } from 'common-types/economics'

type Props = Omit<GameStatProps, 'title' | 'icon'> & { currency: Economics.IAsset }

const FloorPriceStat: FC<Props> = ({ isLoading, value, classes, currency }) => {
    return (
        <GameStat
            isLoading={isLoading}
            title="floor price"
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

export default FloorPriceStat
