import useUserStore from 'store/useUserStore'
import { maskInfo } from 'utils/mask-info'

const useGetAddressOwner = (address: string, short = true): string => {
    const wallets = useUserStore(state => state.wallets)
    const owner = wallets.some(wallet => wallet.address === address)

    if (owner) return 'you'

    if (short) return maskInfo(address)

    return address
}

export default useGetAddressOwner
