import { ethers } from 'ethers'

import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { Web3Core } from 'common-types/web3core'
import { TxBase, TxResult, WalletAdapter } from 'services/wallets/types'

type BaseParamas = {
    activeWallet: WalletAdapter
}

export type BuyParams = BaseParamas & {
    listingId: number
}

export type BuyNativeParams = BaseParamas & {
    listingId: number
    amount: number
    decimals: number
}

export type BuyInternalParams = BaseParamas & {
    listingId: number
    amount: number
    nonce: number
    signature: string
    decimals: number
}

export type ApproveParams = BaseParamas & {
    tokenAddress: string
    amount: number
    decimals: number
    approveAddress: string
}
export type AllowanceERC20Params = BaseParamas & {
    tokenAddress: string
    approveAddress: string
}

export type MintParams = BaseParamas & {
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

export type DepositParams = BaseParamas & {
    amount: number
}

export type WithdrawParams = BaseParamas & {
    params: {
        amount: number
        nonce: number
        signature: any
    }
}

export type CancelListingParams = BaseParamas & {
    listingId: number
}
export type CancelBidParams = BaseParamas & {
    listingId: number
}

export type CancelBidInternalFuncParams = {
    decimals: number
    amount: number
    lastListingId: number
}

export type LowerListingPriceParams = BaseParamas & {
    listingId: number
    price: number
    decimals: number
}

export type CreateListingParams = BaseParamas & {
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

export type ApproveListingParams = BaseParamas & {
    tokenId: number
    collectionAddress: string
    approveAddress: string
}
export type AllowanceERC721Params = BaseParamas & {
    collectionAddress: string
    tokenId: number
}

export type ListingNftParams = BaseParamas & {
    nft: IMarketplaceToken.TBodyResponse
    txInfo: Gallery.TxInfoType
}

export type BidParams = BaseParamas & {
    listingId: number
    bidPrice: number
    decimals: number
}

export type BidInternalParams = BaseParamas & {
    nonce: number
    signature: string
    listingId: number
    bidPrice: number
    decimals: number
}

export type ClaimParams = BaseParamas & {
    listingId: number
}

export type OpenBoxParams = BaseParamas & {
    contextId: number
    boxId: number
    collection: string
}

export type ApproveOpenMysteryBoxParams = BaseParamas & {
    collectionAddress: string
    mysteryBoxId: number
}

export type RevertTokenParams = BaseParamas & {
    listingId: number
}

export type LockTokenParams = BaseParamas & {
    collectionAddress: string
    tokenId: number
}

export type UnlockTokenParams = LockTokenParams

export type BuyFunc = (params: BuyParams) => Promise<TxBase>
export type BuyNativeFunc = (params: BuyNativeParams) => Promise<TxBase>
export type BuyInternalFunc = (params: BuyInternalParams) => Promise<TxBase>
export type ApproveFunc = (params: ApproveParams) => Promise<TxBase>
export type MintFunc = (params: MintParams) => Promise<TxBase>
export type MintInternalFunc = (params: MintInternalParams) => Promise<TxBase>
export type DepositFunc = (params: DepositParams) => Promise<Web3Core.IBaseTxResult>
export type WithdrawFunc = (params: WithdrawParams) => Promise<TxBase>
export type CreateListingFunc = (params: CreateListingParams) => Promise<TxBase>
export type ApproveListingFunc = (params: ApproveListingParams) => Promise<TxBase>
export type ListingNftFunc = (params: ListingNftParams) => Promise<TxResult>
export type CancelBidFunc = (params: CancelBidParams) => Promise<TxBase>
export type CancelBidInternalFunc = (params: CancelBidInternalFuncParams) => Promise<TxResult>
export type LowerListingPriceFunc = (params: LowerListingPriceParams) => Promise<TxResult>
export type BidFunc = (params: BidParams) => Promise<TxBase>
export type BidInternalFunc = (params: BidInternalParams) => Promise<TxBase>
export type AllowanceERC20Func = (params: AllowanceERC20Params) => Promise<ethers.BigNumber>
export type AllowanceERC721Func = (params: AllowanceERC721Params) => Promise<string>
export type OpenBoxFunc = (params: OpenBoxParams) => Promise<TxBase & { tokenId: ethers.BigNumber }>
export type ApproveOpenMysteryBoxFunc = (params: ApproveOpenMysteryBoxParams) => Promise<TxBase>
export type CancelListingFunc = (params: CancelListingParams) => Promise<TxBase>
export type ClaimFunc = (params: ClaimParams) => Promise<TxBase>
export type RevertTokenFunc = (params: RevertTokenParams) => Promise<TxBase>
export type LockTokenFunc = (params: LockTokenParams) => Promise<TxBase>
export type UnlockTokenFunc = (params: UnlockTokenParams) => Promise<TxBase>
