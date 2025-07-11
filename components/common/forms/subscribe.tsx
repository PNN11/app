import { FC, useEffect, useState } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { object as yupObject } from 'yup'

import SmallButton from '../ui/buttons/newSmallButton'
import { DefaultInput } from '../ui/inputs/defaultInput'
import { InputWrapper } from '../ui/inputs/inputWrapper'
import BlockTitle from '../ui/title/blockTitle'

import useServiceStore from 'store/service'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'
import validation from 'validation/yup'

interface ISubscribeProps {
    className?: string
}

interface ISubscribeForm<T> {
    email: T
}

const schema = yupObject().shape({
    email: validation.string.email(true),
})

const initialState: ISubscribeForm<string> = {
    email: '',
}

export type Values = typeof initialState

const SubscribeForm: FC<ISubscribeProps> = ({ className = '' }) => {
    const [buttonName, setButtonName] = useState('Subscribe')
    const formsService = useServiceStore(store => store.formsService)

    const subscribeMutation = useMutation(formsService.subscribe, {
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const submitForm = async (
        { email }: Values,
        { resetForm }: FormikHelpers<Values>
    ): Promise<void> => {
        const res = await subscribeMutation.mutateAsync({ email })

        if (res?.ok) {
            sendAnalyticsEvent({ event: 'submit_form', options: { formName: 'subscribe' } })
            resetForm()
            setButtonName('Success')
        }
    }

    useEffect(() => {
        if (buttonName !== 'Subscribe') {
            const timeout = setTimeout(() => {
                setButtonName('Subscribe')
            }, 3000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [buttonName])

    return (
        <Formik
            onSubmit={submitForm}
            validateOnMount
            validationSchema={schema}
            initialValues={initialState}
        >
            {() => (
                <Form className={className}>
                    <BlockTitle>Get the last updates</BlockTitle>
                    <div className="relative flex items-center justify-end">
                        <InputWrapper className="absolute w-full" name="email">
                            <DefaultInput
                                className="h-10"
                                name="email"
                                outlined
                                placeholder="example@gmail.com"
                            />
                        </InputWrapper>
                        <SmallButton
                            isLoading={subscribeMutation.isLoading}
                            className="z-[2] w-22"
                            type="submit"
                        >
                            {buttonName}
                        </SmallButton>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SubscribeForm
