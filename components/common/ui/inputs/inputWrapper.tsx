import { FC } from 'react'

import { useField } from 'formik'

type InputWrapperPropsType = {
    name: string
    className?: string
    children?: JSX.Element
}

export const InputWrapper: FC<InputWrapperPropsType> = ({ className, children, name }) => {
    const [, meta] = useField<string>(name)

    return (
        <div className={className}>
            <div className="relative">{children}</div>
            {meta.error && meta.touched && (
                <div className="absolute mt-1 text-sm text-error">{meta.error}</div>
            )}
        </div>
    )
}
