import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface RewardsProps {
    title: string
    description: string
    subTitle: string
    actionButton: string
}

const Rewards: FC<RewardsProps> = ({ description, subTitle, title, actionButton }) => {
    return (
        <BlockWrapper>
            <TitleWithDescription
                classes={{ wrapper: 'xs:mb-0' }}
                title={title}
                description={description}
                subTitle={subTitle}
            />
            <div data-aos="fade-zoom-in">
                <Image src="/images/community/rewards.png" width={1440} height={1293} alt={title} />
                <Link className="mx-auto block w-full sm:w-fit" href="/games">
                    <SmallButton className="w-full">{actionButton}</SmallButton>
                </Link>
            </div>
        </BlockWrapper>
    )
}

export default Rewards
