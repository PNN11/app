import { Implementation } from 'ava'
import { AuthService } from 'services/api/auth'
import { UserService } from 'services/api/user'
import { HttpError } from 'utils/httpError'

const notAuthorized: Implementation<[], unknown> = async t => {
    const service = new UserService()

    const value = await t.throwsAsync(service.getUserInfo)
    t.is((value as HttpError).status, 401)
}

export default notAuthorized
