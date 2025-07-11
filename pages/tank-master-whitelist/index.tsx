import { useState } from 'react'

import { NextPage } from 'next'

import WrapperForm from 'components/authorization/form/wrapperForm'
import { Container } from 'components/common/wrappers/container'
import FormComponent from 'components/common/wrappers/formFieldsWrapper'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import SubmittedFormWrapper from 'components/common/wrappers/submittedFormWrapper'
import useServiceStore from 'store/service'
import { Fields } from 'utils/forms/types'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import validation from 'validation/yup'

const inputs: Fields = [
    {
        name: 'email',
        title: 'Email',
        type: 'text',
        validation: validation.string.email(true),
        placeholder: 'example@gmail.com',
    },
    {
        name: 'name',
        title: 'Your name',
        type: 'text',
        validation: validation.string.trimmed(true),
        placeholder: 'Jane Doe',
    },
    {
        name: 'walletAddress',
        title: 'Polygon Wallet Address',
        type: 'text',
        validation: validation.string.walletAddress(true),
    },
]

const TankMasterWhitelistPage: NextPage = () => {
    const formsService = useServiceStore(store => store.formsService)
    const [submitted, setSubmitted] = useState(false)

    const submitForm = async (values): Promise<void> => {
        const res = await formsService.submitForm({
            form: 'tank-master-whitelist-participants',
            ...values,
        })

        if (res?.[0]?._id) {
            setSubmitted(true)

            sendAnalyticsEvent({
                event: 'submit_form',
                options: { formName: 'tank-master-whitelist' },
            })
        }
    }

    return (
        <PageWrapper>
            <Container>
                <SubmittedFormWrapper
                    submitted={submitted}
                    submittedComponent={
                        <h3 className="text-custom-2.5xl font-medium">
                            Thank you for Tank Master NFTs White List Registration!
                        </h3>
                    }
                >
                    <WrapperForm
                        title={
                            <div>
                                <h3 className="text-custom-2.5xl font-medium">
                                    Tank Master NFTs White List Registration
                                </h3>
                                <p className="text-base font-normal">Let`s keep in touch!</p>
                            </div>
                        }
                        classes={{ container: 'mt-10 pr-1 sm:pr-1' }}
                    >
                        <FormComponent
                            fields={inputs}
                            submitButtonTitle="Send"
                            onSubmit={submitForm}
                        />
                    </WrapperForm>
                </SubmittedFormWrapper>
            </Container>
        </PageWrapper>
    )
}

export default TankMasterWhitelistPage
