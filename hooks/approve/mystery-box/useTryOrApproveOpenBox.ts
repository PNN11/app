import { useCallback } from 'react'

import useApproveOpenMysteryBox from './useApproveOpenMysteryBox'

import useAllowenceERC721 from 'hooks/allowance/useAllowenceERC721'
import { TxBase } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { ApproveOpenMysteryBoxParams } from 'utils/types/blockchainHooks'

export type TryOrApproveOpenBoxFunction = (
    params: ApproveOpenMysteryBoxParams
) => Promise<TxBase | null>

const useTryOrApproveOpenBox = (): TryOrApproveOpenBoxFunction => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const approve = useApproveOpenMysteryBox()
    const getAllowance = useAllowenceERC721()

    const callback: TryOrApproveOpenBoxFunction = useCallback(
        async ({ collectionAddress, mysteryBoxId }) => {
            const address = await getAllowance({
                activeWallet,
                collectionAddress,
                tokenId: mysteryBoxId,
            })

            if (address === process.env.NEXT_PUBLIC_MYSTERY_BOX_CONTRACT) return null

            const approveResult = await approve({
                activeWallet,
                collectionAddress,
                mysteryBoxId,
            })

            return approveResult
        },
        [approve, getAllowance, activeWallet]
    )

    return callback
}

export default useTryOrApproveOpenBox
