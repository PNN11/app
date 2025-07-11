import { useState } from 'react'

import { NextPage } from 'next'
import Image from 'next/image'
import { toast } from 'react-toastify'

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
        name: 'walletAddress',
        title: 'Polygon Wallet Address',
        type: 'text',
        validation: validation.string.walletAddress(true),
    },
    {
        name: 'code',
        title: 'Unique Code',
        type: 'text',
        validation: validation.string.trimmed(true),
    },
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
]

const NftGiveAwayPage: NextPage = () => {
    const formsService = useServiceStore(store => store.formsService)
    const [submitted, setSubmitted] = useState(false)

    const submitForm = async (values): Promise<void> => {
        const res = await formsService.submitForm({ form: 'nft-giveaway', ...values })

        if (res?.[0]?._id) {
            setSubmitted(true)

            sendAnalyticsEvent({
                event: 'submit_form',
                options: { formName: 'nft-giveaway' },
            })

            return
        }

        if ('errors' in res) {
            const message = res.errors?.[0]?.message

            if (message?.includes(values.code)) {
                toast('Code must be unique')

                return
            }

            toast(message)
        }
    }

    return (
        <PageWrapper>
            <Container>
                <SubmittedFormWrapper
                    submitted={submitted}
                    submittedComponent={
                        <div className="mb-8 flex flex-col items-center">
                            <h3 className="text-center text-custom-2.5xl font-medium">
                                NFT is on its way... Cheers!
                            </h3>
                            <p className="mb-8 text-center text-base font-normal">
                                Receive NFT as a part of DeGameFi Conference promo
                            </p>
                            <Image
                                src="/images/nft-giveaway.png"
                                width={428}
                                height={426}
                                alt="Nft pass"
                            />
                        </div>
                    }
                >
                    <WrapperForm
                        title={
                            <div>
                                <h3 className="text-custom-2.5xl font-medium">NFT Giveaway</h3>
                                <p className="text-base font-normal">
                                    Receive NFT as a part of DeGameFi Conference promo
                                </p>
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

export default NftGiveAwayPage
