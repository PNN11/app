import { BooleanSchema, StringSchema } from 'yup'
import { AnyObject } from 'yup/lib/types'

import { ICheckbox } from 'components/authorization/form/checkbox'
import { IInputProps } from 'components/authorization/form/input'
import { TextAreaProps } from 'components/authorization/form/textArea'
import { PhoneInputPropsType } from 'components/common/ui/inputs/defaultPhoneInput'
import { FileInputProps } from 'components/common/ui/inputs/fileInput'
import { RadioPropsType } from 'components/common/ui/radio/radio'

export type BaseField = {
    title: string
    name: string
    placeholder?: string
    path?: string
    validation?:
        | StringSchema<string | undefined, AnyObject, string | undefined>
        | BooleanSchema<boolean, AnyObject, true>
}

export type TextField = BaseField & { props?: IInputProps; type: 'text' }

export type TextareaField = BaseField & {
    props?: TextAreaProps
    type: 'textarea'
}

export type PhoneField = BaseField & {
    props?: PhoneInputPropsType
    type: 'phone'
}

export type RadioField = BaseField & {
    props?: RadioPropsType
    type: 'radio'
}
export type CheckboxField = BaseField & {
    props?: ICheckbox
    type: 'checkbox'
}

export type FilesField = BaseField & {
    type: 'files'
    props?: FileInputProps
}

export type GroupField = BaseField & {
    type: 'group'
    fields: Field[]
    isSubmitted?: boolean
}

export type Field =
    | TextField
    | TextareaField
    | PhoneField
    | RadioField
    | CheckboxField
    | GroupField
    | FilesField

export type Fields = Field[]
