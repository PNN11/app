import { FC } from 'react'

import Link from 'next/link'
import * as yup from 'yup'

import { IModal } from '../interfaces/modalInterface'
import { ModalOverlay } from '../overlay'

import openSuccessSubmittingModal from './success'

import FormComponent from 'components/common/wrappers/formFieldsWrapper'
import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import useServiceStore from 'store/service'
import { Fields } from 'utils/forms/types'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import validation from 'validation/yup'

type AmbassadorModalProps = IModal

const inputs: Fields = [
    {
        title: 'Personal Information',
        type: 'group',
        name: 'personalInfo',
        fields: [
            {
                type: 'text',
                title: 'First Name*',
                name: 'firstName',
                placeholder: 'Jane',
                validation: validation.string.required(),
            },
            {
                type: 'text',
                title: 'Last Name*',
                name: 'lastName',
                placeholder: 'Doe',
                validation: validation.string.required(),
            },
            {
                type: 'text',
                title: 'Email*',
                name: 'email',
                placeholder: 'example@gmail.com',
                validation: validation.string.required(),
            },
            {
                type: 'phone',
                title: 'Phone',
                name: 'phone',
                props: {
                    name: 'phone',
                    placeholder: '(999) 999-99-99',
                },
                placeholder: '(999) 999-99-99',
            },
            {
                type: 'text',
                title: 'Country of Residence',
                name: 'country',
                placeholder: 'France',
            },
        ],
    },
    {
        title: 'Socials',
        type: 'group',
        name: 'socials',
        fields: [
            {
                type: 'text',
                title: 'Discord Username',
                name: 'discord',
                placeholder: '@janedoe',
            },
            {
                type: 'text',
                title: 'Twitter Handle',
                name: 'twitter',
                placeholder: '@janedoe',
            },
            {
                type: 'text',
                title: 'Telegram Handle',
                name: 'telegram',
                placeholder: '@janedoe',
            },
            {
                type: 'text',
                title: 'Youtube Handle',
                name: 'youtube',
                placeholder: '@janedoe',
            },
            {
                type: 'text',
                title: 'TikTok Handle',
                name: 'tiktok',
                placeholder: '@janedoe',
            },
            { type: 'text', title: 'Other', name: 'other', placeholder: '@janedoe' },
        ],
    },
    {
        title: 'About You',
        type: 'group',
        name: 'about',
        fields: [
            {
                type: 'text',
                title: 'Occupation*',
                name: 'occupation',
                placeholder: 'Content Creator',
                validation: validation.string.required(),
            },
            {
                type: 'textarea',
                title: 'Briefly describe your experience with Web3 gaming*',
                name: 'experience',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
            {
                type: 'textarea',
                title: 'Have you ever been an ambassador for a gaming platform before? If yes, please provide details*',
                name: 'other',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
        ],
    },
    {
        title: 'Arena Games Interactions',
        type: 'group',
        name: 'interactions',
        fields: [
            {
                type: 'text',
                title: 'How long have you been a part of the Arena Games community?*',
                name: 'duration',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
            {
                type: 'textarea',
                title: 'What do you like most about Arena Games?*',
                name: 'favorite',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
        ],
    },
    {
        title: 'Your Role as an Ambassador',
        type: 'group',
        name: 'role',
        fields: [
            {
                type: 'textarea',
                title: 'What is your preferred role as an ambassador? (Content Creator, Moderator, Translator, Event Organizer, Influencer, etc.)*',
                name: 'role',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
            {
                type: 'textarea',
                title: 'In what ways do you plan to promote Arena Games? Please describe your strategy*',
                name: 'strategy',
                placeholder: 'Add information',
                validation: validation.string.required(),
            },
        ],
    },
    {
        type: 'checkbox',
        name: 'terms',
        title: 'terms',
        props: {
            label: (
                <>
                    I agree to the{' '}
                    <Link target="_blank" className="text-link underline" href="/terms">
                        Terms and Conditions of the Arena Games Ambassador Program
                    </Link>
                </>
            ),
            id: 'terms',
            name: 'terms',
            classes: { container: 'grid grid-flow-col' },
        },
        validation: yup.boolean().isTrue(),
    },
    {
        type: 'checkbox',
        name: 'policy',
        title: 'policy',
        props: {
            label: (
                <>
                    I accept the{' '}
                    <Link target="_blank" className="text-link underline" href="/policy">
                        Privacy policy
                    </Link>{' '}
                    and agree that my data can be used for contact purposes
                </>
            ),
            id: 'policy',
            name: 'policy',
            classes: { container: 'mb-5 grid grid-flow-col' },
        },
        validation: yup.boolean().isTrue(),
    },
]

const AmbassadorModal: FC<AmbassadorModalProps> = ({ close, isOpen }) => {
    const formsService = useServiceStore(store => store.formsService)

    const submitForm = async (values): Promise<void> => {
        const res = await formsService.submitForm({ form: 'ambassadors', ...values })

        if (res?.[0]?._id) {
            openSuccessSubmittingModal({ title: 'Arena Games Ambassador Registration' })

            sendAnalyticsEvent({
                event: 'submit_form',
                options: { formName: 'for_ambassadors' },
            })

            close()
        }
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <ModalFormWrapper
                title="Arena Games Ambassador Registration"
                onClose={close}
                classes={{ container: 'self-start mt-28 max-w-162 pr-1 sm:pr-1' }}
            >
                <FormComponent
                    fields={inputs}
                    submitButtonTitle="Join the Mission"
                    onSubmit={submitForm}
                />
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

export default AmbassadorModal
