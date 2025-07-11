import { setCookie } from 'cookies-next'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import SmallButton from 'components/common/ui/buttons/newSmallButton'
import { Container } from 'components/common/wrappers/container'
import useServiceStore from 'store/service'
import useAuthStore from 'store/useAuthStore'
import useUserStore from 'store/useUserStore'
import { accessTokenKey, refreshTokenKey } from 'utils/constants/auth'
import { HttpError } from 'utils/httpError'
import { getRecaptchaToken } from 'utils/recaptcha/getToken'

type PageProps = {
    id: string
}

const rewardsMap = new Map<string, { title: string; image: string; amount: number }>([
    [
        '63983078b08b5dcc66c53f48',
        { title: 'AMT', image: '/images/conference/amt-reward.png', amount: 100 },
    ],
    [
        '64ed8ee8f5cc21e096a62ad6',
        { title: 'AGP', image: '/images/conference/agp-reward.png', amount: 50 },
    ],
])

const ConferenceRewards: NextPage<PageProps> = ({ id }) => {
    const authService = useServiceStore(s => s.authService)
    const conferenceService = useServiceStore(s => s.conferenceService)
    const accessToken = useUserStore(store => store.accessToken)
    const setAccessToken = useUserStore(store => store.setAccessToken)
    const setRefreshToken = useUserStore(store => store.setRefreshToken)
    const setAuthState = useAuthStore(state => state.setAuthState)
    const router = useRouter()

    const reward = rewardsMap.get(id)

    const checkIsExistReward = useMutation(conferenceService.isExistRewardById, {
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const getConferenceRewards = useMutation(conferenceService.getRewardById, {
        onSuccess() {
            router.push('/profile')
        },
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const guestSignUp = useMutation(authService.guestSignUp, {
        async onSuccess(data) {
            setAccessToken(data.accessToken)
            setRefreshToken(data.refreshToken)
            setAuthState({ isAuth: true })

            setCookie(refreshTokenKey, data.refreshToken.token, {
                expires: new Date(data.refreshToken.expiresIn),
            })
            setCookie(accessTokenKey, data.accessToken.token, {
                expires: new Date(data.accessToken.expiresIn),
            })

            await getConferenceRewards.mutateAsync({ id })
        },
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const getRewards = async (): Promise<void> => {
        const response = await checkIsExistReward.mutateAsync({ id })

        if (!response?.isExists) {
            toast("Reward doesn't exist")
            router.push('/')

            return
        }

        if (accessToken) {
            await getConferenceRewards.mutateAsync({ id })

            return
        }

        const token = await getRecaptchaToken({ action: 'SignUp' })

        await guestSignUp.mutateAsync({ recaptcha: token })
    }

    return (
        <Container>
            <div className="mx-auto max-w-162 px-8 pb-8">
                {reward?.image && (
                    <Image
                        src={reward?.image}
                        width={600}
                        height={457}
                        alt={reward?.title}
                        quality={100}
                    />
                )}
                <p className="mb-8 text-center text-custom-2.5xl font-medium">
                    Special DeGameFi {reward?.title} Surprise Just for You
                </p>
                <SmallButton
                    className="w-full"
                    isLoading={
                        guestSignUp.isLoading ||
                        getConferenceRewards.isLoading ||
                        checkIsExistReward.isLoading
                    }
                    onClick={() => getRewards()}
                >
                    Claim {reward?.amount} {reward?.title}
                </SmallButton>
            </div>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { id } = ctx.query

    if (!id) return { notFound: true }

    return { props: { id } }
}

export default ConferenceRewards
