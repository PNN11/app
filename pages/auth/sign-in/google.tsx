import { useEffect } from 'react'

import { setCookie } from 'cookies-next'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { accessTokenKey, refreshTokenKey } from 'utils/constants/auth'
import { wait } from 'utils/sitemap'
import { webViewSignIn } from 'utils/webview/sign-in'

interface Props {
    access: string
    refresh: string
    lifetime: string
}

const SignInWithGoogle: NextPage<Props> = ({ access, refresh, lifetime }) => {
    const setAccessToken = useUserStore(store => store.setAccessToken)
    const setRefreshToken = useUserStore(store => store.setRefreshToken)
    const setAuthState = useAuthStore(state => state.setAuthState)
    const router = useRouter()

    const expires = new Date(Date.now() + (Number(lifetime) || 0))

    useEffect(() => {
        if (!access || !refresh) {
            router.replace('/sign-in')

            return
        }

        const handler = async (): Promise<void> => {
            try {
                setAccessToken({ token: access, expiresIn: expires.getTime() })
                setRefreshToken({ token: refresh, expiresIn: expires.getTime() })
                setAuthState({ isAuth: true })

                setCookie(refreshTokenKey, refresh)
                setCookie(accessTokenKey, access)

                webViewSignIn({
                    accessToken: { token: access, expiresIn: expires.getTime() },
                    refreshToken: { token: refresh, expiresIn: expires.getTime() },
                })

                await wait(1000)

                await router.replace('/profile')
            } catch (error) {
                router.replace('/sign-in')
            }
        }

        handler()
    }, [])

    return (
        <div className="mt-9 flex justify-center">
            <Image src="/img/loader.png" alt="loading" height={80} width={80} className="loading" />
        </div>
    )
}

export default SignInWithGoogle

export const getServerSideProps: GetServerSideProps = async context => {
    const { access = '', refresh = '', lifetime = '' } = context.query

    return { props: { access, refresh, lifetime } }
}
