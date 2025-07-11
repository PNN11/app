import { ERC20Abi, ERC721Abi } from '@arenavs/blockchain-configs'
import { TransactionResponse } from '@ethersproject/providers'
import BigNumber from 'bignumber.js'
import { Contract, PayableOverrides, PopulatedTransaction, Signer, ethers } from 'ethers'

import { contractsInfo } from '../contracts/addresses'
import {
    AllowanceERC20Params,
    AllowanceERC721Params,
    ApproveListingParams,
    ApproveParams,
    BidParams,
    BlockchainService,
    BuyNativeParams,
    BuyParams,
    CancelBidParams,
    CancelListingParams,
    ClaimParams,
    CreateListingParams,
    EstimateFeeParams,
    GetERC20BalanceParams,
    GetSignedCollectionContractParams,
    LockTokenParams,
    LowerListingPriceParams,
    MintParams,
    SendERC20CurrencyParams,
    SendTransactionParams,
    UnlockTokenParams,
} from '../types'

import { TChainIds, blockchains } from 'services/wallets/blockchainProvider'
import { WalletAdapter } from 'services/wallets/types'
import { NATIVE_CURRENCY_ADDRESS } from 'utils/constants/blockchain'
import { toBigNumber } from 'utils/math/ethers/toBigNumber'

BigNumber.config({ EXPONENTIAL_AT: 100 })

class ETHService implements BlockchainService {
    galleryContract: ethers.Contract

    stakingContract: ethers.Contract

    constructor(chainId: TChainIds) {
        this.galleryContract = contractsInfo[chainId].galleryContract
        this.stakingContract = contractsInfo[chainId].stakingContract
    }

    protected _getCollectionContract(collectionAddress: string): Contract {
        return new ethers.Contract(collectionAddress, ERC721Abi)
    }

    protected async _getSignedCollectionContract({
        activeWallet,
        collectionAddress,
    }: GetSignedCollectionContractParams): Promise<Contract> {
        const signer = await activeWallet.getSigner()

        return new ethers.Contract(collectionAddress, ERC721Abi, signer)
    }

    protected _toBigNumber(value: string | number, decimals: number): ethers.BigNumber {
        return ethers.BigNumber.from(
            BigNumber(value).multipliedBy(BigNumber(10).pow(decimals)).toString()
        )
    }

    protected _add20PercentToGasLimit(gasLimit: ethers.BigNumber): ethers.BigNumber {
        return gasLimit.mul(12).div(10)
    }

    protected _getERC20Contract({
        signer,
        tokenAddress,
    }: {
        tokenAddress: string
        signer: Signer
    }): Contract {
        return new ethers.Contract(tokenAddress, ERC20Abi, signer)
    }

    async getERC20Balance({ activeWallet, tokenAddress }: GetERC20BalanceParams): Promise<number> {
        const signer = await activeWallet.getSigner()
        const address = await activeWallet.getAddress()
        const tokenContract = this._getERC20Contract({ signer, tokenAddress })

        const balance = await tokenContract.balanceOf(address)

        return balance
    }

    async sendCurrency({
        activeWallet,
        tokenAddress,
        amount,
        recipientAddress,
        decimals,
    }: SendERC20CurrencyParams): Promise<PopulatedTransaction> {
        const signer = await activeWallet.getSigner()
        const erc20Contract = this._getERC20Contract({ signer, tokenAddress })
        const _amount = this._toBigNumber(amount, decimals)

        if (tokenAddress === NATIVE_CURRENCY_ADDRESS) {
            return signer.populateTransaction({
                to: recipientAddress,
                value: _amount,
            }) as unknown as PopulatedTransaction
        }

        return erc20Contract.populateTransaction.transfer(recipientAddress, _amount)
    }

    async estimateTransactionFee({ activeWallet, tx }: EstimateFeeParams): Promise<number> {
        const signer = await activeWallet.getSigner()

        const gas = await signer.estimateGas(tx)
        const price = await signer.getGasPrice()

        return +ethers.utils.formatEther(gas.mul(price))
    }

