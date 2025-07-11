import { FC } from 'react'

import TeamMemberCard from './card'

interface PersonCardListProps {
    list: { image: string; name: string; position: string; link: string }[]
}

const PersonCardList: FC<PersonCardListProps> = ({ list }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {list.map((member, index) => (
                <div
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.3%-0.6875rem)] xl:w-[calc(25%-0.75rem)]"
                    key={member.name}
                >
                    <TeamMemberCard index={index} {...member} />
                </div>
            ))}
        </div>
    )
}

export default PersonCardList
