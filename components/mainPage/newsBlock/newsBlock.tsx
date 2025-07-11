import { FC } from 'react'

import Link from 'next/link'

import DiscordBlock from '../discordBlock/discordBlock'

import News from './news'
import TwitterNews from './twitterNews'

import { MainPage } from 'common-types/mainPage'
import { Pages } from 'common-types/pages'
import SocialUpdates from 'components/common/social/updates'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'

interface NewsBlockProps {
    discordData: MainPage.MainPageDiscord
    twitterLink: string
    socials: Pages.Socials
}

const NewsBlock: FC<NewsBlockProps> = ({ discordData, twitterLink, socials }) => {
    return (
        <BlockWrapper className="overflow-hidden bg-deep-blue pb-29 pt-14">
            <Container>
                <div className="mb-8 lg:mb-4">
                    <DiscordBlock discordData={discordData} />
                </div>
                <div className="mb-8 grid grid-cols-1 gap-8 lg:mb-18 lg:grid-cols-2 lg:gap-4">
                    <div className="rounded-3xl bg-bg px-8 py-6 lg:mb-0" data-aos="fade-zoom-in">
                        <News />
                        <div>
                            <Link href="/blog" className="block w-full sm:w-fit">
                                <SmallButton className="w-full" variant="outlined">
                                    Read more news
                                </SmallButton>
                            </Link>
                        </div>
                    </div>
                    <TwitterNews link={twitterLink} />
                </div>
                <SocialUpdates socials={socials} />
            </Container>
        </BlockWrapper>
    )
}

export default NewsBlock
