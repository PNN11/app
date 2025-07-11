import { FC } from 'react'

import Image from 'next/image'

import DescriptionPoint from './descriptionPoint'

import TitleWithDescription from 'components/mainPage/titleWIthDescription'

export interface PerksOfThePrivelegedProps {
    image: string
    imageMobile: string
    imageCaption: string
    title: string
    descriptionText: string
    description: {
        descriptionPoint: string
        icon: string
    }[]
}

const PerksOfThePriveleged: FC<PerksOfThePrivelegedProps> = ({
    description,
    title,
    imageCaption,
    image,
    imageMobile,
    descriptionText,
}) => {
    return (
        <div
            className="mb-4 grid items-center gap-5 rounded-xl bg-ino-perks px-5 py-10 lg:grid-cols-2 lg:gap-0 lg:px-0"
            data-aos="fade-in-zoom"
        >
            <div className="lg:pl-8">
                <TitleWithDescription
                    title={title}
                    description={descriptionText}
                    classes={{ title: 'text-start', description: 'text-start 2xs:text-base-100' }}
                />
                <ul className="grid gap-4 md:grid-cols-2 md:gap-x-7 md:gap-y-5">
                    {description.map((item, index) => (
                        <DescriptionPoint
                            key={item.descriptionPoint}
                            icon={item.icon}
                            text={item.descriptionPoint}
                            classes={{ wrapper: index % 2 ? 'order-1 md:order-none' : '' }}
                        />
                    ))}
                </ul>
            </div>
            <div>
                <Image
                    src={image}
                    width={648}
                    height={428}
                    quality={100}
                    alt="Nfts"
                    className="hidden w-full md:block"
                />
                <Image
                    src={imageMobile}
                    width={336}
                    height={250}
                    quality={100}
                    alt="Nfts"
                    className="w-full md:hidden"
                />
                <div className="py-3 text-center sm:px-17">{imageCaption}</div>
            </div>
        </div>
    )
}

export default PerksOfThePriveleged
