import { FC, useEffect } from 'react'

import Tabs from '../../components/common/tabs'
import TabButton from '../../components/game/tabButton'

import { useFilterState } from 'components/common/filter-query/useFilterState'
import Badge from 'components/common/ui/badges/newBadge'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import BinanceDepositModal from 'components/modals/swapModals/binanceDepositModal'
import BasicInfo from 'components/profile/basicInfo'
import EShopTab from 'components/profile/eShopTab'
import GamesInfo from 'components/profile/gamesInfo'
import LoginInfo from 'components/profile/loginInfo'
import NftsTab from 'components/profile/nftsTab/nftsTab'
import ProfileActivities from 'components/profile/profileActivities'
import ReferralInfo from 'components/profile/referralInfo'
import TransactionsInfo from 'components/profile/transactionsInfo'
import WalletInfo from 'components/profile/walletInfo'
import { useSetAuthorizedUser } from 'hooks/useGetUserInfo'
import { useModal } from 'hooks/useModal'
import useRedirect from 'hooks/useRedirect'
import { ProfileTabsList } from 'utils/types/tabs'

type ProfileTab = {
    profileTab: string
}

const Profile: FC = () => {
    const [isOpen, open, close] = useModal()

    const [tab, setTab] = useFilterState<ProfileTab, string>(
        store => store.profileTab,
        value => ({ profileTab: value })
    )

    useEffect(() => {
        if (!localStorage.getItem('visited')) {
            open()
            localStorage.setItem('visited', 'true')
        }
    }, [])

    useRedirect()
    useSetAuthorizedUser()

    return (
        <PageWrapper className="pt-5">
            <Container>
                <div className="min-h-screen w-full pb-12">
                    <BasicInfo />
                    <Tabs defaultTab={ProfileTabsList.PROFILE} value={tab} onChange={setTab}>
                        <div className="flex flex-wrap items-center justify-center gap-5 border-b border-b-base-300 border-opacity-20">
                            <TabButton name={ProfileTabsList.PROFILE} key={ProfileTabsList.PROFILE}>
                                {ProfileTabsList.PROFILE}
                            </TabButton>
                            {/* <TabButton name={ProfileTabsList.SETTINGS}>
                                {ProfileTabsList.SETTINGS}
                            </TabButton> */}
                            <TabButton
                                name={ProfileTabsList.REFERRAL}
                                key={ProfileTabsList.REFERRAL}
                            >
                                <div className="flex items-center gap-1">
                                    <span>{ProfileTabsList.REFERRAL}</span>
                                    <Badge className="bg-cta text-white">Earn</Badge>
                                </div>
                            </TabButton>
                            <TabButton name={ProfileTabsList.MY_NFTS} key={ProfileTabsList.MY_NFTS}>
                                My Inventory
                            </TabButton>
                            <TabButton
                                name={ProfileTabsList.ACTIVITIES}
                                key={ProfileTabsList.ACTIVITIES}
                            >
                                {ProfileTabsList.ACTIVITIES}
                            </TabButton>
                            <TabButton name={ProfileTabsList.E_SHOP}>
                                {ProfileTabsList.E_SHOP}
                            </TabButton>
                        </div>

                        <Tabs.Tab name={ProfileTabsList.PROFILE}>
                            <LoginInfo />
                            <WalletInfo />
                            <GamesInfo />
                            <TransactionsInfo />
                        </Tabs.Tab>
                        {/* <Tabs.Tab name={ProfileTabsList.SETTINGS}>
                            <UserSettingsTab />
                        </Tabs.Tab> */}
                        <Tabs.Tab name={ProfileTabsList.REFERRAL}>
                            <ReferralInfo />
                        </Tabs.Tab>
                        <Tabs.Tab name={ProfileTabsList.MY_NFTS}>
                            <NftsTab />
                        </Tabs.Tab>
                        <Tabs.Tab name={ProfileTabsList.ACTIVITIES}>
                            <ProfileActivities />
                        </Tabs.Tab>
                        <Tabs.Tab name={ProfileTabsList.E_SHOP}>
                            <EShopTab />
                        </Tabs.Tab>
                    </Tabs>
                </div>
                <BinanceDepositModal closeModal={close} isOpen={isOpen} />
            </Container>
        </PageWrapper>
    )
}

export default Profile
