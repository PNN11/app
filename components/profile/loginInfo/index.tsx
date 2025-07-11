import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import WrapperBlock from '../wrapperBlock'

import ProfileEmailInfo from './profileEmailInfo'
import ProfileEmailInput from './profileEmailInput'

import ProfileInfoInput from 'components/profile/loginInfo/profileInfoInput'
import { useHydrated } from 'hooks/useHydrated'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { getDefaultNextAttemptTime } from 'utils/date/nextAttempt'
import { HttpError } from 'utils/httpError'

const LoginInfo: FC = () => {
    const router = useRouter()
    const [valuePassword] = useState('password123')
    const isHydrated = useHydrated()

    const email = useUserStore(state => state.email)

    const authService = useServiceStore(state => state.authService)

    const sendCodeForEmailChange = useMutation(authService.email.sendCodeForChange, {
        async onSuccess() {
            router.push({
                pathname: `/auth/email/change/confirm`,
                query: { email: email?.value, nextAttemptTime: getDefaultNextAttemptTime() },
            })
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const sendCodeForEmailConfirm = useMutation(authService.email.sendCode, {
        async onSuccess() {
            router.push({
                pathname: `/auth/email/confirm`,
                query: { email: email?.value, nextAttemptTime: getDefaultNextAttemptTime() },
            })
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const handleClickEmailButton = (): void => {
        if (email?.isConfirmed) {
            return sendCodeForEmailChange.mutate({})
        }

        return sendCodeForEmailConfirm.mutate({ email: email?.value })
    }

    return (
        <WrapperBlock title="Email & Password">
            <div className="flex flex-col gap-y-2">
                {isHydrated && email?.value ? (
                    <ProfileEmailInfo
                        title="Email"
                        email={email?.value}
                        isConfirmed={email?.isConfirmed}
                        onChangeButtonClick={handleClickEmailButton}
                    />
                ) : (
                    <ProfileEmailInput title="Email" />
                )}
                <ProfileInfoInput
                    title="Password"
                    value={valuePassword}
                    type="password"
                    name="password"
                    onChangeButtonClick={() => {
                        router.push(`/auth/password/reset?email=${email?.value}`)
                    }}
                />
            </div>
        </WrapperBlock>
    )
}

export default LoginInfo
