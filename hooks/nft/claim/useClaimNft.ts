import { toast } from 'react-toastify'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { TxResult } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'

const useClaimNft = (): {
    claimNft: typeof claimNft
    finished: boolean
    processing: boolean
} => {
    const activeWallet = useWalletStore(state => state.activeWallet)

    const getBlockchainService = useGetRequiredBlockchainService()

    const { finished, processing, wrap, reset } = useAsyncWrapper()

    const claimNft = async (nft: IMarketplaceToken.TBodyResponse): Promise<TxResult> => {
        const blockchainService = await getBlockchainService()
        const [claimRes, claimError] = await wrap(async () => {
            if (nft.payload.type === 'MINT') {
                const tx = await blockchainService.claim({
                    listingId: nft.payload.lastListingId,
                })

                const claimTx = await blockchainService.sendTransaction({ activeWallet, tx })

                const claimed = await activeWallet.waitForTx(claimTx?.hash)

                return claimed
            }
        }, null)()

        if (claimError) {
            throw claimError
        }

        if (!claimRes?.success) {
            toast('Failed to claim')
            reset()
        }

        return claimRes
    }

    return {
        claimNft,
        finished,
        processing,
    }
}

export default useClaimNft
