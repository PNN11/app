import { FC, InputHTMLAttributes } from 'react'

import { useField } from 'formik'

type DefaultInputPropsType = InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string
    placeholder?: string
    className?: string
}

export const DefaultTextarea: FC<DefaultInputPropsType> = ({
    name,
    placeholder,
    className = '',
    ...props
}) => {
    const [formikField, formikMeta] = useField<string>(name)

    return (
        <div
            className={`rounded-input bg-inputBg px-7.5 text-lg text-base-100 ${className}  ${
                formikMeta.touched && formikMeta.error
                    ? 'border-2 border-error bg-error bg-opacity-20'
                    : ''
            }`}
        >
            <textarea
                className="h-45 w-full resize-none bg-transparent py-4 outline-none"
                placeholder={placeholder}
                {...props}
                {...formikField}
            />
        </div>
    )
}
