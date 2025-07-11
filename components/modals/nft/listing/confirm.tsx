import { FC, useCallback, useRef } from 'react'

import ListingItemPreview from '../listingItemPreview'

import ListingModalWrapper from './wrapper'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { IModal } from 'components/modals/interfaces/modalInterface'
import useListingNft from 'hooks/nft/listing/useCreate'
import useRequireWallet from 'hooks/useRequireWallet'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = IModal & {
    onConfirm: () => void
    txInfo: Gallery.TxInfoType
    nft: IMarketplaceToken.TBodyResponse
}
const ConfirmSecondaryListing: FC<PropsType> = ({ txInfo, nft, close, onConfirm }) => {
    const { listingNft, approveFinished, listingFinished, processingApprove, processingListing } =
        useListingNft()
    const requireWallet = useRequireWallet()
    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true

            const listed = await listingNft({ nft, txInfo })

            transactionProcessing.current = false

            if (listed?.success) {
                onConfirm()
            }
        }, getNftChainId(nft))
    }, [txInfo, nft])

    return (
        <ListingModalWrapper
            title="Complete your listing"
            close={close}
            className="flex flex-col gap-7"
        >
            <div className="space-y-2">
                <ListingItemPreview nft={nft} txInfo={txInfo} />

                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Step
                                    active={processingApprove}
                                    completed={approveFinished}
                                    number={1}
                                />
                                <p className="text-custom-sl">Approve access to NFT</p>
                            </div>
                            <p>You’ll be asked to approve the listing of your NFT.</p>
                        </div>

                        <MarketplaceButton
                            className="w-full"
                            onClick={onClickContinue}
                            isLoading={processingListing || processingApprove}
                        >
                            {approveFinished ? 'close' : 'Continue'}
                        </MarketplaceButton>
                    </div>
                    <div className="flex items-center gap-2">
                        <Step active={processingListing} completed={listingFinished} number={2} />
                        <p className="text-custom-sl">Confirm listing</p>
                    </div>
                </div>
            </div>
        </ListingModalWrapper>
    )
}

export default ConfirmSecondaryListing
