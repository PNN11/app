import { Dispatch, SetStateAction, useEffect } from 'react'

import { useRouter } from 'next/router'

import { parseQuery } from '../components/common/filter-query/parse-query'
import { routerToQuery } from '../components/common/filter-query/routerToQuery'
import { UseFilterStateOptions } from '../components/common/filter-query/types'
import { applySelector } from '../components/common/filter-query/utitls'

import useFilterStore from 'store/useFilterStore'
import { PartialPick, RecursivePartial } from 'utils/types/helpers'

type Options<T> = T extends unknown[]
    ? PartialPick<UseFilterStateOptions<T>, 'remover'>
    : Partial<UseFilterStateOptions<T>>

type QueryStateHook = <T, S>(
    selector: (store: T) => S,
    setter: (value: S) => RecursivePartial<T>,
    options?: Options<S>
) => readonly [S, Dispatch<SetStateAction<S>>]

export function createQueryStore(storeName: string = undefined): QueryStateHook {
    const useQueryState: QueryStateHook = <T, S>(
        selector: (store: T) => S,
        setter: (value: S) => RecursivePartial<T>,
        options: Options<S> = undefined
    ): readonly [S, Dispatch<SetStateAction<S>>] => {
        const router = useRouter()
        const queue = useFilterStore(store => store.queue)
        const setReset = useFilterStore(store => store.setResets)
        const setFilter = useFilterStore(store => store.setFilter)

        const state = useFilterStore(store =>
            applySelector(
                selector,
                (storeName ? store[storeName] : store) as T,
                options?.defaultValue ?? null
            )
        )
        const setState = (value: S): void => {
            let obj = setter(value === '' || value === null ? undefined : value)

            setFilter(obj)

            if (
                value === options?.defaultValue ||
                (typeof value === 'object' &&
                    value &&
                    options?.defaultValue &&
                    JSON.stringify(value) === JSON.stringify(options.defaultValue))
            ) {
                obj = setter(undefined)
            }

            if (storeName)
                queue.set({
                    [storeName]: obj,
                })
            else queue.set(obj)
        }

        useEffect(() => {
            // Appling applySelector function inside useState results in hydration error due to SSG by default
            // In SSG query is always {} on the server and it's differen on client
            setState(
                applySelector(
                    selector,
                    storeName
                        ? parseQuery(routerToQuery(router))?.[storeName]
                        : parseQuery(routerToQuery(router)),
                    options?.defaultValue ?? null
                )
            )

            // set a reset function for badges
            setReset(
                // @ts-ignore
                setter((stored, current) => {
                    const value =
                        (options?.remover
                            ? options.remover(stored, current)
                            : options?.defaultValue) ?? null

                    setState(value as S)

                    // @ts-ignore
                    return setter(value === '' ? undefined : value)
                })
            )

            return () => {
                setReset(setter(undefined))
                setState(undefined)
            }
        }, [])

        return [state, setState] as const
    }

    return useQueryState
}
