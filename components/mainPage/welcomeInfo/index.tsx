import { FC } from 'react'

import Link from 'next/link'

import TitleWithDescription from '../titleWIthDescription'

import WelcomeInfoCard from './card'

import { Pages } from 'common-types/pages'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import { defaultDelay } from 'utils/constants/animations'

const mock = {
    partner: {
        title: 'Partner & Develop with us',
        image: '/images/welcomeInfo/partner.png',
        description: [
            'Full-stack solution for easy integration of blockchain gaming technologies',
            'Access to a growing and engaged community',
            'Support and mentorship through our scholarship program',
        ],
        actionButton: 'Become a partner',
    },
    game: {
        title: 'Play with us',
        image: '/images/welcomeInfo/games.png',
        description: [
            'Play-to-earn and other rewarding gaming modes',
            'A diverse selection of high-quality games',
            'Unique NFTs and marketplace',
        ],
        actionButton: 'Explore games',
    },
    ido: {
        title: 'IDO Launching soon',
        image: '/images/welcomeInfo/ido.png',
        description: [
            'Tokenized economy and investment opportunities',
            'Growth potential and market expansion',
            'Strong track record and experienced team',
        ],
        actionButton: 'Participate in IDO',
    },
}

type WelcomeInfoProps = Pages.MainPageTextContent['introduction']

const WelcomeInfo: FC<WelcomeInfoProps> = ({
    cards: { firstCard, secondCard },
    description,
    title,
}) => {
    return (
        <BlockWrapper>
            <Container>
                <TitleWithDescription title={title} description={description} />
                <div className="grid gap-4 lg:grid-cols-2">
                    <Link href="/developers">
                        <WelcomeInfoCard
                            image={mock.partner.image}
                            title={firstCard.title}
                            description={firstCard.description}
                        >
                            <SmallButton>{firstCard.button}</SmallButton>
                        </WelcomeInfoCard>
                    </Link>
                    <Link href="/community">
                        <WelcomeInfoCard
                            image={mock.game.image}
                            title={secondCard.title}
                            description={secondCard.description}
                            animationDelay={defaultDelay}
                        >
                            <SmallButton>{secondCard.button}</SmallButton>
                        </WelcomeInfoCard>
                    </Link>
                    {/* <WelcomeInfoCard
                        image={mock.ido.image}
                        title={thirdCard.title}
                        description={thirdCard.description}
                        classes={{
                            wrapper: 'lg:grid lg:grid-cols-2 lg:items-center col-span-full',
                            image: 'lg:order-1',
                        }}
                    >
                        <SmallButton onClick={openSubscribeModal}>{thirdCard.button}</SmallButton>
                    </WelcomeInfoCard> */}
                </div>
            </Container>
        </BlockWrapper>
    )
}

export default WelcomeInfo
