import { FC, useMemo, useState } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'

import SmallButton from '../ui/buttons/newSmallButton'
import PhoneInput from '../ui/inputs/defaultPhoneInput'
import FileInput from '../ui/inputs/fileInput'
import InputsGroupTitle from '../ui/inputs/inputsGroupTitle'
import RadioForFormik from '../ui/radio/radioForFormik'

import Checkbox from 'components/authorization/form/checkbox'
import Input from 'components/authorization/form/input'
import TextArea from 'components/authorization/form/textArea'
import { getState, getValidationSchema, addPathToFields } from 'utils/forms'
import { Field, Fields, GroupField, RadioField } from 'utils/forms/types'

const RadioComponent: FC<RadioField> = ({ title, name, props }) => {
    return (
        <div className="mb-4">
            <h5 className="mb-3">{title}</h5>
            <RadioForFormik name={name} {...props} />
        </div>
    )
}

const GroupComponent: FC<GroupField> = ({ fields, title, isSubmitted }) => {
    return (
        <>
            <InputsGroupTitle title={title} key={title} />
            <FieldsList fields={fields} isSubmitted={isSubmitted} />
        </>
    )
}

const FieldsList: FC<{ fields: Fields; isSubmitted: boolean }> = ({ fields, isSubmitted }) => {
    return (
        <div className="space-y-4">
            {fields.map(field => {
                const Component = components[field.type] as FC<any>

                return (
                    <Component
                        key={field?.name}
                        {...field}
                        {...((field as any)?.props ?? {})}
                        name={field.path}
                        isSubmitted={isSubmitted}
                    />
                )
            })}
        </div>
    )
}

const components: Record<Field['type'], FC<unknown>> = {
    text: Input,
    textarea: TextArea,
    phone: PhoneInput,
    radio: RadioComponent,
    checkbox: Checkbox,
    group: GroupComponent,
    files: FileInput,
}

interface FormFieldsWrapperProps {
    fields: Fields
    onSubmit: (values: any, formikHelpers?: FormikHelpers<any>) => void | Promise<void>
    submitButtonTitle?: string
    classes?: { button?: string }
}

const FormComponent: FC<FormFieldsWrapperProps> = ({
    fields,
    onSubmit,
    submitButtonTitle = 'Submit',
    classes = { button: '' },
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const _fields = useMemo(() => addPathToFields(fields), [fields])

    const initialValues = useMemo(() => getState(_fields), [_fields])

    const schema = useMemo(() => getValidationSchema(_fields), [_fields])

    return (
        <Formik
            onSubmit={async (values, helpers) => {
                setIsSubmitted(true)
                await onSubmit(values, helpers)
                setIsSubmitted(false)
            }}
            validateOnMount
            validationSchema={schema}
            initialValues={initialValues}
        >
            {formik => (
                <Form className="max-h-[65vh] overflow-auto pr-5">
                    <FieldsList isSubmitted={isSubmitted} fields={_fields} />

                    <SmallButton
                        isLoading={formik.isSubmitting}
                        disabled={!formik.isValid}
                        type="submit"
                        className={`mt-5 w-full ${classes?.button ?? ''}`}
                    >
                        {submitButtonTitle}
                    </SmallButton>
                </Form>
            )}
        </Formik>
    )
}

export default FormComponent
