import { AxiosInstance } from 'axios'

import { Core } from 'common-types/core'
import { HttpError } from 'utils/httpError'

const requestHandler = {
    apply(target: any, thisArg: any, args: any) {
        return (Reflect.apply(target, thisArg, args) as Promise<unknown>).catch(e => {
            if (e.response?.data?.message)
                throw new HttpError(
                    (e.response.data as Core.IServerError).message,
                    e.response.status
                )
            if (e.response?.status) throw new HttpError('Request error', e.response.status)

            throw new Error('Unknown error')
        })
    },
}

const interceptMethods = ['post', 'get', 'patch', 'put']

const instanceHandler = {
    get(target: any, prop: any, reciver: any) {
        if (interceptMethods.includes(prop))
            return new Proxy(Reflect.get(target, prop, reciver), requestHandler)

        return Reflect.get(target, prop, reciver)
    },
}

export const AddHtmlError = (axios: AxiosInstance): AxiosInstance =>
    new Proxy<AxiosInstance>(axios, instanceHandler)
