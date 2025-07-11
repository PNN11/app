import { FC } from 'react'

import Link from 'next/link'

import GetStartedCard from './getStartedCard'

import { Game } from 'common-types/game'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

const mock = {
    downloadGame: {
        image: '/img/games/download-game.png',
        title: 'Download Arena Games app',
        description: 'Arena Games app',
        badge: 'Step 1',
    },
    getPass: {
        image: '/img/games/get-pass.png',
        title: 'Get VIP PASS NFT',
        description: 'To join Win-to-Earn games, VIP PASS NFT is your ticket',
        badge: 'Step 2',
    },
}

interface GetStartedBlockProps {
    game: Game.IGame
}

const GetStartedBlock: FC<GetStartedBlockProps> = ({ game }) => {
    return (
        <BlockWrapper>
            <>
                <BlockTitle>Get started</BlockTitle>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <GetStartedCard {...mock.downloadGame}>
                        <div className="flex items-center gap-4">
                            <Link className="w-full sm:w-fit" href={game?.stores?.apple ?? '/'}>
                                <SmallButton className="w-full">App Store</SmallButton>
                            </Link>
                            <Link className="w-full sm:w-fit" href={game?.stores?.google ?? '/'}>
                                <SmallButton className="w-full" variant="outlined">
                                    Google Play
                                </SmallButton>
                            </Link>
                        </div>
                    </GetStartedCard>
                    <GetStartedCard {...mock.getPass}>
                        <SmallButton disabled className="w-full sm:w-fit">
                            Coming soon
                        </SmallButton>
                    </GetStartedCard>
                </div>
            </>
        </BlockWrapper>
    )
}

export default GetStartedBlock
