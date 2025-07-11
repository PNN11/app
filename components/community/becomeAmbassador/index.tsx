import { FC } from 'react'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BlockWithPhoneWrapper from 'components/common/wrappers/blockWithPhone'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface BecomeAmbassadorProps {
    title: string
    description: string
    subTitle: string
    actionButton: string
    onButtonClick?: () => void
}

const BecomeAmbassador: FC<BecomeAmbassadorProps> = ({
    actionButton,
    description,
    title,
    subTitle,
    onButtonClick,
}) => {
    return (
        <BlockWrapper>
            <BlockWithPhoneWrapper
                classes={{
                    childrenWrapper: 'xl:pt-8 xl:pb-8',
                }}
                image="/images/community/ambassadors.png"
                background="bg-deep-blue"
            >
                <div>
                    <TitleWithDescription
                        classes={{
                            description: 'text-start',
                            title: 'text-start lg:font-extrabold',
                            wrapper: 'md:mb-3 lg:mb-5',
                            subTitle: 'text-start',
                        }}
                        title={title}
                        description={description}
                        subTitle={subTitle}
                    />

                    <SmallButton
                        onClick={onButtonClick}
                        className="w-full bg-base-800 md:w-fit"
                        variant="outlined"
                    >
                        {actionButton}
                    </SmallButton>
                </div>
            </BlockWithPhoneWrapper>
        </BlockWrapper>
    )
}

export default BecomeAmbassador
