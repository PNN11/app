import { FC } from 'react'

import Link from 'next/link'

import Badge from '../ui/badges/newBadge'
import ImageWithSkeletonLoading from '../ui/loaders/image'

import { Game } from 'common-types/game'
import FileIcon from 'components/svg/fileIcon'

interface GameCardProps {
    description: string
    title: string
    address: string
    preview: string
    countTokens: number
    platforms?: Game.GamePlatform[]
    status?: 'COMMING_SOON' | 'LIVE'
    classes?: { image?: string }
}

const GameCard: FC<GameCardProps> = ({
    description,
    title,
    address,
    platforms,
    preview,
    status,
    countTokens,
    classes = { image: '' },
}) => {
    const isLive = status === 'LIVE'

    return (
        <Link
            href={address ? `/games/${address}` : '/'}
            className="block cursor-pointer pb-4 transition-all duration-300 hover:-translate-y-3"
        >
            <div className="relative mb-4">
                <ImageWithSkeletonLoading
                    src={preview}
                    width={427}
                    height={240}
                    alt={title}
                    className={`w-full select-none rounded-xl ${classes.image}`}
                    classes={{ skeleton: 'rounded-xl' }}
                />
                <Badge
                    className={`absolute top-3 right-3 z-[2] w-fit rounded-2.5 ${
                        isLive ? 'bg-cta' : 'bg-bg/20'
                    }`}
                >
                    {isLive ? 'Live' : 'Coming Soon'}
                </Badge>
                {isLive && (
                    <Badge className="absolute top-3 left-3 z-[2] flex items-center gap-2 rounded-2.5 bg-bg/20">
                        <FileIcon />
                        <span>{countTokens}</span>
                    </Badge>
                )}
            </div>

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
        </Link>
    )
}

export default GameCard
