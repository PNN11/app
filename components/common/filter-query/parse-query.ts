import qs from 'qs'

export function parseQuery<T extends any = any>(query: string): T {
    return qs.parse(decodeURI(query)) as T
}
