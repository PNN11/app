import create from 'zustand'
import { persist } from 'zustand/middleware'

import { Auth } from 'common-types/auth'
import { Core } from 'common-types/core'
import { Economics } from 'common-types/economics'
import { Web3Core } from 'common-types/web3core'

type UserType = {
    userId: string
    userName: string
    email: { value: string; isConfirmed: boolean }
    image: string
    referralId?: string
    currencies: Economics.IAsset[]
    wallets: Web3Core.TWalletWeb3[]
    accessToken: Core.Nullable<Auth.TJwtToken>
    refreshToken: Core.Nullable<Auth.TJwtToken>
    passwordRecoveryToken: Core.Nullable<Auth.TJwtToken>
    emailChangeToken: Core.Nullable<Auth.TJwtToken>
}
type UserStateType = UserType & {
    setUser: (user: Partial<UserType>) => void
    setUserName: (userName: string) => void
    setReferralId: (referralId: string) => void
    setAccessToken: (token: Auth.TJwtToken) => void
    setRefreshToken: (token: Auth.TJwtToken) => void
    setPasswordRecoveryToken: (token: Auth.TJwtToken) => void
    setEmailChangeToken: (token: Auth.TJwtToken) => void
    getAccess: () => Auth.TJwtToken
    getRefresh: () => Auth.TJwtToken
    disconnect: () => void
}
const initialState: UserType = {
    accessToken: null,
    passwordRecoveryToken: null,
    emailChangeToken: null,
    userId: '',
    userName: '',
    email: { value: '', isConfirmed: false },
    image: '',
    referralId: '',
    refreshToken: null,
    wallets: [],
    currencies: [],
}

const useUserStore = create(
    persist<UserStateType>(
        (set, get) => ({
            ...initialState,

            setUser: user => {
                set(user)
            },
            setAccessToken: token => {
                set({ accessToken: token })
            },
            setRefreshToken: token => {
                set({ refreshToken: token })
            },
            setPasswordRecoveryToken: token => {
                set({ passwordRecoveryToken: token })
            },
            setEmailChangeToken: token => {
                set({ emailChangeToken: token })
            },
            setUserName: userName => {
                set({ userName })
            },
            setReferralId: referralId => {
                set({ referralId })
            },
            getAccess: () => get().accessToken,
            getRefresh: () => get().refreshToken,
            disconnect: () => {
                set(initialState)
            },
        }),
        {
            name: 'user-storage',
            version: 1,
            partialize: state => {
                const obj = { ...state }

                delete obj.passwordRecoveryToken

                return obj
            },
        }
    )
)

export default useUserStore
