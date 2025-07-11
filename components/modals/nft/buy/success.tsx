import { FC } from 'react'

import Image from 'next/image'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { IModal } from 'components/modals/interfaces/modalInterface'
import ListingModalWrapper from 'components/modals/nft/listing/wrapper'
import { calculateFee } from 'utils/math/fee/calculateFee'

type PropsType = IModal & {
    onDone: () => void
    nft: IMarketplaceToken.TBodyResponse
}
const BuyNftSuccess: FC<PropsType> = ({ nft, close, onDone }) => {
    return (
        <ListingModalWrapper
            title="Complete checkout"
            close={close}
            className="flex flex-col gap-8"
        >
            <div className="flex justify-center text-custom-2.5xl">Transaction Submitted</div>

            <div>
                <div className="border-line-gradient flex items-center justify-between border-b pb-2">
                    <div className="custom-sl">Provided</div>
                    <div className="flex flex-col items-end justify-center gap-1">
                        <div className="flex items-center gap-1">
                            <Image
                                src={nft.currency.icon}
                                alt={`${nft.currency.icon}icon`}
                                width={20}
                                height={20}
                                className="h-5"
                            />
                            <div className="text-custom-2.5xl">{nft.priceAmount}</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="custom-sl">Fee</div>
                    <div className="flex flex-col items-end justify-center gap-1">
                        <div className="flex items-center gap-1">
                            <Image
                                src={nft.currency.icon}
                                alt={`${nft.currency.icon}icon`}
                                width={12}
                                height={12}
                                className="h-3"
                            />
                            <div>{calculateFee(nft.priceAmount)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <MarketplaceButton onClick={onDone} className="w-full">
                Done
            </MarketplaceButton>
        </ListingModalWrapper>
    )
}

export default BuyNftSuccess
