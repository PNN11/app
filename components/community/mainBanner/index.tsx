import { FC } from 'react'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import MainScreenBannerWrapper from 'components/common/wrappers/mainScreenBannerWrapper'

interface CommunityBannerProps {
    title: string
    subTitle: string
    description: string
    actionButton: string
    image: string
    imageMobile: string
    onButtonClick?: () => void
}

const CommunityBanner: FC<CommunityBannerProps> = ({
    actionButton,
    description,
    title,
    image,
    imageMobile,
    subTitle,
    onButtonClick,
}) => {
    return (
        <MainScreenBannerWrapper
            description={description}
            image={image}
            imageMobile={imageMobile}
            subTitle={subTitle}
            title={title}
        >
            <SmallButton onClick={onButtonClick} className="w-full sm:w-fit">
                {actionButton}
            </SmallButton>
        </MainScreenBannerWrapper>
    )
}

export default CommunityBanner
