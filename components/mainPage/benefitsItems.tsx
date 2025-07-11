import { FC } from 'react'

import Image from 'next/image'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

export interface Benefit {
    image: string
    title: string
    subtitle: string
}

interface BenefitsListProps {
    className?: string
}

const benefits: Benefit[] = [
    {
        image: '/img/benefits/1.png',
        title: 'Play Web3 Games',
        subtitle: 'Play games, have fun, and enjoy real rewards',
    },
    {
        image: '/img/benefits/2.png',
        title: 'Climb the Leaderboard',
        subtitle: 'Showcase your skills and rise to the top for rewards',
    },
    {
        image: '/img/benefits/3.png',
        title: 'Spin the Wheel',
        subtitle: 'Test your luck for a chance at exclusive prizes',
    },
    {
        image: '/img/benefits/4.png',
        title: 'Trade NFTs on  Marketplace',
        subtitle: 'Buy, sell, and showcase digital assets with ease',
    },
]

const BenefitsList: FC<BenefitsListProps> = ({ className }) => {
    return (
        <BlockWrapper
            className={`flex max-w-[11.875rem] flex-row flex-wrap items-center justify-center gap-17 s:max-w-162 1.5xl:max-w-244.5 ${className}`}
        >
            {benefits.map(({ image, title, subtitle }) => (
                <div
                    key={image}
                    className="flex max-w-[11.875rem] flex-col items-center justify-center "
                >
                    <Image
                        src={image}
                        alt={title}
                        width={155}
                        height={155}
                        quality={100}
                        priority
                    />
                    <div className="text-center text-custom-3xl-some font-bold tracking-tighter">
                        {title}
                    </div>
                    <div className="text-center leading-6 text-subtitleManePage">{subtitle}</div>
                </div>
            ))}
        </BlockWrapper>
    )
}

export default BenefitsList
