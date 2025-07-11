import { FC } from 'react'

import BaseBalance, { BalanceProps } from './base'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import openDepositAmtModal from 'components/modals/swapModals/depositModal'

type Props = BalanceProps

const AmtInternalBalance: FC<Props> = ({ value, isLoading, icon }) => {
    const handleClick = async (): Promise<void> => {
        await openDepositAmtModal()
    }

    return (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-base-600 px-3 sm:w-auto sm:justify-center">
            <BaseBalance value={value} isLoading={isLoading} icon={icon} />

            <SmallButton onClick={handleClick} className="pb-0 pt-0">
                Deposit
            </SmallButton>
        </div>
    )
}

export default AmtInternalBalance
