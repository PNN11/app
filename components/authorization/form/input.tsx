import { ChangeEvent, FC, useState } from 'react'

import { useField } from 'formik'

import EyeSvg from '../../svg/eyeSvg'

import InputWrapper from './inputWrapper'

export interface IInputProps {
    title: string
    type?: string
    name: string
    hint?: string
    className?: string
    children?: JSX.Element
    errorText?: string
    disabled?: boolean
    autoComplete?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    classes?: { input?: string }
    placeholder?: string
    description?: string
}

const Input: FC<IInputProps> = ({
    title,
    type = 'text',
    name,
    hint,
    className,
    children,
    disabled,
    autoComplete,
    onChange,
    classes = { input: '' },
    placeholder,
    description,
}) => {
    const [formikField, formikMeta] = useField<string>(name)

    const [inputType, setInputType] = useState(type)

    const handleChangeInputType = (): void => {
        if (inputType === 'text') setInputType('password')
        else setInputType('text')
    }

    return (
        <InputWrapper
            error={formikMeta.error}
            name={name}
            title={title}
            touched={formikMeta.touched}
            hint={hint}
            className={className}
            secondaryTitle={children}
            description={description}
        >
            <p />
            <input
                id={name}
                type={inputType}
                disabled={disabled}
                autoComplete={autoComplete}
                placeholder={placeholder}
                {...formikField}
                onChange={onChange || formikField.onChange}
                className={`w-full rounded-2xl border-2 bg-base-800 px-4 py-2.5 ${
                    formikMeta.touched && formikMeta.error
                        ? 'border-error bg-error/20'
                        : 'border-base-800'
                } ${disabled ? 'opacity-50' : ''} ${classes.input}`}
            />
            {type === 'password' ? (
                <span onClick={handleChangeInputType}>
                    <EyeSvg className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" />
                </span>
            ) : (
                ''
            )}
        </InputWrapper>
    )
}

export default Input
