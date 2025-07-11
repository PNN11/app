import useUserStore from 'store/useUserStore'

const useCheckIsYouWalletOwner = (): ((address: string) => boolean) => {
    const wallets = useUserStore(state => state.wallets)

    const check = (address: string): boolean => {
        return wallets.some(wallet => wallet.address === address)
    }

    return check
}

export default useCheckIsYouWalletOwner
