/* eslint-disable react/no-unused-prop-types */
import { FC } from 'react'

import { Game } from 'common-types/game'
import SwapBlock from 'components/swap/swapBlock'

type GameSwapBlockPropsType = {
    className: string
    game: Game.IGame
    isLoading: boolean
}

export const GameSwapBlock: FC<GameSwapBlockPropsType> = ({ className }) => {
    return (
        <div className={`${className}`}>
            <SwapBlock />
        </div>
    )
}
