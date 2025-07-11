import { FC, ReactNode } from 'react'

interface InputWrapperProps {
    touched: boolean
    error: string
    name: string
    className?: string
    children: ReactNode
    title: string
    hint?: string
    secondaryTitle?: ReactNode
    description?: string
}

const InputWrapper: FC<InputWrapperProps> = ({
    children,
    error,
    name,
    touched,
    className = '',
    title,
    hint,
    secondaryTitle,
    description,
}) => {
    return (
        <div className={`mb-5 ${className}`}>
            <div className="flex justify-between">
                <label htmlFor={name} className="mb-2 text-sm 2xs:text-custom-base">
                    {title}
                </label>
                {secondaryTitle}
            </div>
            {description && <div className="pb-1 text-base-300">{description}</div>}
            <div className="relative">{children}</div>
            <div className="mt-2 max-w-md text-sm">{hint}</div>
            {touched && error ? <div className="mt-2 mb-5 text-sm text-error">{error}</div> : null}
        </div>
    )
}

export default InputWrapper
