import { FC, useCallback } from 'react'

import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'

import { DiscrodButton } from './buttons/discord'
import { TwitterButton } from './buttons/twitter'

import { ModalOverlay } from 'components/modals/overlay'
import CloseSvg from 'components/svg/closeSvg'

const JoinModal: FC<ConfirmableProps> = ({ proceed, show }) => {
    const onClose = useCallback(() => {
        proceed()
    }, [])

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <div className="relative z-10 max-w-162 rounded-xl bg-base-700 p-4 md:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-28 leading-9">Join the Arena Games Community Now!</h3>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="flex items-center justify-center transition-opacity hover:opacity-80"
                    >
                        <CloseSvg />
                    </button>
                </div>
                <p className="mb-4 text-base-200 md:mb-6">
                    Don`t miss out on exclusive project announcements and updates! Stay ahead of the
                    game and be part of our dynamic Web3 community!
                </p>
                <div className="flex flex-wrap gap-4">
                    <DiscrodButton />
                    <TwitterButton />
                </div>
            </div>
        </ModalOverlay>
    )
}

const joinArena = promisifyModal(JoinModal)

export default joinArena
