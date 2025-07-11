import { Auth } from 'common-types/auth'
import { Core } from 'common-types/core'
import axiosClient, { authAxiosClient } from 'services/axios'
import { EmptyRequestFn, RequestFn } from 'utils/types/api'

export class AuthService {
    conferenceSignUp: RequestFn<
        { email: string; referralCode: string; recaptcha?: string },
        Auth.TJwtTokensResponse
    > = async ({ recaptcha, ...body }) => {
        const response = await axiosClient.post('/api/v1/auth/conference-sign-up', body, {
            headers: { recaptcha },
        })

        const data = response.data as Auth.TJwtTokensResponse

        return data
    }

    signUp: RequestFn<{
        email: string
        user: {
            name: string
            password: string
        }
        referralCode?: string
        lastName?: string
        firstName?: string
        photoHash?: string
        isSubscribeNewsletter?: boolean
        recaptcha?: string
    }> = async ({ recaptcha, ...body }) => {
        const response = await axiosClient.post('/api/v1/auth/sign-up', body, {
            headers: { recaptcha },
        })

        return response.data
    }

    signIn: RequestFn<
        { username: string; password: string; recaptcha?: string },
        Auth.TJwtTokensResponse
    > = async ({ username, password, recaptcha }) => {
        const response = await axiosClient.post(
            '/api/v1/auth/sign-in',
            {
                login: username,
                password,
            },
            { headers: { recaptcha } }
        )

        const data = response.data as Auth.TJwtTokensResponse

        return data
    }

    refresh: RequestFn<{ token: string }, Auth.TJwtTokenResponse> = async ({ token }) => {
        const response = await axiosClient.post('/api/v1/auth/refresh-token', undefined, {
            headers: {
                'refresh-token': token,
            },
        })

        const data = response.data as Auth.TJWTAccessTokenResponse

        return data.accessToken
    }

    guestSignUp: RequestFn<{ recaptcha: string }, Auth.TJwtTokensResponse> = async ({
        recaptcha,
    }) => {
        const response = await axiosClient.post('/api/v1/auth-guest/sign-up', null, {
            headers: { recaptcha },
        })

        return response.data
    }

    email: {
        change: RequestFn<{ email: string; accessToken: string }>
        bindNewEmail: RequestFn<{ email: string }>
        confirmationChangeEmail: RequestFn<void, Auth.TNextAttemptResponse>
        sendCode: RequestFn<{ email: string }, Auth.TNextAttemptResponse>
        sendCodeForChange: EmptyRequestFn<{
            code: string
            message: string
            payload: { nextAttempt: number }
            statusCode: string
            type: string
        }>
        getConfirmationNextAttemptTime: RequestFn<{ email: string }, Auth.TNextAttemptResponse>
        getChangeNextAttemptTime: RequestFn<{ email: string }, Auth.TNextAttemptResponse>
        confirm: RequestFn<{ code: string; email: string }, Auth.TJwtTokensResponse>
        confirmChange: RequestFn<{ code: string; email: string }, Auth.TJWTAccessTokenResponse>
    } = {
        change: async ({ email, accessToken }) => {
            await axiosClient.patch(
                '/api/v1/user/new-email',
                { email },
                { headers: { 'access-token': accessToken } }
            )
        },
        bindNewEmail: async ({ email }) => {
            await authAxiosClient.post('/api/v1/email-auth/bind-profile', {
                email,
            })
        },
        confirmationChangeEmail: async () => {
            const response = await axiosClient.patch<Auth.TNextAttemptResponse | Core.IServerError>(
                '/api/v1/email-auth/confirmation-change-email'
            )

            return response.data as Auth.TNextAttemptResponse
        },
        sendCode: async ({ email }) => {
            const response = await authAxiosClient.post(
                '/api/v1/email-auth/send-code-for-confirmation-email',
                { email }
            )

            return response.data
        },
        sendCodeForChange: async () => {
            const response = await authAxiosClient.post(
                '/api/v1/email-auth/send-code-for-change-email'
            )

            return response.data
        },
        getConfirmationNextAttemptTime: async ({ email }) => {
            const response = await authAxiosClient.get(
                `/api/v1/email-auth/confirmation-email-next-attempt`,
                { params: { email } }
            )

            return response.data as Auth.TNextAttemptResponse
        },
        getChangeNextAttemptTime: async ({ email }) => {
            const response = await authAxiosClient.get(
                `/api/v1/email-auth/change-email-next-attempt`,
                { params: { email } }
            )

            return response.data as Auth.TNextAttemptResponse
        },
        confirm: async ({ code, email }) => {
            const response = await axiosClient.patch('/api/v1/email-auth/confirmation-email', {
                code,
                email,
            })

            const data = response.data as Auth.TJwtTokensResponse

            return data
        },
        confirmChange: async ({ code, email }) => {
            const response = await axiosClient.patch(
                '/api/v1/email-auth/confirmation-change-email',
                {
                    code,
                    email,
                }
            )

            const data = response.data as Auth.TJwtTokensResponse

            return data
        },
    }

    password: {
        sendCode: RequestFn<{ email: string }, Auth.TNextAttemptResponse>
        confirm: RequestFn<{ email: string; code: string }, { accessToken: Auth.TJwtToken }>
        getNextAttemptTime: RequestFn<{ email: string }, Auth.TNextAttemptResponse>
        setNew: RequestFn<{ password: string; token: string }>
    } = {
        sendCode: async ({ email }) => {
            const response = await axiosClient.post(
                '/api/v1/email-auth/password-recovery-request',
                {
                    email,
                }
            )

            return response.data.payload
        },
        confirm: async ({ code, email }) => {
            const response = await axiosClient.post(
                '/api/v1/email-auth/confirmation-password-recovery',
                {
                    email,
                    code,
                }
            )

            return response.data as { accessToken: Auth.TJwtToken }
        },
        getNextAttemptTime: async ({ email }) => {
            const response = await axiosClient.post(
                `/api/v1/email-auth/password-recovery-next-attempt`,
                { email }
            )

            return response.data
        },
        setNew: async ({ password, token }) => {
            await axiosClient.patch(
                '/api/v1/user/new-password',
                { password },
                { headers: { 'access-token': token } }
            )
        },
    }
}

const authService = new AuthService()

export default authService
