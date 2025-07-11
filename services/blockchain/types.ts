import { TransactionResponse } from '@ethersproject/providers'
import { PopulatedTransaction, ethers } from 'ethers'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { WalletAdapter } from 'services/wallets/types'

export type BuyParams = {
    listingId: number
}

export type BuyNativeParams = {
    listingId: number
    amount: number
    decimals: number
}

export type BuyInternalParams = {
    listingId: number
    amount: number
    nonce: number
    signature: string
    decimals: number
}

export type ApproveParams = {
    tokenAddress: string
    amount: number
    decimals: number
    approveAddress: string
    activeWallet: WalletAdapter
}
export type AllowanceERC20Params = {
    tokenAddress: string
    approveAddress: string
    activeWallet: WalletAdapter
}

export type MintParams = {
    collectionAddress: string
    tokenUri: string
    timeStart: number
    timeEnd: number
    currency: string
    price: number
    nonce: number
    signature: string
    decimals: number
}

export type MintInternalParams = MintParams & {
    nonceCollection: number
    signatureCollection: string
}

export type DepositParams = {
    amount: number
}

export type WithdrawParams = {
    params: {
        amount: number
        nonce: number
        signature: any
    }
}

export type CancelListingParams = {
    listingId: number
}
export type CancelBidParams = {
    listingId: number
}

export type CancelBidInternalFuncParams = {
    decimals: number
    amount: number
    lastListingId: number
}

export type LowerListingPriceParams = {
    listingId: number
    price: number
    decimals: number
}

export type CreateListingParams = {
    listingType: number
    collectionAddress: string
    tokenId: number
    timeStart: number
    timeEnd: number
    currency: string
    decimals: number
    minimalBid: number
    bidStep?: number
    gracePeriod?: number
}

export type ApproveListingParams = {
    tokenId: number
    collectionAddress: string
    approveAddress: string
}
export type AllowanceERC721Params = {
    collectionAddress: string
    tokenId: number
    activeWallet: WalletAdapter
}

export type ListingNftParams = {
    nft: IMarketplaceToken.TBodyResponse
    txInfo: Gallery.TxInfoType
}

export type BidParams = {
    listingId: number
    bidPrice: number
    decimals: number
}

export type BidInternalParams = {
    nonce: number
    signature: string
    listingId: number
    bidPrice: number
    decimals: number
}

export type ClaimParams = {
    listingId: number
}

export type OpenBoxParams = {
    contextId: number
    boxId: number
    collection: string
}

export type ApproveOpenMysteryBoxParams = {
    collectionAddress: string
    mysteryBoxId: number
}

export type RevertTokenParams = {
    listingId: number
}

export type LockTokenParams = {
    collectionAddress: string
    tokenId: number
    walletAddress: string
}

export type UnlockTokenParams = Omit<LockTokenParams, 'walletAddress'>

export type SendTransactionParams = {
    tx: PopulatedTransaction
    activeWallet: WalletAdapter
    addExtraGas?: boolean
}

export type GetERC20BalanceParams = {
    activeWallet: WalletAdapter
    tokenAddress: string
}

export type GetSignedCollectionContractParams = {
    collectionAddress: string
    activeWallet: WalletAdapter
}

export type SendERC20CurrencyParams = {
    activeWallet: WalletAdapter
    tokenAddress: string
    recipientAddress: string
    amount: number
    decimals: number
}

export type EstimateFeeParams = {
    tx: PopulatedTransaction
    activeWallet: WalletAdapter
}

export interface BlockchainService {
    buyERC20(params: BuyParams): Promise<PopulatedTransaction>
    buyNative(params: BuyNativeParams): Promise<PopulatedTransaction>
    mintERC20(params: MintParams): Promise<PopulatedTransaction>
    mintNative(params: MintParams): Promise<PopulatedTransaction>
    createListing(params: CreateListingParams): Promise<PopulatedTransaction>
    cancelListing(params: RevertTokenParams): Promise<PopulatedTransaction>
    lowerListingPrice(params: LowerListingPriceParams): Promise<PopulatedTransaction>
    bidERC20(params: BidParams): Promise<PopulatedTransaction>
    bidNative(params: BidParams): Promise<PopulatedTransaction>
    cancelBid(params: CancelBidParams): Promise<PopulatedTransaction>
    claim(params: ClaimParams): Promise<PopulatedTransaction>
    approveERC721(params: ApproveListingParams): Promise<PopulatedTransaction>
    approveERC20(params: ApproveParams): Promise<TransactionResponse>
    allowanceERC721(params: AllowanceERC721Params): Promise<string>
    allowanceERC20(params: AllowanceERC20Params): Promise<ethers.BigNumber>
    lock(params: LockTokenParams): Promise<PopulatedTransaction>
    unlock(params: UnlockTokenParams): Promise<PopulatedTransaction>
    sendTransaction(params: SendTransactionParams): Promise<TransactionResponse>
    getERC20Balance(params: GetERC20BalanceParams): Promise<number>
    getLastBlockTimeStamp(wallet: WalletAdapter): Promise<number>
    sendCurrency(params: SendERC20CurrencyParams): Promise<PopulatedTransaction>
    estimateTransactionFee(params: EstimateFeeParams): Promise<number>
}
