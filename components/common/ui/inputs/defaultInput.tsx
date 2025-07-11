import { FC, InputHTMLAttributes } from 'react'

import { useField } from 'formik'

type DefaultInputPropsType = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    type?: 'text' | 'email'
    className?: string
    placeholder?: string
    outlined?: boolean
}

export const DefaultInput: FC<DefaultInputPropsType> = ({
    name,
    type = 'text',
    className,
    placeholder,
    outlined = false,
    ...props
}) => {
    const [formikField, formikMeta] = useField<string>(name)

    return (
        <div
            className={`${
                outlined ? 'box-border border border-base-400' : 'bg-inputBg'
            } text-custom-sm rounded-2xl px-3 text-base-100 placeholder:text-base-400 ${
                formikMeta.touched && formikMeta.error
                    ? 'border border-error bg-error bg-opacity-20'
                    : ''
            } ${className}`}
        >
            <input
                type={type}
                className="h-10 w-full bg-transparent outline-none"
                placeholder={placeholder}
                {...props}
                {...formikField}
            />
        </div>
    )
}
