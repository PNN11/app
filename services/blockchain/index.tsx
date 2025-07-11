import ethServices from './eth/eth.service'
import { BlockchainService } from './types'

import { Web3Core } from 'common-types/web3core'
import { TChainIds } from 'services/wallets/blockchainProvider'

const blockchainServices: Record<Web3Core.ChainType, Record<TChainIds, BlockchainService>> = {
    ETH: ethServices,
}

export const getRequiredBlockchainService = ({
    chainId,
    chainType,
}: {
    chainType: Web3Core.ChainType
    chainId: TChainIds
}): BlockchainService => {
    return blockchainServices[chainType][chainId]
}

export default blockchainServices
