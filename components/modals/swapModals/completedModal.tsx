import { FC, useState } from 'react'

import Image from 'next/image'

import SubmitButton from 'components/authorization/form/submitButton'
import WrapperForm from 'components/authorization/form/wrapperForm'
import CloseSvg from 'components/svg/closeSvg'

type PropsType = {
    closeModal: () => void
}

export const CompletedModal: FC<PropsType> = ({ closeModal }) => {
    const [isSubmitted] = useState<boolean>(false)

    return (
        <WrapperForm
            title={
                <div className="flex items-center justify-between">
                    <p>Complete checkout</p>
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
                <p className="text-center text-2xl">
                    {isSubmitted ? 'Transaction was Submitted' : 'Transaction in progress'}
                </p>
                <SubmitButton
                    disabled={!isSubmitted}
                    className="mt-6 bg-cta shadow-button"
                    handleClick={() => closeModal()}
                >
                    {isSubmitted ? (
                        'Done'
                    ) : (
                        <Image
                            alt="loader"
                            src="/img/loader.png"
                            className="loading mx-auto"
                            width={24}
                            height={24}
                        />
                    )}
                </SubmitButton>
            </>
        </WrapperForm>
    )
}
