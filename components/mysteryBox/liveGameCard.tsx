import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Game } from 'common-types/game'
import GameBadge from 'components/common/ui/gameBadge'
import { CardWrapper } from 'components/common/wrappers/cardWrapper'
import BoxIcon from 'components/svg/box'
import { useHydrated } from 'hooks/useHydrated'

interface LiveGameCardProps {
    game: Partial<Game.IGame> & { isComingSoon: boolean; boxesCount: number }
}

const LiveGameCard: FC<LiveGameCardProps> = ({ game }) => {
    const isHydrated = useHydrated()

    return (
        <CardWrapper key={game.id}>
            <Link
                href={game.id ? `/games/${game.id}` : '/mysteryboxes'}
                className="relative h-full rounded-2xl outline-none hover:shadow-card focus:shadow-active"
            >
                <div className="h-full">
                    <Image
                        src={game.preview}
                        width={336}
                        height={290}
                        alt={`${game.title} preview`}
                        className="h-full w-full rounded-2xl"
                    />
                    <div
                        className={`${
                            game.isComingSoon ? '' : 'hidden'
                        } absolute inset-0 flex items-center justify-center rounded-2xl text-custom-lg`}
                    >
                        Coming soon
                    </div>
                </div>
                <div className="absolute bottom-0 h-1/2 w-full rounded-b-2xl bg-live-game-card" />
                {isHydrated ? (
                    <div
                        className={`absolute bottom-3 flex w-full px-3 ${
                            game.isComingSoon ? 'justify-center opacity-40' : 'justify-between'
                        } items-center `}
                    >
                        <GameBadge
                            icon={game.icon}
                            title={game.title}
                            gameId={game.id}
                            classes={{
                                title: 'text-lg',
                                wrapper: 'pl-3 pr-3 py-1.5 bg-base-700 bg-opacity-100',
                            }}
                        />
                        {!game.isComingSoon ? (
                            <div className="flex items-center gap-2 text-base-300">
                                <BoxIcon />
                                <div className="text-sm font-medium">{game.boxesCount}</div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </Link>
        </CardWrapper>
    )
}

export default LiveGameCard
