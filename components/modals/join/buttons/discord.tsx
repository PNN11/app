import { FC } from 'react'

import { BaseButton } from './base'

import DiscordIcon from 'components/svg/discord'

export const DiscrodButton: FC = () => {
    return (
        <BaseButton className="bg-discord" href="https://discord.gg/FxVyTPtF7f" Icon={DiscordIcon}>
            Join Now
        </BaseButton>
    )
}
