import { FC, useEffect, useState } from 'react'

import { useQueryClient } from 'react-query'

import openReferralsModal from './referralsModal'
import ReferralWrapper from './referralWrapper'
import ReferralStatistics from './stats'
import ReferralTable from './table'

import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Steps, { StepType } from 'components/profile/referralInfo/cards/steps'
import PlusIcon from 'components/svg/plusIcon'
import { QueryKeys } from 'utils/constants/reactQuery'

const steps: StepType[] = [
    {
        id: 1,
        title: 'Generate Link',
        description:
            'Generate your referral link. You can create multiple links and monitor conversion from different sources',
    },
    {
        id: 2,
        title: 'Send link to your friends',
        description: (
            <div>
                You have just spread the love! Now your friend must{' '}
                <span className="font-bold">
                    register, approve the email address and play the game.
                </span>
            </div>
        ),
    },
    {
        id: 3,
        title: 'Get rewards',
        description: (
            <div>
                After your friends verify their accounts by one of these ways, you receive AMT! To
                be verified referral:
                <ul className="list-disc pl-5 ">
                    <li>Win 15 Matches in any game OR</li>
                    <li>Purchase using Binance pay OR</li>
                    <li>Buy NFT on Marketplace OR</li>
                    <li>Stake NFT</li>
                </ul>
            </div>
        ),
    },
]

const ReferralInfo: FC = () => {
    const queryClient = useQueryClient()

    const [newCode, setNewCode] = useState(false)

    const handleGenerateCode = async (): Promise<void> => {
        openReferralsModal()
            .then(() => {
                setNewCode(true)
                queryClient.refetchQueries({ queryKey: [QueryKeys.ALL_REFERRAL_CODES, 0] })
            })
            .catch()
    }

    useEffect(() => {
        if (newCode) {
            const timeout = setTimeout(() => {
                setNewCode(false)
            }, 3000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [newCode])

    return (
        <ReferralWrapper title="Referral">
            <Steps steps={steps}>
                <ReferralStatistics />
            </Steps>
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl">Your referral Links</h3>
                    <MarketplaceButton
                        onClick={handleGenerateCode}
                        className="flex w-max gap-2 stroke-white p-3 !text-sm leading-4"
                    >
                        <PlusIcon />
                        Generate your link
                    </MarketplaceButton>
                </div>
                <ReferralTable newCode={newCode} />
            </div>
        </ReferralWrapper>
    )
}

export default ReferralInfo
