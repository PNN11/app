import { useEffect, useState } from 'react'

import { isWebview } from 'utils/webview/sign-in'

export type ViewInterface = 'webview' | 'browser'

const useDetectViewInterface = (): ViewInterface => {
    const [viewInterface, setViewInterface] = useState<ViewInterface>()

    useEffect(() => {
        if (isWebview()) setViewInterface('webview')
        else setViewInterface('browser')
    }, [])

    return viewInterface
}

export default useDetectViewInterface
