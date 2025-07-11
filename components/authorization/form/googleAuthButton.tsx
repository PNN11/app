import { FC, useEffect, useState } from 'react'

import SmallButton, { ButtonProps } from 'components/common/ui/buttons/newSmallButton'
import { ConditionalLink } from 'components/common/ui/conditionalLink'
import Google from 'components/svg/google'
import { isIOS } from 'utils/deviceDetection/is-ios'
import { isWebview } from 'utils/webview/sign-in'

type Props = ButtonProps

const GoogleAuthButton: FC<Props> = ({ title = 'Sign in with Google', ...props }) => {
    const [isIosInWebView, setIsIosInWebView] = useState(false)
    const [isWebView, setIsWebView] = useState(false)

    useEffect(() => {
        if (isWebview() && isIOS()) setIsIosInWebView(true)
        if (isWebview()) setIsWebView(true)
    }, [])

    if (isIosInWebView || isWebView) return null

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/google-auth/oauth`

    const handleClick = (): void => {
        if (isWebView) {
            // eslint-disable-next-line no-restricted-globals
            location.href = `GOOGLE_SCHEME://host?url=${url}`
        }
    }

    return (
        <ConditionalLink condition={!isWebView} href={url}>
            <SmallButton
                {...props}
                variant="outlined"
                className="mt-3 w-full gap-2 pt-3 pb-3 text-lg"
                onClick={handleClick}
            >
                <Google /> {title}
            </SmallButton>
        </ConditionalLink>
    )
}

export default GoogleAuthButton
