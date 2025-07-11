import { FC } from 'react'

import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Step from 'components/common/ui/step'

interface Props {
    approveActive: boolean
    approveCompleted: boolean
    purchaseActive: boolean
    purchaseCompleted: boolean
    onClickButton: () => void | Promise<void>
    currencySymbol: string
    isLoading: boolean
}

const AproveAndConfirmPurchaseSteps: FC<Props> = ({
    approveActive,
    approveCompleted,
    onClickButton,
    purchaseActive,
    purchaseCompleted,
    currencySymbol,
    isLoading,
}) => {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Step active={approveActive} completed={approveCompleted} number={1} />
                        <p className="text-custom-sl">Approve currency</p>
                    </div>
                    <p>
                        You’ll be asked to approve the use of {currencySymbol} from your wallet. You
                        only need to do this once.
                    </p>
                </div>

                <MarketplaceButton className="w-full" onClick={onClickButton} isLoading={isLoading}>
                    {approveCompleted ? 'Close' : 'Continue'}
                </MarketplaceButton>
            </div>
            <div className="flex items-center gap-2">
                <Step active={purchaseActive} completed={purchaseCompleted} number={2} />
                <p className="text-custom-sl">Confirm purchase</p>
            </div>
        </div>
    )
}

export default AproveAndConfirmPurchaseSteps
