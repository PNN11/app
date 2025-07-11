import { FC } from 'react'

import AdvantageCard from './card'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import { defaultDelay } from 'utils/constants/animations'

type Props = {
    onButtonClick?: () => void
    title: string
    description: string
    subTitle: string
    actionButton: string
    cards: {
        title: string
        description: string
        image: string
    }[]
}

const Advantages: FC<Props> = ({
    onButtonClick,
    actionButton,
    cards,
    description,
    subTitle,
    title,
}) => {
    return (
        <BlockWrapper>
            <div data-aos="fade-zoom-in" className="mb-3 text-center text-custom-2.5xl font-medium">
                {subTitle}
            </div>
            <TitleWithDescription title={title} description={description} />
            <div className="mb-10 flex flex-wrap justify-center gap-4">
                {cards.map(({ description, image, title }, index) => (
                    <div
                        key={title}
                        className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.3%-0.6875rem)]"
                    >
                        <AdvantageCard
                            description={description}
                            image={image}
                            title={title}
                            animationDelay={index < 3 ? defaultDelay * index : 0}
                        />
                    </div>
                ))}
            </div>
            <div data-aos="fade-zoom-in" className="flex justify-center">
                <SmallButton onClick={onButtonClick} className="w-full sm:w-fit">
                    {actionButton}
                </SmallButton>
            </div>
        </BlockWrapper>
    )
}

export default Advantages
