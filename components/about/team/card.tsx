import { FC } from 'react'

import Image from 'next/image'

import IconWithLink from 'components/common/social/icon'
import TranslateCardWrapper from 'components/common/wrappers/translateCard'
import LinkedinIcon from 'components/svg/linkedinIcon'
import { defaultDelay } from 'utils/constants/animations'

interface TeamMemberCardProps {
    image: string
    name: string
    position: string
    index: number
    link: string
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ image, name, position, index, link }) => {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={index < 4 ? defaultDelay + index * defaultDelay : defaultDelay}
            className="group/translate-card h-full"
        >
            <TranslateCardWrapper>
                <div className="flex h-full flex-col">
                    <Image
                        src={image}
                        alt={name}
                        width={316}
                        height={300}
                        className="aspect-square w-full rounded-full"
                        quality={100}
                    />
                    <div className="flex grow flex-col justify-between gap-3 p-4 text-center">
                        <div className="space-y-1">
                            <h5 className="text-custom-2.5xl font-medium">{name}</h5>
                            <div className="text-xl text-base-200">{position}</div>
                        </div>
                        <div className="flex justify-center">
                            <IconWithLink
                                classes={{ link: 'bg-base-700' }}
                                Icon={LinkedinIcon}
                                link={link}
                            />
                        </div>
                    </div>
                </div>
            </TranslateCardWrapper>
        </div>
    )
}

export default TeamMemberCard
