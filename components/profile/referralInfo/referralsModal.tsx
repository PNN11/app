import { FC } from 'react'

import { Form, Formik } from 'formik'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import ReferralModalWrapper from './referralModalWrapper'

import Input from 'components/authorization/form/input'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'
import PlusIcon from 'components/svg/plusIcon'
import useServiceStore from 'store/service'
import { HttpError } from 'utils/httpError'

const schema = yup.object().shape({
    name: yup.string().min(1).required('Name is a required field'),
})

const initialState = {
    name: '',
}

const ReferralsModal: FC<ConfirmableProps> = ({ show, cancel, proceed }) => {
    const referralService = useServiceStore(state => state.referralService)

    const generateReferralCode = useMutation(referralService.generateCode, {
        onSuccess() {
            proceed()
            toast.success('The referral link was successfully created')
        },
        onError(error) {
            if (error instanceof HttpError) {
                toast(error.message)
                cancel()
            }
        },
    })

    const onClose = (): void => cancel()

    const onSubmit = ({ name }: typeof initialState): void => {
        generateReferralCode.mutateAsync({ name })
    }

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <ReferralModalWrapper
                title="New referral link"
                classes={{ container: 'max-w-[54.375rem]' }}
                onClose={onClose}
            >
                <div>
                    <Formik
                        onSubmit={onSubmit}
                        validateOnMount
                        validationSchema={schema}
                        initialValues={initialState}
                    >
                        {() => (
                            <Form>
                                <Input
                                    title="Name"
                                    name="name"
                                    description={`Write something to make the link easier to identify. For example, it can be
                        the name of the website or service`}
                                    placeholder="Write some name for the link"
                                />
                                <MarketplaceButton
                                    type="submit"
                                    className="flex w-max gap-2 stroke-white p-3 !text-sm leading-4"
                                >
                                    <PlusIcon />
                                    Generate your link
                                </MarketplaceButton>
                            </Form>
                        )}
                    </Formik>
                </div>
            </ReferralModalWrapper>
        </ModalOverlay>
    )
}
const openReferralsModal = promisifyModal(ReferralsModal)

export default openReferralsModal
