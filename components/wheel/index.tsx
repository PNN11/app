import { FC, ReactNode, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import { Wheel } from 'react-custom-roulette'
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { WheelCore } from 'common-types/wheel'
import AuthRequiredButton from 'components/authorization/authReqioredbutton'
import RuffleRewardModal from 'components/modals/ruffleReward'
import { useModal } from 'hooks/useModal'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { sendAnalyticsEvent } from 'utils/googleAnalytics/sendEvent'
import { HttpError } from 'utils/httpError'

type Props = {
    rewards: WheelCore.WheelReward[]
    description?: ReactNode
    onStop?: () => void
    hasPrivileges: boolean
}

const validationReward = z.array(
    z.object({ reward: z.object({ meta: z.object({ image: z.string().url() }) }) })
)

const pallet = ['#97A2B4', '#787F8B', '#636465', '#3C3C3C']

const getColor = (index: number): string => pallet[index % pallet.length]

const wheelAlias = process.env.NEXT_PUBLIC_RAFFLE_WHEEL_ALIAS

const RuffleWheel: FC<Props> = ({ rewards, description, onStop, hasPrivileges }) => {
    const wheelService = useServiceStore(store => store.wheelService)
    const accessToken = useUserStore(store => store.accessToken)

    const spinMutation = useMutation(wheelService.spin, {
        mutationKey: ['spin'],
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    const [spinning, setSpinning] = useState(false)
    const [prize, setPrize] = useState<WheelCore.SpinResult>(null)
    const [prizeNumber, setPrizeNumber] = useState<number>(null)

    const [isOpen, open, close] = useModal()

    const {
        data: wheel,
        refetch: refetchWheelData,
        isLoading: isLoadingWheelData,
    } = useQuery(QueryKeys.RAFFLE_WHEEL_REWARDS, () => wheelService.getWheel({ alias: wheelAlias }))

    const { isValidRewards, formated } = useMemo<{
        isValidRewards: boolean
        formated: WheelData[] | null
    }>(() => {
        const isValidRewards = validationReward.safeParse(rewards).success

        if (!isValidRewards) return { isValidRewards, formated: null }

        const formated: WheelData[] = rewards.map((item, index) => ({
            option: index.toString(),
            style: { backgroundColor: getColor(index) },
            image: { uri: item.reward.meta.image, sizeMultiplier: 0.5, offsetY: 150 },
        }))

        return { isValidRewards, formated }
    }, [rewards])

    const spin = async (): Promise<void> => {
        const response = await spinMutation.mutateAsync({
            alias: wheelAlias,
        })

        setSpinning(true)
        setPrizeNumber(response.indexReward)
        setPrize(response)
        refetchWheelData()
        sendAnalyticsEvent({ event: 'SpinWheel' })
    }

    useEffect(() => {
        if (accessToken?.token) refetchWheelData()
    }, [accessToken?.token])

    return (
        <div data-aos="fade-zoom-in" data-aos-delay="300">
            <div className="relative mx-auto mb-14.5 w-[80vw] max-w-[27.8125rem]">
                {isValidRewards ? (
                    <>
                        <div className="relative z-[5] -rotate-45">
                            <Wheel
                                mustStartSpinning={spinning}
                                onStopSpinning={() => {
                                    setSpinning(false)
                                    open()
                                    onStop?.()
                                }}
                                prizeNumber={prizeNumber - 1}
                                data={formated}
                                outerBorderWidth={1}
                                outerBorderColor="#FFFFFF"
                                innerBorderWidth={74}
                                innerBorderColor="#FFFFFF"
                                disableInitialAnimation
                                radiusLineWidth={1}
                                radiusLineColor="#FFFFFF"
                                startingOptionIndex={0}
                                pointerProps={{
                                    style: {
                                        rotate: '45deg',
                                        translate: '-30% 30%',
                                    },
                                    src: '/images/ruffle/arrow.png',
                                }}
                                spinDuration={0.5}
                            />
                        </div>
                        <Image
                            src="/images/ruffle/arrow-section.png"
                            width={365}
                            height={226}
                            alt=""
                            className="absolute -top-3 left-1/2 max-w-[83%] -translate-x-1/2"
                            priority
                        />
                        <div className="absolute inset-0 rounded-full bg-cta-600" />
                        <Image
                            src="/images/ruffle/europebet-full.png"
                            width={254}
                            height={254}
                            alt="Europebet"
                            className="absolute top-1/2 left-1/2 z-[6] max-w-[58%] -translate-x-1/2 -translate-y-1/2"
                            priority
                            quality={100}
                        />
                    </>
                ) : (
                    <Image
                        src="/images/ruffle/unavaible-raffle.png"
                        width={415}
                        height={452}
                        alt="Unavaible raffle"
                        quality={100}
                        className="w-full"
                    />
                )}
            </div>
            <div className="relative z-[6] flex flex-col items-center gap-2">
                {description && (
                    <div className="text-sm leading-6 text-base-200">{description}</div>
                )}
                {(hasPrivileges || wheel.availableSpins > 0) && (
                    <AuthRequiredButton
                        disabled={
                            wheel.availableSpins === 0 || !isValidRewards || isLoadingWheelData
                        }
                        isLoading={spinMutation.isLoading}
                        text="Sign In to Spin"
                        onClick={spin}
                    >
                        {wheel.availableSpins === 0 ? 'Wait for refresh' : 'Spin'}
                    </AuthRequiredButton>
                )}
            </div>
            <RuffleRewardModal close={close} isOpen={isOpen} reward={prize} />
        </div>
    )
}

export default RuffleWheel
