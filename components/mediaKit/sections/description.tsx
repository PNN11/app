import { FC } from 'react'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

const descriptions = [
    {
        title: 'Short Description',
        description:
            'The Arena Games, a pioneering platform designed to reshape the gaming industry by seamlessly integrating blockchain technology, play-to-earn mechanics, and NFTs',
    },
    {
        title: 'Full Description',
        description: (
            <>
                <p>
                    The Arena Games, a pioneering platform designed to reshape the gaming industry
                    by seamlessly integrating blockchain technology, play-to-earn mechanics, and
                    NFTs.
                </p>
                <br />
                <p>
                    At the core of Arena Games is a dynamic ecosystem and circular economy, ensuring
                    sustainable token value and fostering a rewarding gaming experience. Our
                    innovative approach prevents token inflation by implementing a circular economy
                    model, where tokens used in Play and Win gameplay are seamlessly recycled and
                    reinvested in the Play and Earn mode, promoting fairness and long-term value for
                    our community.
                </p>
            </>
        ),
    },
]

const Description: FC = () => {
    return (
        <BlockWrapper className="xl:mb-40">
            <div className="mx-auto flex max-w-274 flex-col gap-8" data-aos="fade-zoom-in">
                {descriptions.map(el => (
                    <div key={el.title} className="flex flex-col gap-3 md:flex-row md:gap-1">
                        <div className="self-center text-28 md:basis-[30%] md:self-start">
                            {el.title}
                        </div>
                        <div className="text-xl text-base-200 md:basis-[70%]">{el.description}</div>
                    </div>
                ))}
            </div>
        </BlockWrapper>
    )
}

export default Description
