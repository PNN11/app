import { useEffect } from 'react'

import { useRouter } from 'next/router'

import useUserStore from 'store/useUserStore'

const useRedirect = (): void => {
    const token = useUserStore(state => state.accessToken?.token)

    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/auth/sign-up')
        }
    }, [])
}

export default useRedirect
