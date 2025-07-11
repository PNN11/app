import { FC } from 'react'

import ClaimedNftsTab from './claimedNftsTab'
import GameAssetsTab from './gameAssets'

import { MarketplaceTokenStatus } from 'common-types/marketplace/marketplace-token'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Tabs from 'components/common/tabs'
import SortAndSearchPanel from 'components/game/marketplace/sortAndSearchPanel'
import { ProfileNftTab } from 'components/marketplace/filter/types'
import NftTabButton from 'components/marketplace/nft/Activity/nftTabButton'
import { TabButtonChildren } from 'components/marketplace/nft/Activity/tabButtonChildren'
import ActiveNftsTab from 'components/profile/nftsTab/activeNftsTab'
import { ClaimedIcon } from 'components/svg/claimedIcon'
import { ListingsIcon } from 'components/svg/listingsIcon'
import MysteryBoxIcon from 'components/svg/mysteryBoxIcon'
import { OwnedIcon } from 'components/svg/ownedIcon'
import StakingIcon from 'components/svg/staking'
import useFilterStore from 'store/useFilterStore'
import { marketplaceSortOptions } from 'utils/constants/sortOptions'
import { dev } from 'utils/environment'
import { ObjectValues, ProfileMyNftsTabsList } from 'utils/types/tabs'

export type TabButtonLabel = {
    name: ObjectValues<typeof ProfileMyNftsTabsList>
    Icon?: FC
}

const TabButtonLabels: TabButtonLabel[] = [
    {
        name: ProfileMyNftsTabsList.ALL,
        Icon: undefined,
    },
    { name: ProfileMyNftsTabsList.GAME_ASSETS },
    {
        name: ProfileMyNftsTabsList.OWNED,
        Icon: OwnedIcon,
    },
    {
        name: ProfileMyNftsTabsList.LISTED,
        Icon: ListingsIcon,
    },
    {
        name: ProfileMyNftsTabsList.NOTCLAIMED,
        Icon: ClaimedIcon,
    },
    {
        name: ProfileMyNftsTabsList.STAKED,
        Icon: StakingIcon,
    },
    ...dev.array([
        {
            name: ProfileMyNftsTabsList.MYSTERY_BOXES,
            Icon: MysteryBoxIcon,
        },
    ]),
]
const NftsTab: FC = () => {
    const set = useFilterStore(s => s.setFilter)

    const [tab, setTab] = useFilterState<ProfileNftTab, string>(
        store => store.profileNftTab,
        value => ({ profileNftTab: value })
    )

    return (
        <Tabs defaultTab={ProfileMyNftsTabsList.ALL} value={tab} onChange={setTab}>
            <div className="my-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center justify-center gap-x-2">
                    {TabButtonLabels.map(({ name, Icon }) => {
                        return (
                            <NftTabButton name={name} key={name} callBack={() => set(undefined)}>
                                <TabButtonChildren name={name} Icon={Icon} />
                            </NftTabButton>
                        )
                    })}
                </div>

                <SortAndSearchPanel sortParams={marketplaceSortOptions} />
            </div>
            <Tabs.Tab name={ProfileMyNftsTabsList.ALL}>
                <ActiveNftsTab />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.GAME_ASSETS}>
                <GameAssetsTab />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.OWNED}>
                <ActiveNftsTab filters={{ status: MarketplaceTokenStatus.SOLD }} />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.LISTED}>
                <ActiveNftsTab filters={{ status: MarketplaceTokenStatus.SALE }} />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.NOTCLAIMED}>
                <ClaimedNftsTab />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.MYSTERY_BOXES}>
                <ActiveNftsTab filters={{ resolution: 'MYSTER_BOX' }} />
            </Tabs.Tab>
            <Tabs.Tab name={ProfileMyNftsTabsList.STAKED}>
                <ActiveNftsTab filters={{ isStaked: true }} />
            </Tabs.Tab>
        </Tabs>
    )
}

export default NftsTab
