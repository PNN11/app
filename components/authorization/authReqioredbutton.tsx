import React, { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import SmallButton, { ButtonProps } from 'components/common/ui/buttons/newSmallButton'
import useUserStore from 'store/useUserStore'

type Props = ButtonProps & {
    text: string
    children: React.ReactNode
}

const AuthRequiredButton: FC<Props> = ({ text, children, ...props }) => {
    const accessToken = useUserStore(s => s.accessToken)
    const router = useRouter()

    const hasAccessToken = Boolean(accessToken)

    if (!hasAccessToken)
        return (
            <Link href={{ pathname: `/auth/sign-in`, query: { referer: router.asPath } }}>
                <SmallButton {...props} onClick={() => {}}>
                    {text}
                </SmallButton>
            </Link>
        )

    return <SmallButton {...props}>{children}</SmallButton>
}

export default AuthRequiredButton
