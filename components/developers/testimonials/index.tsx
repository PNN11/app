import { FC } from 'react'

import TestimonialCard from './card'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import { defaultDelay } from 'utils/constants/animations'

interface Props {
    title: string
    description: string
    cards: {
        text: string
        logo: string
        author: string
    }[]
}

const Testimonials: FC<Props> = ({ cards, description, title }) => {
    return (
        <BlockWrapper>
            <TitleWithDescription title={title} description={description} />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {cards.map(({ author, logo, text }, index) => (
                    <TestimonialCard
                        logo={logo}
                        author={author}
                        text={text}
                        key={author}
                        animationDelay={index < 3 ? defaultDelay * index : 0}
                    />
                ))}
            </div>
        </BlockWrapper>
    )
}

export default Testimonials
