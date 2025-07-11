import { useCallback, useEffect, useRef } from 'react'

import { useRouter } from 'next/router'
import create from 'zustand'

import joinArena from 'components/modals/join'
import openPromotionModal from 'components/modals/join/conference'
import { OmitFunctions } from 'utils/types/helpers'

type JoinStore = {
    haveBeenDisplayed: boolean
    haveBeenConferenceDisplayed: boolean
    timer: NodeJS.Timer
    conferenceTimer: NodeJS.Timer
    readonly displayDelay: number
    readonly threshold: number
    delayOpen: (path: string, callback?: () => void) => boolean
    delayOpenPromotion: (path: string, callback?: () => void) => boolean
    open: () => boolean
    clear: () => void
}

const initialState: OmitFunctions<JoinStore> = {
    displayDelay: 10_000,
    threshold: 0.5,
    haveBeenDisplayed: false,
    haveBeenConferenceDisplayed: false,
    timer: null,
    conferenceTimer: null,
}

const useJoinStore = create<JoinStore>((set, get) => ({
    ...initialState,
    delayOpen: (path, callback) => {
        const { haveBeenDisplayed, displayDelay, timer: _storedTimer } = get()

        if (haveBeenDisplayed) return true

        if (_storedTimer) {
            clearTimeout(_storedTimer)
            set({
                timer: null,
            })
        }

        const timer = setTimeout(() => {
            // @todo redo logic for not opening modal after page change
            // router.events doesn't work, routeChangeError fires even on the same page
            const isSamePage = window.location.pathname === path

            if (!isSamePage) return

            joinArena()
            set({ timer: null, haveBeenDisplayed: false })
            callback?.()
        }, displayDelay)

        set({
            timer,
        })

        return false
    },
    delayOpenPromotion: (path, callback) => {
        const { haveBeenConferenceDisplayed, displayDelay, conferenceTimer: _storedTimer } = get()

        if (_storedTimer) {
            clearTimeout(_storedTimer)
            set({
                conferenceTimer: null,
            })
        }

        const delay = haveBeenConferenceDisplayed ? 3000 : displayDelay

        const timer = setTimeout(() => {
            // @todo redo logic for not opening modal after page change
            // router.events doesn't work, routeChangeError fires even on the same page
            // const isSamePage = window.location.pathname === path

            // if (!isSamePage) return

            openPromotionModal()
            set({ conferenceTimer: null, haveBeenConferenceDisplayed: true })
            callback?.()
        }, delay)

        set({
            conferenceTimer: timer,
        })

        return false
    },
    open: () => {
        const { haveBeenDisplayed, timer } = get()

        if (haveBeenDisplayed) return true

        if (timer) clearTimeout(timer)

        set({ haveBeenDisplayed: false, timer: null })
        joinArena()

        return true
    },
    clear: () => {
        const { timer, conferenceTimer } = get()

        if (timer) {
            clearTimeout(timer)
            set({ timer: null })
        }
        if (conferenceTimer) {
            clearTimeout(conferenceTimer)
            set({ conferenceTimer: null, haveBeenConferenceDisplayed: false })
        }
    },
}))

export default useJoinStore

export const useJoin = (): void => {
    const haveBeenDisplayed = useJoinStore(s => s.haveBeenDisplayed)
    const open = useJoinStore(s => s.open)
    const clear = useJoinStore(s => s.clear)
    const delayOpen = useJoinStore(s => s.delayOpen)
    const threshold = useJoinStore(s => s.threshold)

    const openedRef = useRef(haveBeenDisplayed)

    const prevRef = useRef(0)
    const accRef = useRef(0)
    const startRef = useRef(0)

    const router = useRouter()

    const handler = useCallback(() => {
        if (openedRef.current) return

        const height = document.documentElement.offsetHeight
        const scroll = document.documentElement.scrollTop

        const diff = Math.abs(scroll - prevRef.current)

        prevRef.current = scroll

        if (startRef.current > 0) {
            startRef.current = 0

            return
        }
        if (diff > height * threshold) return

        accRef.current += diff

        if (accRef.current / height > threshold) {
            const opened = open()

            if (opened) window.removeEventListener('scroll', handler)
        }
    }, [])

    useEffect(() => {
        if (haveBeenDisplayed) return
        startRef.current = document.documentElement.scrollTop

        const opened = delayOpen(router.asPath, () => {
            window.removeEventListener('scroll', handler)
        })

        if (opened) return

        window.addEventListener('scroll', handler)

        return () => {
            clear()
            window.removeEventListener('scroll', handler)
        }
    }, [])
}

export const useDepositWithDiscount = (): void => {
    const clear = useJoinStore(s => s.clear)
    const delayOpen = useJoinStore(s => s.delayOpenPromotion)

    const router = useRouter()

    useEffect(() => {
        const handler = (): void => {
            delayOpen(router.asPath)
        }

        handler()

        return () => {
            clear()
        }
    }, [router.asPath])
}
