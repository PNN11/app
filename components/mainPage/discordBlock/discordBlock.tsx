import { FC } from 'react'

import Link from 'next/link'

import TitleWithDescription from '../titleWIthDescription'

import { MainPage } from 'common-types/mainPage'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BlockWithPhoneWrapper from 'components/common/wrappers/blockWithPhone'
import DiscordIcon from 'components/svg/discord'

interface DiscordBlockProps {
    discordData: MainPage.MainPageDiscord
    background?: string
}

const DiscordBlock: FC<DiscordBlockProps> = ({
    discordData: {
        actionButton: { label, url },
        text,
    },
    background = 'bg-bg',
}) => {
    return (
        <>
            <TitleWithDescription
                classes={{ wrapper: 'lg:mb-0 1.5xl:-mb-22' }}
                title="Welcome to the community"
            />

            <BlockWithPhoneWrapper image="/images/discordBlock/iphone.png" background={background}>
                <>
                    <div className="flex h-15 w-15 items-center justify-center rounded-full bg-base-100/20 backdrop-blur-sm">
                        <DiscordIcon />
                    </div>
                    <div className="lg:text-custom-3.5xl text-custom-xl font-medium leading-8 sm:text-custom-3xl">
                        {text}
                    </div>
                    <Link className="block w-full md:w-fit" href={url}>
                        <SmallButton className="w-full" variant="outlined">
                            {label}
                        </SmallButton>
                    </Link>
                </>
            </BlockWithPhoneWrapper>
        </>
    )
}

export default DiscordBlock
