import { FC } from 'react'

import { Pages } from 'common-types/pages'
import FeatureCard from 'components/about/features/featureCard'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    title: string
    description: string
    cards: {
        firstCard: Pages.FeatureForGamesCard & { image: string }
        secondCard: Pages.FeatureForGamesCard & { image: string }
        thirdCard: Pages.FeatureForGamesCard & { image: string }
        fourthCard: Pages.FeatureForGamesCard & { image: string }
    }
}

const FeaturesForGames: FC<Props> = ({ cards, description, title }) => {
    return (
        <BlockWrapper>
            <TitleWithDescription title={title} description={description} />
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="contents lg:block lg:space-y-8">
                    <FeatureCard classes={{ wrapper: 'order-1' }} {...cards.firstCard} />
                    <FeatureCard classes={{ wrapper: 'order-3' }} {...cards.thirdCard} />
                </div>
                <div className="contents lg:block lg:space-y-8 lg:pt-39">
                    <FeatureCard classes={{ wrapper: 'order-2' }} {...cards.secondCard} />
                    <FeatureCard classes={{ wrapper: 'order-4' }} {...cards.fourthCard} />
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FeaturesForGames
