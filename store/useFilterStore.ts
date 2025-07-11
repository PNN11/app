import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'
import qs from 'qs'
import create from 'zustand'

import { FILTER_KEY } from 'components/common/filter-query/const'
import { ParamsQueue } from 'components/common/filter-query/queue'
import { clearFilterQueryParams, merge } from 'components/common/filter-query/utitls'

type Store = {
    filter: any
    resets: any
    mounted: boolean
    queue: ParamsQueue | null
    setFilter: (filter: any) => void
    setResets: (reset: any) => void
    setMounted: (value: boolean) => void
}

const useFilterStore = create<Store>(set => {
    return {
        filter: {},
        resets: {},
        mounted: false,
        queue: new ParamsQueue(),
        setMounted(value: boolean) {
            set({ mounted: value })
        },
        setFilter(filter) {
            if (
                filter === undefined ||
                (typeof filter === 'object' &&
                    !Array.isArray(filter) &&
                    Object.keys(filter).length === 0)
            ) {
                set({ filter: {} })

                return
            }

            set(state => ({
                filter: merge(state.filter, filter),
            }))
        },
        setResets(reset) {
            set(state => ({
                resets: merge(state.resets, reset),
            }))
        },
    }
})

export const useInitFilter = (): void => {
    const setFilter = useFilterStore(store => store.setFilter)
    const setMounted = useFilterStore(store => store.setMounted)
    const mounted = useFilterStore(store => store.mounted)
    const filter = useFilterStore(store => store.filter)
    const queue = useFilterStore(store => store.queue)

    const router = useRouter()

    const routerRef = useRef(null)

    useEffect(() => {
        routerRef.current = router
    }, [router])

    useEffect(() => {
        queue.setRouter(routerRef)

        const queryNow = window.location.search.replace('?', '')
        const queryObj = qs.parse(decodeURI(queryNow))

        setFilter(queryObj?.[FILTER_KEY] ?? { defaultFilter: undefined })

        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && (typeof filter === 'undefined' || Object.keys(filter).length === 0)) {
            clearFilterQueryParams(router)
        }
    }, [filter, mounted])
}

export default useFilterStore
