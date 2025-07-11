import { Implementation } from 'ava'
import { AuthService } from 'services/api/auth'
import { UserService } from 'services/api/user'
import { HttpError } from 'utils/httpError'
import { credentials } from '../config'
import { authAxiosClient } from 'services/axios'
import axios from 'axios'
import { applyAuthInterceptors } from 'utils/axios/axios'
import { Auth } from 'common-types/auth'

const shouldRequestRefresh: Implementation<[], unknown> = async t => {
    const service = new AuthService()

    const response = await service.signIn(credentials)

    let access = {
        ...response.accessToken,
        token: response.accessToken.token + Math.random().toString(),
    } as Auth.TJwtToken
    let refresh = response.refreshToken

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
    })

    const intercepters = applyAuthInterceptors(
        instance,
        () => access,
        () => refresh,
        async () => {
            t.pass('Requested refresh')

            return response.accessToken.token
        },
        async () => {}
    )

    await instance.get('/api/v1/user/my-profile')
}

export default shouldRequestRefresh
