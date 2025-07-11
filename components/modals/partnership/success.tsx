import { FC, useCallback } from 'react'

import { ModalOverlay } from '../overlay'
import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'

import ModalFormWrapper from 'components/profile/referralInfo/referralModalWrapper'
import CheckMark from 'components/svg/checkMark'

type Props = ConfirmableProps & {
    title: string
    message?: string
}

const SuccessSubmittingModal: FC<Props> = ({
    proceed,
    show,
    title,
    message = 'Thank you! Your data has been submitted!',
}) => {
    const close = useCallback(() => proceed(), [])

    return (
        <ModalOverlay onClose={close} isOpen={show}>
            <ModalFormWrapper
                title={title}
                onClose={close}
                classes={{ container: 'self-start mt-28 max-w-162' }}
            >
                <div className="rounded bg-base-800 px-25 py-11">
                    <div className="flex flex-col items-center gap-5">
                        <CheckMark className="text-success" />
                        <div>{message}</div>
                    </div>
                </div>
            </ModalFormWrapper>
        </ModalOverlay>
    )
}

const openSuccessSubmittingModal = promisifyModal(SuccessSubmittingModal)

export default openSuccessSubmittingModal
