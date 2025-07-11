import { FC, ReactNode } from 'react'

import { useField } from 'formik'

import CheckSvg from '../../svg/checkSvg'

export interface ICheckbox {
    label: ReactNode
    id: string
    name: string
    classes?: { container?: string }
}

const Checkbox: FC<ICheckbox> = ({ label, id, name, classes = { container: '' } }) => {
    const [formikField] = useField<string>(name)

    return (
        <div className={`flex items-center gap-x-2 ${classes.container}`}>
            <div
                className={`relative flex h-4.5 w-4.5 items-center justify-center rounded transition-none
                     ${formikField.value ? 'bg-cta' : 'border'}`}
            >
                <input
                    id={id}
                    {...formikField}
                    type="checkbox"
                    className="absolute inset-0 opacity-0 transition-none"
                />
                <CheckSvg className={formikField.value ? 'block' : 'hidden'} />
            </div>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default Checkbox
