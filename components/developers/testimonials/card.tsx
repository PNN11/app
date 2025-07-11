import { FC } from 'react'

import Image from 'next/image'

import CardWithBorderWrapper from 'components/common/wrappers/wrapper'

interface TestimonialCardProps {
    text: string
    logo: string
    author: string
    animationDelay?: number
}

const TestimonialCard: FC<TestimonialCardProps> = ({ author, logo, text, animationDelay = 0 }) => {
    return (
        <CardWithBorderWrapper animationDelay={animationDelay}>
            <div className="flex h-full flex-col gap-8 p-8">
                <p className="grow text-xl text-base-200">{`"${text}"`}</p>
                <div className="flex items-center gap-3">
                    <Image
                        src={logo}
                        alt=""
                        width={120}
                        height={120}
                        quality={100}
                        className="w-15"
                    />
                    <p className="font-medium">{author}</p>
                </div>
            </div>
        </CardWithBorderWrapper>
    )
}

export default TestimonialCard
