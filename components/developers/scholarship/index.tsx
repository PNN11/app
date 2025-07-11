import { FC } from 'react'

import Image from 'next/image'

import EcosystemInfo from 'components/about/ecosystem/info'
import EcosystemWrapper from 'components/about/ecosystem/wrapper'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'

interface Props {
    onButtonClick?: () => void
    title: string
    image: string
    actionButton: string
    description: string
}

const ScholarshipProgram: FC<Props> = ({
    onButtonClick,
    actionButton,
    description,
    image,
    title,
}) => {
    return (
        <BlockWrapper>
            <EcosystemWrapper className="pt-0 lg:pr-0">
                <EcosystemInfo className="lg:py-10" title={title} description={description}>
                    <SmallButton onClick={onButtonClick} className="mt-5 w-full sm:w-fit">
                        {actionButton}
                    </SmallButton>
                </EcosystemInfo>
                <div className="flex items-center justify-center xl:block">
                    <Image
                        src={image}
                        alt="Scholarship Program"
                        width={648}
                        height={496}
                        quality={100}
                    />
                </div>
            </EcosystemWrapper>
        </BlockWrapper>
    )
}

export default ScholarshipProgram
