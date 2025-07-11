import { useCallback } from 'react'

import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { Web3Core } from 'common-types/web3core'
import { useGetUserInfo } from 'hooks/useGetUserInfo'
import { WalletAdapter } from 'services/wallets/types'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import useWalletInfoStore from 'store/useWalletInfoStore'
import { getSignature } from 'utils/getSignature'
import { HttpError } from 'utils/httpError'

/**
 * @deprecated after start using custodial wallets
 */
export function useBindWallet(adapter: WalletAdapter): {
    bindWallet: (address: string, chainId: Web3Core.EChainID) => Promise<boolean>
    checkBindWallet: (address: string, chainId: Web3Core.EChainID) => boolean
} {
    const web3Service = useServiceStore(state => state.web3Service)
    const wallets = useUserStore(state => state.wallets)
    const disconnect = useWalletInfoStore(state => state.disconnect)

    const getUserInfo = useGetUserInfo()

    const bindWalletMutation = useMutation(web3Service.bindProfile, {
        onSuccess() {
            getUserInfo()
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
            disconnect()
        },
    })

    const bindWallet = async (address: string, chainId: Web3Core.EChainID): Promise<boolean> => {
        const signature = await getSignature(web3Service, address, chainId, await adapter.getSigner)

        if (signature) {
            await bindWalletMutation.mutateAsync({
                signature,
                chainId,
                address,
                provider: adapter.providerId,
            })

            return true
        }
        disconnect()
    }

    const checkBindWallet = useCallback(
        (address: string, chainId: Web3Core.EChainID): boolean => {
            console.log({ wallets, address, chainId })

            return Boolean(
                wallets.find(
                    wallet =>
                        wallet.address.toLowerCase() === address.toLowerCase() &&
                        wallet.chainId.toLowerCase() === chainId.toLowerCase()
                )
            )
        },
        [wallets]
    )

    return { bindWallet, checkBindWallet }
}
