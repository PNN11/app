import { FC, MouseEventHandler, PropsWithChildren, useRef } from 'react'

import { useQueryClient } from 'react-query'
import { twMerge } from 'tailwind-merge'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { ButtonProps } from 'components/common/ui/buttons/newSmallButton'
import useGetEndStakingTime from 'hooks/nft/lock/useGetEndStakingTime'
import useUnlockNft from 'hooks/nft/lock/useUnlock'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import useFilterStore from 'store/useFilterStore'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { getNftChainId } from 'utils/nft/getNftChainId'

interface Props {
    Component: FC<{ isLoading: boolean } & ButtonProps>
    nft: IMarketplaceToken.TBodyResponse
    onSuccess?: () => void
    className?: string
}

const ButtonWithUnstake: FC<PropsWithChildren<Props>> = ({
    nft,
    onSuccess,
    Component,
    children,
    className = '',
}) => {
    const requireWallet = useRequireWallet()
    const { unlockNft, processing } = useUnlockNft()
    const emit = useEventStore(store => store.emit)
    const queryClient = useQueryClient()
    const userId = useUserStore(s => s.userId)

    const filters = useFilterStore(s => s.filter)

    const transactionProcessing = useRef(false)

    const { timestamp, isLoading } = useGetEndStakingTime(nft)

    const handleStake: MouseEventHandler = async (e): Promise<void> => {
        e.stopPropagation()
        e.preventDefault()

        if (transactionProcessing.current) return
        await requireWallet(async () => {
            transactionProcessing.current = true

            const res = await unlockNft(nft)

            transactionProcessing.current = false
            if (res?.success) {
                onSuccess?.()
                emit(`unlock-${nft._id}`, { target: nft })
                await Promise.allSettled([
                    queryClient.refetchQueries({
                        queryKey: [QueryKeys.GET_STAKED_TOKENS, nft.collection._id],
                    }),
                    queryClient.refetchQueries({
                        queryKey: [QueryKeys.GET_NFTS, 10, userId],
                    }),
                    queryClient.refetchQueries({
                        queryKey: [QueryKeys.GET_NFTS, 15, filters],
                    }),
                ])
            }
        }, getNftChainId(nft))
    }

    return (
        <Component
            className={twMerge('w-full', className)}
            disabled={timestamp > 0 || isLoading}
            onClick={handleStake}
            isLoading={processing}
        >
            {children}
        </Component>
    )
}

export default ButtonWithUnstake
