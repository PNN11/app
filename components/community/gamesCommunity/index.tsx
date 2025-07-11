import { FC } from 'react'

import Image from 'next/image'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import CardWithBorderWrapper from 'components/common/wrappers/wrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface GamesCommunityProps {
    title: string
    description: string
    subTitle: string
}

const GamesCommunity: FC<GamesCommunityProps> = ({ description, subTitle, title }) => {
    return (
        <BlockWrapper>
            <CardWithBorderWrapper>
                <div className="grid items-center gap-4 lg:grid-cols-2">
                    <TitleWithDescription
                        title={title}
                        description={description}
                        subTitle={subTitle}
                        classes={{
                            description: 'text-start',
                            title: 'text-start',
                            subTitle: 'text-start',
                            wrapper: 'ml-10 mr-10 lg:mr-0 mt-8',
                        }}
                    />
                    <Image
                        src="/images/community/games-community.png"
                        alt={title}
                        width={648}
                        height={799}
                        className="w-full"
                    />
                </div>
            </CardWithBorderWrapper>
        </BlockWrapper>
    )
}

export default GamesCommunity
