import { FC, useCallback, useRef } from 'react'

import Image from 'next/image'

import ListingModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { IModal } from 'components/modals/interfaces/modalInterface'
import useClaimNft from 'hooks/nft/claim/useClaimNft'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = IModal & {
    nft: IMarketplaceToken.TBodyResponse
    onConfirm: () => void
}
const ClaimNftModal: FC<PropsType> = ({ nft, close, onConfirm }) => {
    const requireWallet = useRequireWallet()
    const { claimNft, finished, processing } = useClaimNft()
    const emit = useEventStore(store => store.emit)
    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        requireWallet(async () => {
            transactionProcessing.current = true
            const claimed = await claimNft(nft)

            transactionProcessing.current = false

            if (claimed?.success) {
                emit(`claim-${nft._id}`, { target: nft })
                onConfirm()
            }
        }, getNftChainId(nft))
    }, [nft])

    return (
        <ListingModalWrapper
            title="Complete your claim"
            close={close}
            className="flex flex-col gap-7"
        >
            <div className="border-line-gradient flex justify-between border-b pb-2">
                <div className="flex items-center gap-4">
                    <Image
                        src={nft.payload.logo}
                        width={70}
                        height={70}
                        alt="nft preview"
                        className="w-full"
                    />
                    <div className="flex w-full flex-col gap-1">
                        <p className="text-custom-sl text-link">{nft.payload.game?.title}</p>
                        <div className="text-xl uppercase">{nft.payload.name}</div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center gap-1">
                    <div className="flex items-center gap-1">
                        <Image
                            src={nft.currency.icon}
                            alt={`${nft.currency.icon}icon`}
                            width={20}
                            height={20}
                            className="h-5"
                        />
                        <div className="text-custom-2.5xl">
                            {nft.payload.type === 'MINT' && nft.payload.lastBidPriceAmount}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Step active={processing} completed={finished} number={1} />
                            <p className="text-custom-sl">Approve transaction</p>
                        </div>
                        <p>You’ll be asked to approve the gas fee transaction to claim your NFT.</p>
                    </div>

                    <MarketplaceButton
                        className="w-full"
                        onClick={onClickContinue}
                        isLoading={processing}
                    >
                        {finished ? 'Close' : 'Continue'}
                    </MarketplaceButton>
                </div>
            </div>
        </ListingModalWrapper>
    )
}

export default ClaimNftModal
