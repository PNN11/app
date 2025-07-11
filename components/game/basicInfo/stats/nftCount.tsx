import { FC } from 'react'

import GameStat, { GameStatProps } from './base'

type Props = Omit<GameStatProps, 'title' | 'icon'>

const NftCountStat: FC<Props> = ({ isLoading, value, classes }) => {
    return (
        <GameStat
            isLoading={isLoading}
            title="items"
            value={value ?? 0}
            classes={{
                title: classes?.title,
                value: classes?.value,
                wrapper: classes?.wrapper,
            }}
        />
    )
}

export default NftCountStat
