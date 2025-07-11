import test from 'ava'
import signIn from './features/signIn'
import notAuthorized from './features/notAuthorized'
import shouldRequestRefresh from './features/refreshToken'

test('should sign up existing user', signIn)
test('should throw error if not authorized', notAuthorized)
test('should request new access token if requests fails with 401', shouldRequestRefresh)
test.todo('change email')
test.todo('reset password')
