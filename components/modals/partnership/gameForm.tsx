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

type GameFormModalProps = IModal

const options = [
    { icon: '', title: 'Yes', value: 'yes' },
    { icon: '', title: 'No', value: 'no' },
]

const inputs: Fields = [
    {
        title: 'Personal Information',
        type: 'group',
        name: 'personalInfo',
        fields: [
            {
                title: 'First Name*',
                name: 'firstName',
                placeholder: 'Jane',
                type: 'text',
                validation: validation.string.required(),
            },
            {
                title: 'Last Name*',
                name: 'lastName',
                placeholder: 'Doe',
                type: 'text',
                validation: validation.string.required(),
            },
            {
                type: 'text',
                title: 'Email*',
                name: 'email',
                placeholder: 'example@gmail.com',
                validation: validation.string.email(true),
            },

            {
                title: 'Phone',
                name: 'phone',
                props: {
                    name: 'phone',
                    placeholder: '(999) 999-99-99',
                },
                placeholder: '(999) 999-99-99',
                type: 'phone',
            },
        ],
    },
    {
        title: 'Game Information',
        type: 'group',
        name: 'gameInfo',
        fields: [
            {
                title: 'Game Name*',
                name: 'name',
                placeholder: 'My Game',
                type: 'text',
                validation: validation.string.required(),
            },
            {
                title: 'Game Genre*',
                name: 'genre',
                placeholder: 'Role-playing game',
                type: 'text',
                validation: validation.string.required(),
            },
            {
                title: 'Brief Game Description*',
                name: 'description',
                placeholder: 'Add information',
                type: 'textarea',
                validation: validation.string.required(),
            },
        ],
    },
    {
        title: 'Development Stage',
        type: 'group',
        name: 'development',
        fields: [
            {
                title: 'Is the game concept ready?*',
                name: 'conceptIsReady',
                props: {
                    options,
                    itemToLabel: item => item.title,
                    name: 'conceptIsReady',
                },
                type: 'radio',
            },
            {
                title: 'Is the game currently in development?*',
                name: 'inDevelopment',
                props: {
                    options,
                    itemToLabel: item => item.title,
                    name: 'inDevelopment',
                },
                type: 'radio',
            },
            {
                title: 'Has the game been launched?*',
                name: 'launched',
                props: {
                    options,
                    itemToLabel: item => item.title,
                    name: 'launched',
                },
                type: 'radio',
            },
        ],
    },
    {
        title: 'Additional Details',
        type: 'group',
        name: 'additionalDetails',
        fields: [
            {
                title: 'Expected Date of Launch (if not launched)',
                name: 'expectedDate',
                placeholder: 'Add information',
                type: 'text',
            },
            {
                title: 'Number of Team Members Involved',
                name: 'membersAmount',
                placeholder: 'Add information',
                type: 'text',
            },
            {
                title: 'Target Audience',
                name: 'targetAudience',
                placeholder: 'Add information',
                type: 'text',
            },
        ],
    },
    {
        title: 'Specific Requirements (if any)',
        type: 'group',
        name: 'requirements',
        fields: [
            {
                title: 'What are your expectations from a partnership with Arena Games?',
                name: 'expectations',
                placeholder: 'Add information',
                type: 'textarea',
            },
        ],
    },
    {
        type: 'files',
        name: 'attachments',
        title: 'Upload any supporting files (gameplay images, videos, game design documents, etc., maximum file size is 10 Mb)',
    },
    {
        type: 'text',
        name: 'mediaLink',
        title: 'or add URL to media',
        placeholder: 'Add file URL',
        validation: validation.string.url('mediaLink', false, 'Please enter valid URL'),
    },
    {
        title: '',
        type: 'group',
        name: 'agreements',
        fields: [
            {
                type: 'checkbox',
                name: 'correctInfo',
                title: 'correctInfo',
                props: {
                    label: 'I hereby declare that all the above information is correct to the best of my knowledge',
                    id: 'correctInfo',
                    name: 'correctInfo',
                    classes: { container: 'mt-8 mb-5 grid grid-flow-col' },
                },
                validation: yup.boolean().isTrue(),
            },
            {
                type: 'checkbox',
                name: 'privacyPolicy',
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
                    name: 'privacyPolicy',
                    classes: { container: 'mb-5 grid grid-flow-col' },
                },
                validation: yup.boolean().isTrue(),
            },
        ],
    },
]

const GameFormModal: FC<GameFormModalProps> = ({ close, isOpen }) => {
    const formsService = useServiceStore(store => store.formsService)

    const submitForm = async (values): Promise<void> => {
        const res = await formsService.submitForm({
            form: 'form-games',
            ...values,
        })

        if (res?.[0]?._id) {
            openSuccessSubmittingModal({ title: 'Submission Game Project' })

            sendAnalyticsEvent({
                event: 'submit_form',
                options: { formName: 'for_partners' },
            })

            close()
        }
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <ModalFormWrapper
                title="Submission Game Project"
                onClose={close}
                classes={{ container: 'self-start mt-28 max-w-162 pr-1 sm:pr-1' }}
            >
                <FormComponent
                    fields={inputs}
                    onSubmit={submitForm}
                    submitButtonTitle="Submit My Game"
                />
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

export default GameFormModal
