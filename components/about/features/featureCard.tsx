import { FC, ReactNode } from 'react'

import Image from 'next/image'

import TranslateCardWrapper from 'components/common/wrappers/translateCard'

interface FeatureCardProps {
    image: string
    title: string
    description: string
    children?: ReactNode
    classes?: { wrapper?: string }
}

const FeatureCard: FC<FeatureCardProps> = ({
    image,
    description,
    title,
    children,
    classes = { wrapper: '' },
}) => {
    return (
        <div className={`group/translate-card ${classes.wrapper}`} data-aos="fade-up">
            <TranslateCardWrapper>
                <Image
                    src={image}
                    alt={title}
                    width={648}
                    height={385}
                    className="w-full rounded-t-2xl"
                    quality={100}
                />
                <div className="space-y-4 rounded-b-2xl bg-base-800 p-8">
                    <h5 className="text-custom-2.5xl font-medium">{title}</h5>
                    <div className="text-lg leading-6 text-base-200">{description}</div>
                    <div>{children}</div>
                </div>
            </TranslateCardWrapper>
        </div>
    )
}

export default FeatureCard
