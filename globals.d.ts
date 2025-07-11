interface Sesame {
    isDev: boolean
    host: string
    hidden: boolean
    isMobile: boolean
    sesameId: string
    open: () => void
    close: () => void
    hide: () => void
    show: () => void
    login: (params: { payload: string; publicKey: string; nonce: string }) => void
    rewardUser: (params: { id: string; xp: number; credits: number; eventName: string }) => void
    isLoggedIn: () => Promise<boolean>
}

interface Window {
    Sesame: Sesame
}
