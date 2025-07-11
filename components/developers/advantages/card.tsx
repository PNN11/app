import { FC } from 'react'

import Image from 'next/image'

import CardWithBorderWrapper from 'components/common/wrappers/wrapper'

interface AdvantageCardProps {
    image: string
    title: string
    description: string
    classes?: { wrapper?: string; image?: string; info?: string }
    animationDelay?: number
}

const AdvantageCard: FC<AdvantageCardProps> = ({
    description,
    image,
    title,
    classes = { image: '', info: '', wrapper: '' },
    animationDelay = 0,
}) => {
    return (
        <CardWithBorderWrapper className={classes.wrapper} animationDelay={animationDelay}>
            <Image
                src={image}
                alt={title}
                width={427}
                height={288}
                className={`w-full ${classes.image}`}
                quality={100}
            />
            <div className={`p-8 ${classes.info}`}>
                <h5 className="mb-4 text-xl font-semibold">{title}</h5>
                <div className="text-base text-base-200">{description}</div>
            </div>
        </CardWithBorderWrapper>
    )
}

export default AdvantageCard
