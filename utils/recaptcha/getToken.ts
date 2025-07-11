import { recaptchaActions } from 'utils/constants/auth'

type ActionType = keyof typeof recaptchaActions

type Options = {
    action: ActionType
}

export const getRecaptchaToken = async (options: Options): Promise<string> => {
    // @ts-ignore
    window?.grecaptcha?.ready(() => {})
    // @ts-ignore
    const token = await window?.grecaptcha?.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
        action: options.action,
    })

    return token
}
