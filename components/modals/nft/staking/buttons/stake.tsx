import { FC, useRef } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import useLockNft from 'hooks/nft/lock/useLock'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import { getNftChainId } from 'utils/nft/getNftChainId'

interface Props {
    onSuccess: () => void
    nft: IMarketplaceToken.TBodyResponse
}

const StakeButton: FC<Props> = ({ nft, onSuccess }) => {
    const requireWallet = useRequireWallet()
    const { lockNft, approveProcessing, processing } = useLockNft()
    const emit = useEventStore(store => store.emit)

    const transactionProcessing = useRef(false)

    const handleStake = async (): Promise<void> => {
        if (transactionProcessing.current) return
        await requireWallet(async () => {
            transactionProcessing.current = true

            const res = await lockNft(nft)

            transactionProcessing.current = false
            if (res?.success) {
                onSuccess()
                emit(`lock-${nft._id}`, { target: nft })
            }
        }, getNftChainId(nft))
    }

    return (
        <SmallButton onClick={handleStake} isLoading={processing || approveProcessing}>
            Stake
        </SmallButton>
    )
}

export default StakeButton
