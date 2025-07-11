import { useEffect } from 'react'

import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import useUserStore from '../store/useUserStore'

import userService from 'services/api/user'
import useAuthStore from 'store/useAuthStore'
import { HttpError } from 'utils/httpError'

export const useGetUserInfo = (_onSuccess = () => {}): (() => void) => {
    const setUser = useUserStore(state => state.setUser)

    const getProfileQuery = useQuery(
        'get-user-profile',
        () => {
            return userService.getUserInfo()
        },
        {
            onSuccess(data) {
                setUser({
                    userId: data._id,
                    email: data.email,
                    userName: data.username,
                    wallets: data.wallets,
                    image: data.image,
                    currencies: data.currencies,
                })
                _onSuccess()
            },
            onError(error) {
                if (error instanceof HttpError) toast(error.message)
            },
            enabled: false,
            cacheTime: 0,
        }
    )

    return getProfileQuery.refetch
}

export const useGetUserInfoState = (): boolean => {
    const isAuth = useAuthStore(state => state.isAuth)
    const { isLoading } = useQuery('get-user-profile', { enabled: false })

    return !isAuth || isLoading
}

export const useSetAuthorizedUser = (): void => {
    const isAuth = useAuthStore(state => state.isAuth)
    const accessToken = useUserStore(store => store.accessToken)
    const getUserInfo = useGetUserInfo()

    useEffect(() => {
        if (isAuth && accessToken?.token) {
            getUserInfo()
        }
    }, [isAuth, accessToken, getUserInfo])
}
