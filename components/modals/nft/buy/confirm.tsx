import { FC, useCallback, useRef } from 'react'

import AproveAndConfirmPurchaseSteps from './purchaseSteps'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { IModal } from 'components/modals/interfaces/modalInterface'
import ItemPreview from 'components/modals/nft/itemPreview'
import ListingModalWrapper from 'components/modals/nft/listing/wrapper'
import useBuyNft from 'hooks/nft/buy/useBuy'
import useRequireWallet from 'hooks/useRequireWallet'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = IModal & {
    onConfirm: () => void
    nft: IMarketplaceToken.TBodyResponse
}
const BuyNftConfirm: FC<PropsType> = ({ nft, close, onConfirm }) => {
    const requireWallet = useRequireWallet()
    const { approveFinished, buyFinished, buyNft, buyProcessing, approveProcessing } = useBuyNft()

    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        requireWallet(async () => {
            transactionProcessing.current = true

            const sold = await buyNft(nft)

            transactionProcessing.current = false

            if (sold?.success) {
                onConfirm()
            }
        }, getNftChainId(nft))
    }, [nft])

    return (
        <ListingModalWrapper title="Complete your purchase" close={close} className="space-y-7">
            <ItemPreview nft={nft} />

            <AproveAndConfirmPurchaseSteps
                currencySymbol={nft?.currency?.symbol}
                approveActive={approveProcessing}
                approveCompleted={approveFinished}
                purchaseActive={buyProcessing}
                purchaseCompleted={buyFinished}
                onClickButton={onClickContinue}
                isLoading={approveProcessing || buyProcessing}
            />
        </ListingModalWrapper>
    )
}

export default BuyNftConfirm
