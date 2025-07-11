import { useEffect } from 'react'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import create from 'zustand'

import useAuthStore from './useAuthStore'

import { AuthService } from 'services/api/auth'
import { BlogService } from 'services/api/blog'
import { ConferenceService } from 'services/api/conference'
import { GameService } from 'services/api/game'
import { PageService } from 'services/api/mainPage'
import { MarketplaceService } from 'services/api/marketplace'
import { ReferralService } from 'services/api/referral'
import { SwapService } from 'services/api/swap'
import { UserService } from 'services/api/user'
import { Web3Service } from 'services/api/web3'
import { WheelService } from 'services/api/wheel'
import { authAxiosClient } from 'services/axios'
import FormsService from 'services/forms'
import useUserStore from 'store/useUserStore'
import { applyAuthInterceptors } from 'utils/axios/axios'
import { accessTokenKey } from 'utils/constants/auth'

type Store = {
    authService: AuthService
    web3Service: Web3Service
    gameService: GameService
    swapService: SwapService
    referralService: ReferralService
    marketplaceService: MarketplaceService
    blogService: BlogService
    pageService: PageService
    formsService: FormsService
    wheelService: WheelService
    userService: UserService
    conferenceService: ConferenceService
}
const useServiceStore = create<Store>(() => {
    const authService = new AuthService()

    return {
        authService,
        web3Service: new Web3Service(authService),
        gameService: new GameService(authService),
        swapService: new SwapService(authService),
        referralService: new ReferralService(authService),
        marketplaceService: new MarketplaceService(authService),
        blogService: new BlogService(),
        pageService: new PageService(),
        formsService: new FormsService(),
        wheelService: new WheelService(),
        userService: new UserService(),
        conferenceService: new ConferenceService(),
    }
})

export const useInitAuth = (): void => {
    const authService = useServiceStore(store => store.authService)
    const getAccess = useUserStore(store => store.getAccess)
    const setAccessToken = useUserStore(store => store.setAccessToken)
    const getRefresh = useUserStore(store => store.getRefresh)
    const disconnect = useUserStore(store => store.disconnect)
    const setAuthState = useAuthStore(state => state.setAuthState)

    const router = useRouter()

    useEffect(() => {
        const intercepters = applyAuthInterceptors(
            authAxiosClient,
            getAccess,
            getRefresh,
            async () => {
                const response = await authService.refresh({ token: getRefresh()?.token })

                setAccessToken(response)
                setCookie(accessTokenKey, response.token, {
                    expires: new Date(response.expiresIn),
                })

                return response.token
            },
            async () => {
                disconnect()
                setAuthState({ isAuth: false })
                router.push('/auth/sign-in')
            }
        )

        setAuthState({ isAuth: true })

        return () => {
            authAxiosClient.interceptors.request.eject(intercepters.onRequest)
            authAxiosClient.interceptors.response.eject(intercepters.onResponse)
        }
    }, [])
}

export default useServiceStore
