import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Game } from 'common-types/game'

interface GameLinkProps {
    classes?: { image?: string; title?: string }
    game: Game.IGame
}

const GameLink: FC<GameLinkProps> = ({ game, classes = { image: '', title: '' } }) => {
    if (!game) return null

    return (
        <Link href={`/games/${game?.address}`} className="group flex items-center gap-2">
            <Image src={game?.icon} width={24} height={32} alt="icon" className={classes.image} />
            <p className={`font-medium text-link group-hover:text-base-100 ${classes.title}`}>
                {game?.title}
            </p>
        </Link>
    )
}

export default GameLink
