import { toast } from 'react-toastify'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import { TxResult } from 'services/wallets/types'
import useWalletStore from 'store/useWalletStore'
import { ethersContractExecutionError } from 'utils/errors/ethers'

type UnlockNftFunc = (nft: IMarketplaceToken.TBodyResponse) => Promise<TxResult>

const useUnlockNft = (): {
    unlockNft: UnlockNftFunc
    processing: boolean
} => {
    const activeWallet = useWalletStore(store => store.activeWallet)

    const { wrap, processing, reset } = useAsyncWrapper()
    const getBlockchainService = useGetRequiredBlockchainService()

    const unlockNft: UnlockNftFunc = async nft => {
        const blockchainService = await getBlockchainService()
        const [res, error] = await wrap(async () => {
            if (nft.collection.payload.type === 'CREATED' || nft.payload.type === 'CREATED') {
                return
            }
            const tx = await blockchainService.unlock({
                collectionAddress: nft.collection.payload.address,
                tokenId: nft.payload.tokenId,
            })

            const unlockTx = await blockchainService.sendTransaction({ activeWallet, tx })

            const txRes = await activeWallet.waitForTx(unlockTx?.hash)

            return txRes
        }, null)()

        if (error || !res?.success) {
            toast(ethersContractExecutionError(error ?? res?.error))

            reset()

            return
        }

        return res
    }

    return { unlockNft, processing }
}

export default useUnlockNft
