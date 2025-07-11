import deepmerge from 'deepmerge'
import { NextRouter } from 'next/router'
import qs from 'qs'

import { FILTER_KEY } from './const'

export function queryStringToObject(value: string): Record<string, string> {
    return Array.from(new URLSearchParams(value)).reduce((prev, [key, value]) => {
        // eslint-disable-next-line no-param-reassign
        prev[key] = value

        return prev
    }, {})
}

export function applySelector<T, S>(
    selector: (store: T) => S,
    store: T,
    defaultValue: S | null = null
): S | null {
    try {
        return selector(store) ?? defaultValue
    } catch (e: unknown) {
        return defaultValue
    }
}

export const overwriteMerge = (destinationArray: any[], sourceArray: any[]): any[] => sourceArray

export const merge = (...args: any[]): any =>
    deepmerge.all(
        args.map(item => item || {}),
        {
            arrayMerge: overwriteMerge,
        }
    )

export const getRoutingQueryParams = (router: NextRouter): Record<string, string> =>
    Array.from(router.pathname.matchAll(/\[(.*?)\]/g))
        .map(([, key]) => key)
        .reduce((prev, key) => {
            // eslint-disable-next-line no-param-reassign
            prev[key] = router.query[key]

            return prev
        }, {})

export const clearFilterQueryParams = (router: NextRouter): void => {
    const routingParams = getRoutingQueryParams(router)

    const queryNow = window.location.search.replace('?', '')
    const queryObj = qs.parse(decodeURI(queryNow))

    delete queryObj[FILTER_KEY]

    router?.replace(
        {
            pathname: router.pathname,
            query: merge(routingParams, queryObj),
        },
        '',
        { scroll: false }
    )
}
