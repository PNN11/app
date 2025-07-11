import { FC, ReactNode } from 'react'

import Image from 'next/image'

import CardWithBorderWrapper from '../../common/wrappers/wrapper'

interface WelcomeInfoCardProps {
    image: string
    title: string
    description: {
        descriptionPoint: string
        id: string
    }[]
    children: ReactNode
    classes?: { wrapper?: string; image?: string; info?: string }
    animationDelay?: number
}

const WelcomeInfoCard: FC<WelcomeInfoCardProps> = ({
    image,
    title,
    description,
    classes = { image: '', info: '', wrapper: '' },
    animationDelay,
    children,
}) => {
    return (
        <CardWithBorderWrapper className={classes.wrapper} animationDelay={animationDelay}>
            <Image
                src={image}
                alt=""
                width={648}
                height={385}
                className={`w-full ${classes.image}`}
                quality={100}
            />
            <div className={`p-10 pt-5 ${classes.info}`}>
                <h5 className="mb-4 text-custom-2.5xl font-medium">{title}</h5>
                <ul className="mb-8 list-disc pl-7 text-lg font-medium">
                    {description.map(({ descriptionPoint, id }) => (
                        <li key={id}>{descriptionPoint}</li>
                    ))}
                </ul>

                {children}
            </div>
        </CardWithBorderWrapper>
    )
}

export default WelcomeInfoCard
