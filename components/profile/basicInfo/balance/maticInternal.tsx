import { FC } from 'react'

import Image from 'next/image'
import { useQuery } from 'react-query'

import BaseBalance, { BalanceProps } from './base'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import Tooltip from 'components/common/ui/Tooltip'
import openWithdrawMaticModal from 'components/modals/swapModals/withdraw/matic'
import InfoSvg from 'components/svg/InfoSvg'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

const TooltipMessage: FC = () => {
    return (
        <div className="text-custom-sl">
            <span className="text-base-200">
                You can requested your MATIC withdrawal if you have
            </span>{' '}
            {minimumWithdrawalThreshold.toString()}
            <Image
                src="/images/matic-coin.svg"
                width={13}
                height={13}
                alt="Matic"
                className="ml-0.5 inline-block"
            />
        </div>
    )
}

const minimumWithdrawalThreshold = 15

const MaticInternalBalance: FC<BalanceProps> = ({ value, isLoading, icon }) => {
    const swapService = useServiceStore(s => s.swapService)

    const { data } = useQuery(QueryKeys.IS_PENDING_REQUEST, swapService.isPendingWithdrawalRequest)

    const handleClick = (): void => {
        openWithdrawMaticModal({ amount: value })
    }

    return (
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-base-600 px-3 sm:w-auto sm:justify-center">
            <BaseBalance
                value={value}
                isLoading={isLoading}
                icon={icon}
                classes={{ wrapper: 'order-2 sm:order-none' }}
            />
            <Tooltip text={<TooltipMessage />} className="order-1 sm:order-none">
                <InfoSvg width={20} height={20} />
            </Tooltip>
            <SmallButton
                onClick={handleClick}
                disabled={value < minimumWithdrawalThreshold || data?.ok}
                className="order-3 pb-0 pt-0 sm:order-none"
            >
                {data?.ok ? 'Requested' : 'Request'}
            </SmallButton>
        </div>
    )
}

export default MaticInternalBalance
