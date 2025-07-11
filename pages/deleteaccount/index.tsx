import { FormikHelpers } from 'formik'
import { NextPage } from 'next'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import FormComponent from 'components/common/wrappers/formFieldsWrapper'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import openSuccessSubmittingModal from 'components/modals/partnership/success'
import useServiceStore from 'store/service'
import { Fields } from 'utils/forms/types'
import validation from 'validation/yup'

const fields: Fields = [
    { type: 'text', name: 'name', title: 'Name', validation: validation.string.required() },
    { type: 'text', name: 'email', title: 'Email', validation: validation.string.email(true) },
    { type: 'textarea', name: 'message', title: 'Message' },
]

const successMessage =
    'Your account deletion request has been submitted successfully. Our administrators will process your request within 14 days (maximum time frame is 30 days).'

const DeleteAccountPage: NextPage = () => {
    const formsService = useServiceStore(store => store.formsService)

    const submitForm = async (
        values,
        { resetForm, setSubmitting }: FormikHelpers<any>
    ): Promise<void> => {
        const res = await formsService.submitForm({
            form: 'delete-account',
            ...values,
        })

        if (res?.[0]?._id) {
            openSuccessSubmittingModal({
                title: 'ACCOUNT DELETION REQUEST',
                message: successMessage,
            })
        }

        resetForm()
        setSubmitting(false)
    }

    return (
        <PageWrapper>
            <Container>
                <BlockWrapper>
                    <h1
                        className="mb-13 pt-13 text-center text-custom-4xl font-semibold sm:text-custom-6xl"
                        data-aos="fade-zoom-in"
                    >
                        CONTACT US TO DELETE YOUR ACCOUNT
                    </h1>
                    <TitleWithDescription
                        title="FILL UP THE FORM"
                        description="Please complete the form, and our team will contact you via email to process your account deletion request within 14 days (maximum time frame is 30 days)."
                        classes={{ description: 'text-start 2xs:max-w-full', title: 'text-start' }}
                    />
                    <FormComponent
                        fields={fields}
                        onSubmit={submitForm}
                        classes={{ button: 'sm:w-55' }}
                        submitButtonTitle="ACCOUNT DELETION REQUEST"
                    />
                </BlockWrapper>
            </Container>
        </PageWrapper>
    )
}

export default DeleteAccountPage
