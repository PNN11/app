import { FC } from 'react'

import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import CloseSvg from 'components/svg/closeSvg'

type PropsType = {
    closeModal: () => void
    handleButtonClick: () => void
}
export const ConfirmModal: FC<PropsType> = ({ closeModal, handleButtonClick }) => {
    return (
        <WrapperForm
            title={
                <div className="flex items-center justify-between">
                    <p>Confirm transaction</p>
                    <button
                        type="button"
                        onClick={() => {
                            closeModal()
                        }}
                    >
                        <CloseSvg className="cursor-pointer" />
                    </button>
                </div>
            }
        >
            <>
                <p className="text-center text-2xl">Confirm transaction</p>
                <SubmitButton
                    className="mt-6 bg-cta shadow-button hover:bg-cta-600"
                    handleClick={handleButtonClick}
                >
                    Confirm
                </SubmitButton>
            </>
        </WrapperForm>
    )
}
