import { FC, ReactNode } from 'react'

import Image from 'next/image'

import Badge from 'components/common/ui/badges/newBadge'

interface GetStartedCardProps {
    image: string
    title: string
    description: string
    badge: string
    children: ReactNode
}

const GetStartedCard: FC<GetStartedCardProps> = ({
    children,
    description,
    image,
    title,
    badge,
}) => {
    return (
        <div className="group flex cursor-pointer flex-col rounded-2xl bg-base-700 transition-all duration-300 hover:-translate-y-3">
            <div className="relative">
                <Image
                    src={image}
                    width={648}
                    height={340}
                    alt={title}
                    className="max-h-85 rounded-t-2xl object-cover"
                />
                <Badge className="absolute top-5 right-5 bg-bg/20">{badge}</Badge>
            </div>
            <div className="flex grow flex-col justify-between gap-5 px-4 pt-2 pb-4">
                <div>
                    <div className="mb-1 text-xl font-semibold">{title}</div>
                    <div className="text-base font-medium leading-5 text-base-200">
                        {description}
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default GetStartedCard
