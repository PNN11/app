import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

import { useField } from 'formik'

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

type PropsType = DefaultInputPropsType & {
    outlined?: boolean
    classes?:{
        error: string
    }
}

export const DefaultInput: FC<PropsType> = ({
    name = '',
    type = 'text',
    className,
    classes,
    placeholder,
    outlined = false,
}) => {
    const [formikField, formikMeta] = useField<string>(name)

    return (
        <div
            className={`px-7.5 rounded-input text-lg text-base-100 ${
                // eslint-disable-next-line no-nested-ternary
                formikMeta.touched && formikMeta.error
                    ? `border-2 border-error bg-error bg-opacity-20 ${classes?.error ?? ""}`
                    : outlined
                    ? 'box-border border border-base-100 border-opacity-20'
                    : `bg-inputBg`
            } ${className}`}
        >
            <input
                type={type}
                className="w-full bg-transparent leading-[4.375rem] outline-none"
                placeholder={placeholder}
                {...formikField}
            />
        </div>
    )
}
