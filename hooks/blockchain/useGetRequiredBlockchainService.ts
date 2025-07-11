import { getRequiredBlockchainService } from 'services/blockchain'
import { BlockchainService } from 'services/blockchain/types'
import useWalletStore from 'store/useWalletStore'

const useGetRequiredBlockchainService = (): (() => Promise<BlockchainService>) => {
    const activeWallet = useWalletStore(s => s.activeWallet)

    const getBlockchainService = async (): Promise<BlockchainService> => {
        const chainId = await activeWallet.getChainId()

        return getRequiredBlockchainService({ chainId, chainType: activeWallet.chainType })
    }

    return getBlockchainService
}

export default useGetRequiredBlockchainService
