import {
    MarketplaceGalleryAbi,
    CollectionFactoryABI,
    ERC721Abi,
    stakingContractAbi,
    ERC20Abi,
} from '@arenavs/blockchain-configs'
import { Signer, ethers } from 'ethers'

import { contractsInfo } from './addresses'

import { TChainIds } from 'services/wallets/blockchainProvider'

type GetContractParams = {
    signer: Signer
    chainId: TChainIds
}

type GetCollectionContractParams = {
    collectionAddress: string
    signer: Signer
}

type GetERC20ContractParams = {
    tokenAddress: string
    signer: Signer
}

type GetContractFunc = (params: GetContractParams) => ethers.Contract
type GetCollectionContractFunc = (params: GetCollectionContractParams) => ethers.Contract
type GetERC20ContractFunc = (params: GetERC20ContractParams) => ethers.Contract

export const getGalleryContract: GetContractFunc = ({ signer, chainId }) => {
    const address = contractsInfo[chainId].gallery

    return new ethers.Contract(address, MarketplaceGalleryAbi, signer)
}

export const getCollectionFactoryContract: GetContractFunc = ({ signer, chainId }) => {
    const address = contractsInfo[chainId].collectionFactory

    return new ethers.Contract(address, CollectionFactoryABI, signer)
}

export const getCollectionContract: GetCollectionContractFunc = ({ signer, collectionAddress }) => {
    return new ethers.Contract(collectionAddress, ERC721Abi, signer)
}

export const getStakingContract: GetContractFunc = ({ signer, chainId }) => {
    const address = contractsInfo[chainId].staking

    return new ethers.Contract(address, stakingContractAbi, signer)
}

export const getERC20Contract: GetERC20ContractFunc = ({ signer, tokenAddress }) => {
    return new ethers.Contract(tokenAddress, ERC20Abi, signer)
}
