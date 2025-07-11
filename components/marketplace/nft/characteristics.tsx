import { FC } from 'react'

import NftAccordionWrapper from './nftAccordionWrapper'

import { Description } from 'components/common/ui/description'

interface CharacteristicsProps {
    description: string
}

const Characteristics: FC<CharacteristicsProps> = ({ description }) => {
    return (
        <NftAccordionWrapper title="Description">
            <Description className="text-base-200" content={description} />
        </NftAccordionWrapper>
    )
}

export default Characteristics
