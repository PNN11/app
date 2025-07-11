import { RequestService } from './type'

export class RequestProvider {
    private baseURL: string

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    transformParams = (params: Record<string, string> | undefined): string => {
        if (!params) return ''

        const searchParams = new URLSearchParams(params)

        const searchString = searchParams.toString()

        if (searchString === '') return ''

        return searchString
    }

    makeURL = (base: string, endpoint: string, params: string): string => {
        return `${base}/${endpoint}${params === '' ? '' : `?${params}`}`
    }

    public get = async <T extends unknown>(
        endpoint: string,
        options: Partial<RequestService.IOptions>
    ): Promise<T> => {
        const response = await fetch(
            this.makeURL(this.baseURL, endpoint, this.transformParams(options?.params)),
            {
                method: 'GET',
                ...(options.headers ? { headers: options.headers } : {}),
            }
        )

        const json = (await response.json()) as T

        return json
    }

    public post = async <T extends unknown, B extends unknown>(
        endpoint: string,
        data: B,
        options: Partial<RequestService.IOptions>
    ): Promise<T> => {
        const response = await fetch(
            this.makeURL(this.baseURL, endpoint, this.transformParams(options?.params)),
            {
                method: 'POST',
                ...(options.headers
                    ? {
                          headers: {
                              'Content-Type': 'application/json;charset=utf-8',
                              ...options.headers,
                          },
                      }
                    : { 'Content-Type': 'application/json;charset=utf-8' }),
                body: JSON.stringify(data ?? {}),
            }
        )

        const json = (await response.json()) as T

        return json
    }
}
