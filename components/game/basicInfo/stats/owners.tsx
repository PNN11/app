import { FC } from 'react'

import GameStat, { GameStatProps } from './base'

type Props = Omit<GameStatProps, 'title' | 'icon'>

const OwnersStat: FC<Props> = ({ isLoading, value, classes }) => {
    return (
        <GameStat
            isLoading={isLoading}
            title="owner"
            value={value ?? 0}
            classes={{
                title: classes?.title,
                value: classes?.value,
                wrapper: classes?.wrapper,
            }}
        />
    )
}

export default OwnersStat
