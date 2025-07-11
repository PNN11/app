import { FC } from 'react'

import IconWithLink from './icon'

import DiscordIcon from 'components/svg/discord'
import InstagramIcon from 'components/svg/instagramIcon'
import Medium from 'components/svg/medium'
import Telegram from 'components/svg/telegram'
import Twitter from 'components/svg/twitter'

type Socials = {
    name: string
    link: string
    Icon: FC<{ className?: string }>
}

const socials: Socials[] = [
    {
        name: 'instagram',
        link: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
        Icon: InstagramIcon,
    },
    {
        name: 'twitter',
        link: process.env.NEXT_PUBLIC_TWITTER_URL,
        Icon: Twitter,
    },
    { name: 'discord', link: process.env.NEXT_PUBLIC_DISCORD_URL, Icon: DiscordIcon },
    { name: 'telegram', link: process.env.NEXT_PUBLIC_TELEGRAM_URL, Icon: Telegram },
    { name: 'medium', link: process.env.NEXT_PUBLIC_MEDIUM_URL, Icon: Medium },
]

interface SocialProps {
    classes?: { wrapper?: string; iconWrapper?: string; icon?: string }
    icons?: Socials[]
}

export const Social: FC<SocialProps> = ({
    classes = { icon: '', iconWrapper: '', wrapper: '' },
    icons = socials,
}) => {
    return (
        <div className={`flex flex-wrap justify-start gap-3 ${classes.wrapper}`}>
            {icons.map(({ Icon, link, name }) => (
                <IconWithLink
                    Icon={Icon}
                    link={link}
                    key={name}
                    classes={{ icon: classes.icon, link: classes.iconWrapper }}
                />
            ))}
        </div>
    )
}
