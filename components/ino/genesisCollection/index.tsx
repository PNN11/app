import { FC } from 'react'

import Image from 'next/image'

import DescriptionPoint from '../privileges/descriptionPoint'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import CardWithBorderWrapper from 'components/common/wrappers/wrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    title: string
    description: string
    card: {
        image: string
        text: string
        description: {
            descriptionPoint: string
            icon: string
        }[]
    }
}

const GenesisCollection: FC<Props> = ({ description, title, card }) => {
    return (
        <div className="relative">
            <Image
                src="/images/ino/genesis-bg.png"
                width={772}
                height={1265}
                alt="bg"
                className="absolute left-0 -top-72 hidden lg:block"
            />
            <Container>
                <BlockWrapper>
                    <TitleWithDescription description={description} title={title} />
                    <CardWithBorderWrapper className="grid items-center gap-4 lg:grid-cols-2">
                        <div>
                            <Image
                                src={card.image}
                                width={648}
                                height={560}
                                alt={title}
                                className="w-full rounded-t-xl rounded-l-none lg:rounded-l-xl lg:rounded-t-none"
                            />
                        </div>
                        <div className="py-8 px-10">
                            <div className="mb-6 text-custom-2xl leading-9">{card.text}</div>
                            <ul className="space-y-5">
                                {card.description.map(item => (
                                    <DescriptionPoint
                                        key={item.descriptionPoint}
                                        icon={item.icon}
                                        text={item.descriptionPoint}
                                        classes={{ text: 'text-xl' }}
                                    />
                                ))}
                            </ul>
                        </div>
                    </CardWithBorderWrapper>
                </BlockWrapper>
            </Container>
        </div>
    )
}

export default GenesisCollection
