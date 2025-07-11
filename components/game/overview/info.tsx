import { FC, useMemo } from 'react'

import moment from 'moment'

import GameInfoItem from './infoItem'

import { Game } from 'common-types/game'
import { Social } from 'components/common/social/social'
import ExternalInlineLink from 'components/profile/basicInfo/externalInlineLink'
import Badge from 'components/profile/referralInfo/badge'
import DiscordIcon from 'components/svg/discord'
import InstagramIcon from 'components/svg/instagramIcon'
import Medium from 'components/svg/medium'
import Telegram from 'components/svg/telegram'
import Twitter from 'components/svg/twitter'

interface GameInfoBlockProps {
    className?: string
    gameInfo: Game.IGame
}

const GameInfo: FC<GameInfoBlockProps> = ({ className = '', gameInfo }) => {
    const socials = useMemo(
        () =>
            [
                {
                    name: 'instagram',
                    link: gameInfo.socials?.instagram,
                    Icon: InstagramIcon,
                },
                {
                    name: 'twitter',
                    link: gameInfo.socials?.twitter,
                    Icon: Twitter,
                },
                { name: 'discord', link: gameInfo.socials?.discord, Icon: DiscordIcon },
                { name: 'telegram', link: gameInfo.socials?.telegram, Icon: Telegram },
                { name: 'medium', link: gameInfo.socials?.medium, Icon: Medium },
            ].filter(item => item.link),
        [gameInfo]
    )

    const isLive = gameInfo.status === 'LIVE'

    return (
        <div
            className={`flex flex-col justify-between gap-5 rounded-xl bg-base-700 p-7 sm:gap-9 ${className}`}
        >
            <div>
                <div className="mb-8 flex flex-wrap items-center gap-3 sm:mb-5 lg:mb-8">
                    <div className="text-xl font-bold leading-6">{gameInfo.title}</div>
                    <Badge
                        title={isLive ? 'Live' : 'Coming Soon'}
                        className={isLive ? 'bg-cta' : 'whitespace-nowrap bg-bg/20'}
                    />
                </div>
                <div className="space-y-3">
                    {gameInfo.developer ? (
                        <GameInfoItem title="Developer">
                            {gameInfo.developer?.url ? (
                                <ExternalInlineLink target="_blank" href={gameInfo.developer.url}>
                                    {gameInfo.developer.name}
                                </ExternalInlineLink>
                            ) : (
                                gameInfo.developer.name
                            )}
                        </GameInfoItem>
                    ) : null}
                    {gameInfo.releaseAt ? (
                        <GameInfoItem title="Release date">
                            {moment(gameInfo.releaseAt).format('DD MMMM YYYY')}
                        </GameInfoItem>
                    ) : null}
                    {/* <GameInfoItem title={gameInfo.platform.title}>
                        {gameInfo.platform.value.join(', ')}
                    </GameInfoItem>
                    <GameInfoItem title={gameInfo.genre.title}>{gameInfo.genre.value}</GameInfoItem> */}
                </div>
            </div>
            {socials?.length ? (
                <div className="border-t border-t-base-600 pt-5">
                    <div className="mb-3 text-base-200">Community</div>
                    <Social icons={socials} classes={{ iconWrapper: 'bg-bg' }} />
                </div>
            ) : null}
        </div>
    )
}

export default GameInfo
