import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { MysteryBoxAbi } from 'utils/abi/marketplace/mystery-box.abi'
import { ethersContractExecutionError } from 'utils/errors/ethers'
import { EthersContract } from 'utils/ethers/contract'
import { OpenBoxFunc } from 'utils/types/blockchainHooks'

export const ethereumOpenBox: OpenBoxFunc = async ({
    boxId,
    collection,
    contextId,
    activeWallet,
}) => {
    const signer = await activeWallet.getSigner()

    const contract = new EthersContract(
        MysteryBoxAbi,
        process.env.NEXT_PUBLIC_MYSTERY_BOX_CONTRACT,
        signer
    )
    const _contextId = ethers.BigNumber.from(contextId)
    const _tokenBoxId = ethers.BigNumber.from(boxId)

    try {
        await contract.estimate('openBox', {
            collection,
            contextId: _contextId,
            tokenBoxId: _tokenBoxId,
        })

        const tx = await contract.method('openBox', {
            collection,
            contextId: _contextId,
            tokenBoxId: _tokenBoxId,
        })

        const result = await tx.wait()

        const args = contract.getEventArgs(result.events, 'OpenBox')

        if (!args) throw new Error('Failed to find Open box event')

        return { hash: tx.hash, tokenId: args.droppedTokenId }
    } catch (error) {
        toast(ethersContractExecutionError(error))
    }
}
