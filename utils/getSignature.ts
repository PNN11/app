import { JsonRpcSigner } from '@ethersproject/providers'
import { toast } from 'react-toastify'

import { Web3Core } from 'common-types/web3core'
import { Web3Service } from 'services/api/web3'

export const getSignature = async (
    web3Service: Web3Service,
    address: string,
    chainId: Web3Core.EChainID,
    getSigner: () => Promise<JsonRpcSigner | null>
): Promise<string> => {
    try {
        const { msg } = await web3Service.getNonceMessage({
            chainId,
            address,
        })

        const signer = await getSigner()

        if (signer) {
            return await signer.signMessage(msg)
        }

        toast('Failed to get signature')

        return ''
    } catch (e) {
        toast('Failed to get signature')

        return ''
    }
}
