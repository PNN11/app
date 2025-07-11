import { FC } from 'react'

import Image from 'next/image'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BlockWithPhoneWrapper from 'components/common/wrappers/blockWithPhone'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    onButtonClick?: () => void
    title: string
    description: string
    actionButton: string
}

const SubmitGame: FC<Props> = ({ onButtonClick, actionButton, description, title }) => {
    return (
        <BlockWrapper>
            <BlockWithPhoneWrapper
                classes={{
                    childrenWrapper: 'md:py-7 xl:pt-12 xl:pb-12',
                }}
                image="/images/developersPage/iphone.png"
                background="bg-deep-blue"
            >
                <div>
                    <Image
                        src="/images/developersPage/logo-AG.png"
                        width={141}
                        height={80}
                        alt="Arena logo"
                        className="mb-5 w-30 md:w-35 lg:mb-11"
                    />

                    <TitleWithDescription
                        classes={{
                            description: 'text-start',
                            title: 'text-start',
                            wrapper: 'md:mb-3 lg:mb-9',
                        }}
                        title={title}
                        description={description}
                    />

                    <SmallButton
                        onClick={onButtonClick}
                        className="w-full md:w-fit"
                        variant="outlined"
                    >
                        {actionButton}
                    </SmallButton>
                </div>
            </BlockWithPhoneWrapper>
        </BlockWrapper>
    )
}

export default SubmitGame
