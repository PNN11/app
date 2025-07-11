import create from 'zustand'

const initialConnectState: { isConnect: boolean } = {
    isConnect: false,
}

type UseWalletConnectInfoDispatchType = {
    disconnect: () => void
    setWalletConnectInfoState: (walletInfoState: Partial<typeof initialConnectState>) => void
}

const useWalletConnectInfoStore = create<
    typeof initialConnectState & UseWalletConnectInfoDispatchType
>(set => ({
    ...initialConnectState,
    disconnect: () => {
        set(initialConnectState)
    },
    setWalletConnectInfoState: state => {
        set(state)
    },
}))

export default useWalletConnectInfoStore
