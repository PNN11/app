import { FC } from 'react'

import NftAccordionWrapper from './nftAccordionWrapper'

interface ListingsProps {}

const Listings: FC<ListingsProps> = () => {
    return (
        <NftAccordionWrapper title="Listings">
            <div className="border-base-100-light mt-4 mb-1 flex items-center justify-between border-t pt-4">
                Listings placeholder
            </div>
        </NftAccordionWrapper>
    )
}

export default Listings
