import { toast } from 'react-toastify'

import { getCollectionContract } from 'services/blockchain/contracts'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { AllowanceERC721Func } from 'utils/types/blockchainHooks'

/**
Gets the approved address for an ERC721 token on the Ethereum blockchain.
@param {Object} params - The parameters for the function.
@param {WalletAdapter} params.activeWallet - The active wallet to use for signing transactions.
@param {string} params.tokenId - The id of the token to get the approved address for.
@param {string} params.collectionAddress - The address of the collection contract that owns the token.
@returns {Promise<string>} A promise that resolves to the address of the account that is approved to transfer the token, or rejects with an error if the contract execution fails. 
*/
export const ethereumApprovedAddressERC721: AllowanceERC721Func = async ({
    activeWallet,
    tokenId,
    collectionAddress,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = getCollectionContract({ collectionAddress, signer })

    try {
        const approvedAddress = await contract.getApproved(tokenId)

        return approvedAddress
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
