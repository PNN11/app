import { FC } from 'react'

import Link from 'next/link'

import FeatureCard from './featureCard'

import { Pages } from 'common-types/pages'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import GameFormModal from 'components/modals/partnership/gameForm'
import { useModal } from 'hooks/useModal'

const features = {
    bridge: {
        title: 'Arena Bridge',
        description:
            'Level up your game with ease and revolutionize your gaming world by harnessing the power of web3. Seamlessly integrate blockchain features, assets, tokens, and NFTs into your web2 game, creating a truly immersive and rewarding experience for your players.',
        image: '/images/aboutUsPage/features/arena-bridge.png',
        actionButton: 'Migrate To Web3',
    },
    platform: {
        title: 'Arena Platform',
        description:
            'A robust, user-friendly hub where players can access and enjoy a diverse range of games, participate in play-to-earn opportunities, and engage with the community',
        image: '/images/aboutUsPage/features/arena-platform.png',
        actionButton: 'Explore games',
    },
    unifiedUser: {
        title: 'Unified User ID',
        description:
            'A decentralized identity solution that streamlines user onboarding and simplifies access to games and digital assets, while prioritizing security and privacy.',
        image: '/images/aboutUsPage/features/unified-user.png',
        actionButton: 'Create Profile',
    },
    scholarship: {
        title: 'Scholarship Program',
        description:
            "Supercharge your game development journey with our Scholarship Program. Access mentorship, personalized coaching, and valuable network connections to transform into a web3. Unlock your game's full potential in the dynamic world of GameFi with our expert guidance.",
        image: '/images/aboutUsPage/features/new-scholarship-program.png',
        actionButton: 'Apply for a Scholarship Programm',
    },
}

type FeaturesProps = Pages.AboutUsTextContent['features']

const Features: FC<FeaturesProps> = ({ cards, title }) => {
    const [isOpen, open, close] = useModal()

    return (
        <BlockWrapper>
            <TitleWithDescription title={title} />
            {cards && (
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="contents lg:block lg:space-y-8">
                        <Link className="block" href="/developers">
                            <FeatureCard {...cards.firstCard} image={features.bridge.image}>
                                <SmallButton>{cards.firstCard.button}</SmallButton>
                            </FeatureCard>
                        </Link>
                        <Link className="block" href="/auth/sign-up">
                            <FeatureCard {...cards.thirdCard} image={features.unifiedUser.image}>
                                <SmallButton>{cards.thirdCard.button}</SmallButton>
                            </FeatureCard>
                        </Link>
                    </div>
                    <div className="contents lg:block lg:space-y-8 lg:pt-39">
                        <Link className="block" href="/community">
                            <FeatureCard {...cards.secondCard} image={features.platform.image}>
                                <SmallButton>{cards.secondCard.button}</SmallButton>
                            </FeatureCard>
                        </Link>
                        <div onClick={open} className="cursor-pointer">
                            <FeatureCard {...cards.fourthCard} image={features.scholarship.image}>
                                <SmallButton onClick={open}>{cards.fourthCard.button}</SmallButton>
                            </FeatureCard>
                        </div>
                    </div>
                </div>
            )}

            <GameFormModal close={close} isOpen={isOpen} />
        </BlockWrapper>
    )
}

export default Features
