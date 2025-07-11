import { useEffect, useState } from 'react'

import moment from 'moment'
import { NextPage } from 'next'
import Image from 'next/image'
import { useQuery } from 'react-query'

import GameAssetCardForShop from 'components/common/nftCard/gameAsset/forShop'
import Skeleton from 'components/common/skeleton'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import Steps, { StepType } from 'components/profile/referralInfo/cards/steps'
import CloseSvg from 'components/svg/closeSvg'
import GoldenPassLight from 'components/svg/goldenPassLight'
import { useModal } from 'hooks/useModal'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { prod } from 'utils/environment'

const steps: StepType[] = [
    {
        id: 1,
        title: 'Purchase the Gold Pass',
        description: (
            <div>
                To unlock the benefits, you need to purchase the Gold Pass. The Gold Pass is valid
                for <span className="text-[#ff4774]">3 weeks</span>, starting from{' '}
                <span className="text-[#ff4774]">December 1st, 2023</span>
            </div>
        ),
    },
    {
        id: 2,
        title: 'Climb the Leaderboard',
        description:
            'Engage actively in the specified activities or tasks that contribute to your position on the Leaderboard',
    },
    {
        id: 3,
        title: 'End-of-Day USDT Giveaway',
        description:
            'As a Gold Pass holder, you automatically enter the pool of participants eligible for the daily USDT giveaway',
    },
    {
        id: 4,
        title: (
            <div className="flex items-center gap-2">
                <Image width={24} height={24} src="/images/pair.png" alt="pair" />
                <span>Get Your USDT Prize</span>
            </div>
        ),
        description:
            'If you secure a winning position on the Leaderboard, your USDT reward will be automatically credited to your account',
    },
]

const intervalTime = moment(moment('2023-12-14').diff(moment()))

const getData = (): String[] => intervalTime.format('DD:HH:mm').split(':')

const gameAssetId = prod.value('65578afab87e105b0bcc4547', '6548bc116e55791ca8aac8f2')

const GoldenPass: NextPage = () => {
    const [isSaveModalOpen, , closeSaveModal] = useModal(true)
    const [data, setData] = useState<String[]>(getData())

    const gameService = useServiceStore(state => state.gameService)

    const { data: userAssets, isLoading } = useQuery(
        [QueryKeys.GET_MY_GAMES_ASSETS],
        ({ signal }) =>
            gameService.getMyGameAssets({
                limit: '20',
                offset: '0',
                signal,
            })
    )

    const isAssetBought = !!userAssets?.docs.filter(el => el.gameAssetId === gameAssetId)[0]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setData(getData())
        }, 60000)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <PageWrapper className="overflow-hidden pb-44">
            <Container>
                <div className="pt-9">
                    <TitleWithDescription
                        title="Buy Gold Pass To Win More Prizes"
                        classes={{ wrapper: 'mb-4' }}
                    />
                    <div className="mb-7 flex items-center justify-center gap-2 text-20">
                        {data.map((el, id) => (
                            <>
                                <div className="flex h-9 w-20 items-center justify-center rounded-3xl bg-cta">
                                    {el}
                                    {(id > 1 && 'm') || (id > 0 && 'h') || 'd'}
                                </div>
                                {id < 2 && <div>:</div>}
                            </>
                        ))}
                    </div>
                </div>
                <Steps steps={steps} className="relative z-[1] mb-7 lg:grid-cols-2" />
                <div className="relative flex justify-center">
                    <div className=" relative z-[1] max-h-[400px] max-w-[316px]">
                        <Skeleton isLoading={isLoading} classes={{ skeleton: 'mb-4 rounded-md' }}>
                            <div className="mb-4 text-center">
                                You have {isAssetBought ? 1 : 0}/1 Golden Pass
                            </div>
                        </Skeleton>
                        <GameAssetCardForShop
                            cover="/images/regular-pass.jpg"
                            name="GOLD PASS for ARENA GAMES"
                            price={{
                                amount: 5882.35,
                                currency: { symbol: 'AMT', name: '', type: '' },
                            }}
                            gameAssetId={gameAssetId}
                            isOwned={isAssetBought}
                            description=""
                        />
                        {isSaveModalOpen && (
                            <div className="absolute bottom-[-30%] z-[1] h-22 w-full max-w-[316px] rounded-2xl bg-base-600 p-4">
                                <div className="mb-1 flex items-center justify-between">
                                    <Image
                                        width={200}
                                        height={30}
                                        src="/images/BinancePay.svg"
                                        alt="Binance pay"
                                    />
                                    <div
                                        className="flex cursor-pointer transition-colors"
                                        onClick={closeSaveModal}
                                    >
                                        <CloseSvg />
                                    </div>
                                </div>
                                <div>Save 15% using Binance Pay!</div>
                            </div>
                        )}
                    </div>
                    <GoldenPassLight className="absolute top-[-50%] z-0" />
                </div>
            </Container>
        </PageWrapper>
    )
}

export default GoldenPass
