import { FC } from 'react'

import Image from 'next/image'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import WelcomeInfoCard from 'components/mainPage/welcomeInfo/card'

interface Props {
    onButtonClick?: () => void
    title: string
    card: {
        title: string
        image: string
        actionButton: string
        description: {
            descriptionPoint: string
            id: string
        }[]
    }
}

const BecomePartner: FC<Props> = ({ onButtonClick, card, title }) => {
    return (
        <BlockWrapper>
            <div
                data-aos="fade-zoom-in"
                className="mb-20 rounded-3xl bg-deep-blue py-10 px-5 md:text-custom-2.5xl md:font-medium xl:mb-45"
            >
                <div className="mx-auto flex max-w-248 flex-col gap-8 sm:flex-row sm:items-center sm:gap-15">
                    <Image
                        src="/images/developersPage/logo-AG.png"
                        width={141}
                        height={80}
                        alt="Arena logo"
                        className="w-30 md:w-35"
                    />
                    <div>{title}</div>
                </div>
            </div>
            <WelcomeInfoCard
                {...card}
                classes={{
                    wrapper: 'lg:grid lg:grid-cols-2 lg:items-center col-span-full',
                }}
            >
                <SmallButton onClick={onButtonClick}>{card.actionButton}</SmallButton>
            </WelcomeInfoCard>
        </BlockWrapper>
    )
}

export default BecomePartner
