import { useRouter } from 'next/router'

import useUserStore from 'store/useUserStore'

const useLoggedIn = (): (() => Promise<void>) => {
    const accessToken = useUserStore(store => store.accessToken)
    const { push } = useRouter()

    const ifLogged = (): Promise<void> => {
        if (accessToken?.token) return Promise.resolve()

        push('/auth/sign-in')

        return Promise.reject()
    }

    return ifLogged
}

export default useLoggedIn
