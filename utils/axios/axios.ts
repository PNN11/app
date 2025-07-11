/* eslint-disable no-param-reassign */
import { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

import { Auth } from 'common-types/auth'

const headerKey = 'access-token'
const authErrorCode = 'unauthorized'
const maxRetryAmount = 3

export function applyAuthInterceptors(
    axios: AxiosInstance,
    getAccessToken: () => Auth.TJwtToken,
    getRefreshToken: () => Auth.TJwtToken,
    onAccessExpired: () => Promise<string | null>,
    logout: () => Promise<void>
): { onRequest: number; onResponse: number } {
    const retryMap = new Map<string, number>()
    let requestsToRefresh: ((token: string) => void)[] = []
    let isRefreshRequesting = false

    const addHeaders =
        (token: string, ignore?: boolean) => (config: InternalAxiosRequestConfig<any>) => {
            if (!ignore && (!token || config.headers?.[headerKey])) return config

            // TODO: remove ts-ignore
            // @ts-ignore
            if (!config.headers) config.headers = { [headerKey]: token }
            else config.headers[headerKey] = token

            return config
        }

    // add access token on request
    const onRequest = axios.interceptors.request.use(
        config => addHeaders(getAccessToken()?.token)(config),
        error => Promise.reject(error)
    )

    const onResponse = axios.interceptors.response.use(
        response => response,
        err => {
            const { response, config } = err

            if (response.status !== 401) {
                throw err
            }

            // check for response being reject because of token
            if (response.status === 401) {
                if (retryMap.get(response.config.url) > maxRetryAmount) {
                    isRefreshRequesting = false
                    requestsToRefresh = []
                    retryMap.clear()
                    logout()

                    return Promise.reject(err)
                }

                if (response.data.code === authErrorCode) {
                    // if not trying to refrehs - refresh
                    if (!isRefreshRequesting) {
                        isRefreshRequesting = true

                        onAccessExpired()
                            .then(token => {
                                isRefreshRequesting = false

                                if (token === null) {
                                    logout()

                                    return Promise.reject(err)
                                }

                                requestsToRefresh.forEach(callback => {
                                    callback(token)
                                })
                                requestsToRefresh = []
                            })
                            .catch(() => {
                                logout()
                            })
                    }
                }

                const { url } = response.config

                retryMap.set(url, (retryMap.get(url) ?? 0) + 1)

                return new Promise((resolve, reject) => {
                    requestsToRefresh.push(token => {
                        if (token) resolve(axios(addHeaders(token, true)(config)))

                        reject(err)
                    })
                })
            }
        }
    )

    return { onRequest, onResponse }
}
