import { NextRouter } from 'next/router'

export function routerToQuery(router: NextRouter): string {
    const pageParams = Array.from(router.pathname.matchAll(/\[(.*?)\]/g)) as [
        str: string,
        key: string
    ][]

    const path = pageParams.reduce(
        (prev, [str, key]) => prev.replace(str, router.query[key] as string),
        router.pathname
    )

    const withoutPath = router.asPath.replace(path, '')

    if (withoutPath.length === 0) return ''

    return withoutPath.replace(/^\?/, '')
}
