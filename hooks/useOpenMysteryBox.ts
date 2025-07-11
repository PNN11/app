import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import useTryOrApproveOpenBox from './approve/mystery-box/useTryOrApproveOpenBox'
import { useAsyncWrapper } from './useAsyncWrapper'
import useOpenBox from './useOpenBox'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useServiceStore from 'store/service'
import useWalletStore from 'store/useWalletStore'

const useOpenMysteryBox = (): {
    openMysteryBox: (
        mysteryBox: IMarketplaceToken.TBodyResponse
    ) => Promise<IMarketplaceToken.TBodyResponse>
    approveProcessing: boolean
    openProcessing: boolean
    getTokenProcessing: boolean
} => {
    const api = useServiceStore(s => s.marketplaceService)
    const activeWallet = useWalletStore(state => state.activeWallet)
    const {
        wrap: approveWrap,
        processing: approveProcessing,
        reset: approveReset,
    } = useAsyncWrapper()
    const { wrap: openWrap, processing: openProcessing, reset: openReset } = useAsyncWrapper()
    const approveOpen = useTryOrApproveOpenBox()
    const openBox = useOpenBox()

    const getToken = useMutation(api.getTokenByTokenId)

    const openMysteryBox = async (
        mysteryBox: IMarketplaceToken.TBodyResponse
    ): Promise<IMarketplaceToken.TBodyResponse> => {
        if (mysteryBox.collection.payload.type !== 'MINT') {
            toast('Collection not minted')

            return
        }

        if (mysteryBox.payload.type !== 'MINT') {
            toast('Token not minted')

            return
        }

        if (mysteryBox.payload.resolution !== 'MYSTER_BOX') {
            toast('Token not a mystyery box')

            return
        }

        const [approveRes] = await approveWrap(async () => {
            if (
                mysteryBox.collection.payload.type !== 'MINT' ||
                mysteryBox.payload.type !== 'MINT'
            ) {
                return
            }
            const approveTx = await approveOpen({
                activeWallet,
                collectionAddress: mysteryBox.collection.payload.address,
                mysteryBoxId: mysteryBox.payload.tokenId,
            })

            if (approveTx === null) return { success: true }

            const approved = await activeWallet.waitForTx(approveTx?.hash)

            return approved
        }, null)()

        if (!approveRes?.success) {
            approveReset()

            return
        }

        const [openRes] = await openWrap(async () => {
            if (
                mysteryBox.collection.payload.type !== 'MINT' ||
                mysteryBox.payload.type !== 'MINT' ||
                mysteryBox.payload.resolution !== 'MYSTER_BOX'
            ) {
                return
            }
            const result = await openBox({
                activeWallet,
                collection: mysteryBox.collection.payload.address,
                boxId: mysteryBox.payload.tokenId,
                contextId: mysteryBox.payload.mysteryBox.externalId,
            })

            return result
        }, null)()

        if (!openRes?.tokenId) {
            approveReset()
            openReset()

            return
        }

        const token = await getToken.mutateAsync({
            collection: mysteryBox.collection.payload.address,
            id: openRes.tokenId.toString(),
        })

        return token
    }

    return {
        openMysteryBox,
        approveProcessing,
        openProcessing,
        getTokenProcessing: getToken.isLoading,
    }
}

export default useOpenMysteryBox
