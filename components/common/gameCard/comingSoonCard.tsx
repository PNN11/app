import { FC } from 'react'

import Image from 'next/image'

import GameCardInfo from './info'
import GameCardWrapper from './wrapper'

import { Game } from 'common-types/game'

interface ComingSoonGameCardProps {
    description: string
    title: string
    preview: string
    platforms?: Game.GamePlatform[]
}

const ComingSoonGameCard: FC<ComingSoonGameCardProps> = ({
    description,
    title,
    platforms,
    preview,
}) => {
    return (
        <GameCardWrapper>
            <div className="relative mb-4">
                <Image
                    src={preview}
                    width={427}
                    height={240}
                    alt={title}
                    className="w-full rounded-xl"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-base-100 px-4 py-3 text-custom-lg font-medium">
                    Coming soon
                </div>
            </div>

            <GameCardInfo description={description} platforms={platforms} title={title} />
        </GameCardWrapper>
    )
}

export default ComingSoonGameCard
