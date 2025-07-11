import { FC, useCallback, useRef } from 'react'

import { toast } from 'react-toastify'

import ClaimModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { getCurrencySymbol } from 'components/common/nftCard/currency/symbol'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'
import { IModal } from 'components/modals/interfaces/modalInterface'
import useClaimNft from 'hooks/nft/claim/useClaimNft'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { getNftChainId } from 'utils/nft/getNftChainId'

type PropsType = IModal & {
    nft: IMarketplaceToken.TBodyResponse
    onConfirm: () => void
}

const alreadyClaimedError = 'execution reverted: Already claimed'

const ClaimAuctionReward: FC<PropsType> = ({ nft, close, onConfirm }) => {
    const requireWallet = useRequireWallet()
    const { claimNft, finished, processing } = useClaimNft()
    const emit = useEventStore(store => store.emit)
    const transactionProcessing = useRef(false)

    const onClickContinue = useCallback(async () => {
        if (transactionProcessing.current) return

        requireWallet(async () => {
            transactionProcessing.current = true
            try {
                const claimed = await claimNft(nft)

                transactionProcessing.current = false

                if (claimed?.success) {
                    emit(`claim-${nft._id}`, { target: nft })
                    onConfirm()

                    return
                }
            } catch (error) {
                toast(ethersContractExecutionError(error))
                if (error?.reason === alreadyClaimedError) {
                    emit(`already-claimed-${nft._id}`, { target: nft })
                    close()
                }
            }
        }, getNftChainId(nft))
    }, [nft])

    return (
        <ClaimModalWrapper
            title="Complete your claim"
            close={close}
            className="flex flex-col gap-7"
        >
            <div className="border-line-gradient flex justify-between border-b pb-2">
                <div className="flex items-center gap-4">
                    <div className="flex w-full flex-col gap-1">Reward</div>
                </div>
                <div className="flex flex-col items-end justify-center gap-1">
                    {(nft.payload as IMarketplaceToken.TPayloadMint<'MINT'>).lastBidPriceAmount}{' '}
                    {getCurrencySymbol(nft.currency)}
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Step active={processing} completed={finished} number={1} />
                            <p className="text-custom-sl">Approve transaction</p>
                        </div>
                        <p>
                            You’ll be asked to approve transaction to claim reward and send token to
                            winner
                        </p>
                    </div>
                    <MarketplaceButton
                        className="w-full"
                        onClick={onClickContinue}
                        isLoading={processing}
                    >
                        Claim
                    </MarketplaceButton>
                </div>
            </div>
        </ClaimModalWrapper>
    )
}

export default ClaimAuctionReward
