import { useEffect, useRef } from 'react'

import { useQuery } from 'react-query'
import { Id, toast } from 'react-toastify'

import useGetMnemonic from './useGetMnemonic'
import { useThirdPartyCookieCheck } from './useThirdPartyCookiesCheck'

import sesameService from 'services/sesamelabs'
import useUserStore from 'store/useUserStore'

const useSesameAuth = (): void => {
    const accessToken = useUserStore(store => store.accessToken)
    const { data } = useGetMnemonic()
    const isThirdPartyCookieEnabled = useThirdPartyCookieCheck()
    const toastInfo = useRef<{ id: Id; isShowed: boolean }>(null)

    useQuery(['login-into-sesame'], () => sesameService.login(data.addresses[0].address), {
        enabled: !!data?.addresses?.[0]?.address && sesameService.isSesameWidgetReady(),
        onError(err) {
            console.log(err)
        },
    })

    useEffect(() => {
        if (!accessToken) {
            sesameService.close()
        }
    }, [accessToken])

    useEffect(() => {
        if (accessToken && isThirdPartyCookieEnabled === false) {
            if (toast.isActive(toastInfo.current?.id) || toastInfo.current?.isShowed) return

            const id = toast(
                'For authorization to Sesame widget please allow Third Party Cookie in your browser settings.',
                { delay: 1500, toastId: 'cookie-msg' }
            )

            toastInfo.current = { id, isShowed: true }
        }
    }, [accessToken, isThirdPartyCookieEnabled])
}

export default useSesameAuth
