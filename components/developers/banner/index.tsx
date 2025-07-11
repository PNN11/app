import { FC } from 'react'

import Image from 'next/image'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'

interface Props {
    title: string
    image: string
    imageMobile: string
    description: string
    actionButton: string
    onButtonCLick?: () => void
}

const ForDevelopersBanner: FC<Props> = ({
    actionButton,
    description,
    image,
    imageMobile,
    title,
    onButtonCLick,
}) => {
    return (
        <Container className="md:pr-0 xl:pr-0">
            <BlockWrapper className="xl:mb-20">
                <div
                    className="grid items-center gap-6 md:grid-flow-col md:gap-4"
                    data-aos="fade-zoom-in"
                >
                    <div className="order-1 space-y-5 text-center md:order-none md:py-14 md:text-left">
                        <h1 className="text-custom-3xl leading-9 lg:text-6xl lg:leading-[1.06]">
                            {title}
                        </h1>
                        <div className="text-base text-base-200 lg:text-xl">{description}</div>
                        <SmallButton onClick={onButtonCLick} className="w-full sm:w-fit">
                            {actionButton}
                        </SmallButton>
                    </div>
                    <div className="md:w-85 lg:w-113.75 xl:w-132">
                        <Image
                            src={image}
                            width={615}
                            height={501}
                            alt="Arena Games"
                            priority
                            quality={100}
                            className="hidden md:block"
                        />
                        <Image
                            src={imageMobile}
                            width={375}
                            height={293}
                            alt="Arena Games"
                            priority
                            quality={100}
                            className="w-full md:hidden"
                        />
                    </div>
                </div>
            </BlockWrapper>
        </Container>
    )
}

export default ForDevelopersBanner
