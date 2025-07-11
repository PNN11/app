import { ChangeEvent, FC } from 'react'

import { useField } from 'formik'

import InputWrapper from './inputWrapper'

export interface TextAreaProps {
    title: string
    name: string
    children?: JSX.Element
    errorText?: string
    disabled?: boolean
    autoComplete?: string
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    classes?: { input?: string; wrapper?: string }
    placeholder?: string
}

const TextArea: FC<TextAreaProps> = ({
    title,
    name,

    children,
    disabled,
    autoComplete,
    onChange,
    classes = { input: '', wrapper: '' },
    placeholder,
}) => {
    const [formikField, formikMeta] = useField<string>(name)

    return (
        <InputWrapper
            error={formikMeta.error}
            name={name}
            title={title}
            touched={formikMeta.touched}
            className={classes.wrapper}
            secondaryTitle={children}
        >
            <textarea
                id={name}
                disabled={disabled}
                autoComplete={autoComplete}
                placeholder={placeholder}
                {...formikField}
                onChange={onChange || formikField.onChange}
                className={`h-24 w-full rounded-2xl border-2 bg-base-800 p-3.5 outline-none ${
                    formikMeta.touched && formikMeta.error
                        ? 'border-error bg-error/20'
                        : 'border-base-800'
                } ${disabled ? 'opacity-50' : ''} ${classes.input}`}
            />
        </InputWrapper>
    )
}

export default TextArea
