import { FC, InputHTMLAttributes, useEffect, useRef } from 'react'

import { useField } from 'formik'

import Input from '../../../marketplace/filter/input'

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    patternForRemoveSymbols?: RegExp
    classes?: { wrapper?: string }
}
const FormikInput: FC<PropsType> = ({
    name,
    patternForRemoveSymbols,
    classes = { wrapper: '' },
    ...rest
}) => {
    const [field, meta, { setValue, ...helpers }] = useField(name)
    const ref = useRef<HTMLInputElement>()

    const setValueHelper = (value: string): void => {
        setValue(value.replace(patternForRemoveSymbols, ''))
    }

    useEffect(() => {
        const input = ref.current

        if (!input) {
            return
        }
        const wheelHandler = (e: WheelEvent): void => {
            e.preventDefault()
        }

        if (input.type === 'number') input.addEventListener('wheel', wheelHandler)

        return () => {
            if (input.type === 'number') input.removeEventListener('wheel', wheelHandler)
        }
    }, [])

    return (
        <div className={`relative ${classes.wrapper}`}>
            <Input
                setValue={setValueHelper}
                ref={ref}
                {...field}
                {...meta}
                {...helpers}
                {...rest}
                className={meta.touched && meta.error ? 'border-error bg-error/20' : ''}
            />
            {meta.touched && meta.error && (
                <div className="absolute top-full text-error">{meta.error}</div>
            )}
        </div>
    )
}

export default FormikInput
