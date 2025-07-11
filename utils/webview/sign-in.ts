import { Auth } from 'common-types/auth'

type WebViewSignInParams = {
    accessToken: Auth.TJwtToken
    refreshToken: Auth.TJwtToken
}

export const isWebview = (): boolean => {
    return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(window.navigator.userAgent)
}

export const webViewSignIn = ({ accessToken, refreshToken }: WebViewSignInParams): void => {
    if (isWebview()) {
        // eslint-disable-next-line no-restricted-globals
        location.href = `ARENA_SDK_SCHEME://host?access=${accessToken.token}&accessExpiresIn=${accessToken.expiresIn}&refresh=${refreshToken.token}&refreshExpiresIn=${refreshToken.expiresIn}`
    }
}
