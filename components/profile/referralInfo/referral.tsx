import { FC } from 'react'

import Image from 'next/image'

import CopyButton from '../basicInfo/copyButton'

import { IReferral } from 'common-types/referral'

type Props = {
    referral: IReferral.ReferralCode
    newCode: boolean
    index: number
}

const Referral: FC<Props> = ({ referral, newCode, index }) => {
    return (
        <div className="grid grid-cols-referral-table gap-x-4 py-2 px-5 text-base ">
            <CopyButton
                classes={{
                    icon: `${newCode && index === 0 ? 'stroke-cta' : ''} transition`,
                    text: `${newCode && index === 0 ? 'text-cta' : 'text-base-100'} transition`,
                }}
                value={referral.url}
            >
                {referral.referralCode}
            </CopyButton>

            <p className="">{referral.name}</p>
            <p className="text-right">{referral.commonCount ?? 0}</p>
            <p className="text-right">{referral.activeCount ?? 0}</p>

            <p className="flex items-center justify-end gap-2">
                <span>{referral.rewardAmount}</span>
                {referral.currency ? (
                    <Image alt="currency" width={16} height={16} src={referral.currency.icon} />
                ) : null}
            </p>
            <p className="flex items-center justify-end gap-2">
                <span>{referral.bonusReward}</span>
                {referral.currency ? (
                    <Image alt="currency" width={16} height={16} src={referral.currency.icon} />
                ) : null}
            </p>
        </div>
    )
}

export default Referral
