import create from 'zustand'

type UseAuthStateType = {
    isAuth: boolean
}
type UseAuthDispatchType = {
    setAuthState: (authState: Partial<UseAuthStateType>) => void
}
type UseAuthStoreType = UseAuthStateType & UseAuthDispatchType

const initialState: UseAuthStateType = {
    isAuth: false,
}

const useAuthStore = create<UseAuthStoreType>(set => ({
    ...initialState,

    setAuthState: state => {
        set(state)
    },
}))

export default useAuthStore
