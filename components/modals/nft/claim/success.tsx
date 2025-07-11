import { FC } from 'react'

import { useRouter } from 'next/router'

import SocialShareBlock from '../listing/socialShareBlock'
import SuccessItemDescription from '../listing/successItemDescription'
import SuccessItemPreview from '../listing/successItemPreview'
import ClaimModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { ProfileNftTab } from 'components/marketplace/filter/types'
import { IModal } from 'components/modals/interfaces/modalInterface'

type PropsType = IModal & {
    onDone: () => void
    nft: IMarketplaceToken.TBodyResponse
}
const SuccessClaim: FC<PropsType> = ({ nft, close, onDone }) => {
    const router = useRouter()

    const [, setTab] = useFilterState<ProfileNftTab, string>(
        store => store.profileNftTab,
        value => ({ profileNftTab: value })
    )

    return (
        <ClaimModalWrapper title="Claim completed" close={close} className="flex flex-col gap-8">
            <SuccessItemPreview logo={nft.payload.logo} title="Item is now owned by you!" />

            <div className="flex flex-col items-center gap-4 text-center">
                <SuccessItemDescription
                    nft={nft}
                    description="has been added to your Owned section."
                />
                <SocialShareBlock nft={nft} />
            </div>
            <MarketplaceButton
                onClick={() => {
                    onDone()
                    setTab('Owned')
                    router.push({
                        pathname: '/profile',
                        query: {
                            'filter[profileNftTab]': 'Owned',
                            'filter[profileTab]': 'My NFTs',
                        },
                    })
                }}
                className="w-full"
            >
                View owned items
            </MarketplaceButton>
        </ClaimModalWrapper>
    )
}

export default SuccessClaim
