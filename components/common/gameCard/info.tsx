import { FC } from 'react'

import Badge from '../ui/badges/newBadge'

import { Game } from 'common-types/game'

interface GameCardInfoProps {
    title: string
    description: string
    platforms: Game.GamePlatform[]
}

const GameCardInfo: FC<GameCardInfoProps> = ({ description, platforms, title }) => {
    return (
        <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                {platforms?.map(tag => (
                    <Badge className="bg-base-700" key={tag.title}>
                        {tag.title}
                    </Badge>
                ))}
            </div>
            <h5 className="text-xl font-semibold">{title}</h5>
            <div className="truncate-text text-base-200">{description}</div>
        </div>
    )
}

export default GameCardInfo