    async sendTransaction({
        activeWallet,
        tx,
        addExtraGas = true,
    }: SendTransactionParams): Promise<TransactionResponse> {
        const signer = await activeWallet.getSigner()

        const estimated = await signer.estimateGas(tx)

        const { lastBaseFeePerGas, maxFeePerGas, gasPrice } = await signer.getFeeData()

        const _tx = {
            ...tx,
            gasLimit: addExtraGas ? this._add20PercentToGasLimit(estimated) : estimated,
        }

        if (lastBaseFeePerGas && maxFeePerGas) {
            const price = gasPrice.gte(maxFeePerGas) ? maxFeePerGas : gasPrice

            _tx.maxPriorityFeePerGas = price.sub(lastBaseFeePerGas)
        }

        const res = await signer.sendTransaction(_tx)

        return res
    }

    async getLastBlockTimeStamp(wallet: WalletAdapter): Promise<number> {
        const signer = await wallet.getSigner()
        const lastNumberBlock = await signer.provider.getBlockNumber()

        const lastBlock = await signer.provider.getBlock(lastNumberBlock)

        return lastBlock?.timestamp
    }

    async buyERC20({ listingId }: BuyParams): Promise<PopulatedTransaction> {
        const tx = await this.galleryContract.populateTransaction.buy(listingId)

        return tx
    }

    async buyNative({
        amount,
        decimals,
        listingId,
    }: BuyNativeParams): Promise<PopulatedTransaction> {
        const value = this._toBigNumber(amount, decimals)
        const overrides = {
            value,
        }

        const tx = await this.galleryContract.populateTransaction.buyETH(listingId, overrides)

        return tx
    }

    async mintERC20({
        collectionAddress,
        currency,
        decimals,
        nonce,
        price,
        signature,
        timeEnd,
        timeStart,
        tokenUri,
    }: MintParams): Promise<PopulatedTransaction> {
        const contract = this._getCollectionContract(collectionAddress)
        const startTime = ethers.BigNumber.from(timeStart)
        const endTime = ethers.BigNumber.from(timeEnd)
        const tokenPrice = this._toBigNumber(price, decimals)

        const tx = await contract.populateTransaction.mintWithFixedPrice(
            tokenUri,
            startTime,
            endTime,
            currency,
            tokenPrice,
            nonce,
            signature
        )

        return tx
    }

    async mintNative({
        collectionAddress,
        currency,
        decimals,
        nonce,
        price,
        signature,
        timeEnd,
        timeStart,
        tokenUri,
    }: MintParams): Promise<PopulatedTransaction> {
        const contract = this._getCollectionContract(collectionAddress)
        const startTime = ethers.BigNumber.from(timeStart)
        const endTime = ethers.BigNumber.from(timeEnd)
        const tokenPrice = this._toBigNumber(price, decimals)

        const overrides: PayableOverrides = {
            value: tokenPrice,
        }

        const tx = await contract.populateTransaction.mintWithFixedPrice(
            tokenUri,
            startTime,
            endTime,
            currency,
            tokenPrice,
            nonce,
            signature,
            overrides
        )

        return tx
    }

    async createListing({
        collectionAddress,
        currency,
        decimals,
        listingType,
        minimalBid,
        timeStart,
        timeEnd,
        tokenId,
        bidStep = 1,
        gracePeriod = 0,
    }: CreateListingParams): Promise<PopulatedTransaction> {
        const startTime = ethers.BigNumber.from(timeStart)
        const endTime = ethers.BigNumber.from(timeEnd)
        const id = ethers.BigNumber.from(tokenId)
        const step = ethers.BigNumber.from(bidStep)
        const grace = ethers.BigNumber.from(gracePeriod)

        const minPrice = toBigNumber(minimalBid, decimals)

        const tx = await this.galleryContract.populateTransaction.createListing(
            listingType,
            collectionAddress,
            id,
            startTime,
            endTime,
            currency,
            minPrice,
            step,
            grace
        )

        return tx
    }

