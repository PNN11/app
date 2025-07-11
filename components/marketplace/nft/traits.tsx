import { FC } from 'react'

import NftAccordionWrapper from './nftAccordionWrapper'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'

type Trait = Omit<IMarketplaceCollection.MarketplaceTokenTrait, 'rarity'> & { rarity?: number }
interface TraitsProps {
    traits: Trait[]
}

const Traits: FC<TraitsProps> = ({ traits }) => {
    return (
        <NftAccordionWrapper title="Traits">
            <div className="grid grid-cols-6 gap-3 sm:grid-cols-9  lg:grid-cols-12">
                {traits?.length ? (
                    traits.map(({ title: category, value: property, rarity }) => (
                        <div
                            key={property}
                            className="col-span-3 flex flex-col justify-between rounded bg-base-650 px-5 py-3 font-medium"
                        >
                            <div className="mb-2 text-xs uppercase text-base-200">{category}</div>
                            <div>
                                <div className="mb-1 text-link">{property}</div>
                                {rarity && <div className="text-xs text-base-400">{rarity}%</div>}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">This NFT doesn’t have any traits</div>
                )}
            </div>
        </NftAccordionWrapper>
    )
}

export default Traits
