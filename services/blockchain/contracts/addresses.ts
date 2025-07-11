import {
    CollectionFactoryABI,
    MarketplaceGalleryAbi,
    mainnetChainConfigs,
    stakingContractAbi,
    testnetChainConfigs,
} from '@arenavs/blockchain-configs'
import { ethers } from 'ethers'

import { TChainIds } from 'services/wallets/blockchainProvider'

export type ContractsAddresses = Record<
    TChainIds,
    {
        gallery: string
        collectionFactory: string
        staking: string
        galleryContract: ethers.Contract
        collectionFactoryContract: ethers.Contract
        stakingContract: ethers.Contract
    }
>

export const contractsInfo: ContractsAddresses = [
    ...testnetChainConfigs,
    ...mainnetChainConfigs,
].reduce((acc, curr) => {
    return {
        ...acc,
        [curr.eth.id.hex]: {
            gallery: curr.eth.galleryAddress,
            collectionFactory: curr.eth.factoryAddress,
            staking: curr.eth.stakingAddress,
            galleryContract: new ethers.Contract(curr.eth.galleryAddress, MarketplaceGalleryAbi),
            collectionFactoryContract: new ethers.Contract(
                curr.eth.factoryAddress,
                CollectionFactoryABI
            ),
            stakingContract: new ethers.Contract(curr.eth.stakingAddress, stakingContractAbi),
        },
    }
}, {} as ContractsAddresses)
