import { FC } from 'react'

import Link from 'next/link'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import MainScreenBannerWrapper from 'components/common/wrappers/mainScreenBannerWrapper'

interface Props {
    title: string
    subTitle: string
    description: string
    actionButton: string
    image: string
    imageMobile: string
    link: string
}

const INOBanner: FC<Props> = ({
    actionButton,
    description,
    image,
    imageMobile,
    subTitle,
    title,
    link,
}) => {
    return (
        <MainScreenBannerWrapper
            description={description}
            image={image}
            imageMobile={imageMobile}
            subTitle={subTitle}
            title={title}
        >
            <Link href={link} target="_blank" className="block w-full sm:w-fit">
                <SmallButton className="w-full">{actionButton}</SmallButton>
            </Link>
        </MainScreenBannerWrapper>
    )
}

export default INOBanner
