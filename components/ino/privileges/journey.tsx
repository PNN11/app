import { FC } from 'react'

import Image from 'next/image'

import DescriptionPoint from './descriptionPoint'

import TitleWithDescription from 'components/mainPage/titleWIthDescription'

export interface JourneyProps {
    image: string
    imageCaption: string
    title: string
    descriptionText: string
    description: {
        descriptionPoint: string
        icon: string
    }[]
}

const Journey: FC<JourneyProps> = ({
    imageCaption,
    description,
    image,
    title,
    descriptionText,
}) => {
    return (
        <div
            className="grid gap-5 rounded-xl bg-base-800 py-10 px-5 lg:grid-cols-2 lg:gap-0 lg:px-0"
            data-aos="fade-in-zoom"
        >
            <div className="order-1 lg:order-none">
                <Image src={image} width={648} height={328} alt="journey" className="mb-3 w-full" />
                <div className="py-3 text-base-200 sm:px-9">{imageCaption}</div>
            </div>
            <div className="lg:pl-8">
                <TitleWithDescription
                    title={title}
                    description={descriptionText}
                    classes={{
                        title: 'text-start',
                        description: 'text-start 2xs:text-base-100',
                    }}
                />
                <ul className="space-y-5">
                    {description.map(item => (
                        <DescriptionPoint
                            key={item.descriptionPoint}
                            icon={item.icon}
                            text={item.descriptionPoint}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Journey
