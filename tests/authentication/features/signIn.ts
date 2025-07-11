import { Implementation } from 'ava'
import { AuthService } from 'services/api/auth'
import { credentials } from '../config'

const signIn: Implementation<[], unknown> = async t => {
    const service = new AuthService()

    const response = await service.signIn(credentials)

    t.not(response?.accessToken?.token, undefined)
}

export default signIn
