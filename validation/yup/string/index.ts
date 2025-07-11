import * as Yup from 'yup'
import { AnyObject } from 'yup/es/types'

import referralService from 'services/api/referral'

const minLengthText = 15
const maxLengthText = 200
const minLengthName = 3
const maxLengthName = 50
const minLengthPassword = 8
const trimMessage = 'Remove leading and trailing whitespaces'
const requiredFieldMessage = 'Required field'

export const email = (
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string().trim(trimMessage).strict().email('Check your e-mail address')

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const name = (
    label: string,
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string()
        .min(
            minLengthName,
            `${label[0].toUpperCase() + label.slice(1)} must be longer than 3 characters `
        )
        .max(
            maxLengthName,
            `${label[0].toUpperCase() + label.slice(1)} must be shorter than 50 characters `
        )
        .matches(
            /^[0-9,a-z,A-Z]+$/g,
            'Username must contain only uppercase, lowercase letters and numbers'
        )

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const walletAddress = (
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string()
        .trim(trimMessage)
        .strict()
        .matches(
            /^[0-9,a-f,A-F,X,x]+$/g,
            'Wallet address must contain only uppercase, lowercase letters from A to F and numbers'
        )
        .length(42, 'Wallet address must be 42 characters')

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const password = (
    label: string,
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string()
        .min(
            minLengthPassword,
            `${label[0].toUpperCase() + label.slice(1)} must be longer than 8 characters`
        )
        .matches(
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g,
            'Password must contain one uppercase letter, one lowercase letter and a number'
        )
        .trim(trimMessage)
        .strict()

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const url = (
    label: string,
    required: boolean = false,
    text: string = ''
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string().url(text)

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const trimmed = (
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string().trim(trimMessage).strict()

    if (required) return schema.required(requiredFieldMessage)

    return schema
}

export const text = (
    label: string,
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const schema = Yup.string()
        .min(
            minLengthText,
            `${label[0].toUpperCase() + label.slice(1)} should be at least 15 characters`
        )
        .max(
            maxLengthText,
            `${label[0].toUpperCase() + label.slice(1)} must be shorter than 500 characters`
        )

    if (required) return schema.required(requiredFieldMessage)

    return schema
}
export const required = (
    label: string = requiredFieldMessage
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    return Yup.string().required(label)
}

export const validateReferralCode = async (code: string): Promise<boolean> => {
    const res = await referralService.validateReferralCode({ code })

    return res.isExists
}

export const select = <T>(
    options: T[],
    getValue: (item: T) => string,
    required: boolean = false
): Yup.StringSchema<string | undefined, AnyObject, string | undefined> => {
    const values = options.map(item => `(${getValue(item)})`)
    const regEx = new RegExp(values.join('|'))
    const schema = Yup.string().matches(regEx, `Select valid option`)

    if (required) return schema.required(requiredFieldMessage)

    return schema
}