    cancelListing = async ({ listingId }: CancelListingParams): Promise<PopulatedTransaction> => {
        const id = ethers.BigNumber.from(listingId)

        const tx = await this.galleryContract.populateTransaction.revertToken(id)

        return tx
    }

    async lowerListingPrice({
        decimals,
        listingId,
        price,
    }: LowerListingPriceParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(listingId)
        const _price = this._toBigNumber(price, decimals)

        const tx = await this.galleryContract.populateTransaction.priceReduction(id, _price)

        return tx
    }

    async bidERC20({ bidPrice, decimals, listingId }: BidParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(listingId)
        const price = this._toBigNumber(bidPrice, decimals)

        const tx = await this.galleryContract.populateTransaction.bid(id, price)

        return tx
    }

    async bidNative({ bidPrice, decimals, listingId }: BidParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(listingId)
        const value = this._toBigNumber(bidPrice, decimals)
        const overrides = {
            value,
        }

        const tx = await this.galleryContract.populateTransaction.bidETH(id, overrides)

        return tx
    }

    claim = async ({ listingId }: ClaimParams): Promise<PopulatedTransaction> => {
        const id = ethers.BigNumber.from(listingId)

        const tx = await this.galleryContract.populateTransaction.claimCollectible(id)

        return tx
    }

    async cancelBid({ listingId }: CancelBidParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(listingId)

        const tx = await this.galleryContract.populateTransaction.cancelBid(id)

        return tx
    }

    async approveERC721({
        approveAddress,
        collectionAddress,
        tokenId,
    }: ApproveListingParams): Promise<PopulatedTransaction> {
        const contract = this._getCollectionContract(collectionAddress)
        const token = ethers.BigNumber.from(tokenId)

        const tx = await contract.populateTransaction.approve(approveAddress, token)

        return tx
    }

    async approveERC20({
        approveAddress,
        amount,
        decimals,
        tokenAddress,
        activeWallet,
    }: ApproveParams): Promise<TransactionResponse> {
        const contract = this._getERC20Contract({
            tokenAddress,
            signer: await activeWallet.getSigner(),
        })
        const price = this._toBigNumber(amount, decimals)

        await contract.estimateGas.approve(approveAddress, price)
        const tx = await contract.approve(approveAddress, price)

        return tx
    }

    async allowanceERC721({
        collectionAddress,
        tokenId,
        activeWallet,
    }: AllowanceERC721Params): Promise<string> {
        const contract = await this._getSignedCollectionContract({
            collectionAddress,
            activeWallet,
        })

        const approvedAddress = await contract.getApproved(tokenId)

        return approvedAddress
    }

    async allowanceERC20({
        approveAddress,
        tokenAddress,
        activeWallet,
    }: AllowanceERC20Params): Promise<ethers.BigNumber> {
        const contract = this._getERC20Contract({
            tokenAddress,
            signer: await activeWallet.getSigner(),
        })

        const address = await activeWallet.getAddress()

        const tx = await contract.allowance(address, approveAddress)

        return tx
    }

    async lock({ collectionAddress, tokenId }: LockTokenParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(tokenId)

        // if (
        //     dev.condition() ||
        //     developersAddresses.find(item => item.toLowerCase() === walletAddress.toLowerCase())
        // ) {
        //     const tx = await this.stakingContract.populateTransaction.lockThreeMinutesERC721(
        //         collectionAddress,
        //         id
        //     )

        //     return tx
        // }

        const tx = await this.stakingContract.populateTransaction.lockWeekERC721(
            collectionAddress,
            id
        )

        return tx
    }

    async unlock({ collectionAddress, tokenId }: UnlockTokenParams): Promise<PopulatedTransaction> {
        const id = ethers.BigNumber.from(tokenId)

        const tx = await this.stakingContract.populateTransaction.revertERC721(
            collectionAddress,
            id
        )

        return tx
    }
}

const ethServices = Object.keys(blockchains).reduce((prev, key) => {
    return { ...prev, [key]: new ETHService(key as TChainIds) }
}, {} as Record<TChainIds, ETHService>)

export default ethServices
