import { FC, ReactNode, useEffect, useState } from 'react'

import { Form, Formik } from 'formik'
import moment from 'moment'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { QueryClient, dehydrate, useQuery } from 'react-query'
import * as yup from 'yup'

import FormikInput from '../../../components/common/ui/inputs/formikInput'
import useRedirect from '../../../hooks/useRedirect'

import { Economics } from 'common-types/economics'
import { Gallery } from 'common-types/gallery'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import Datepicker from 'components/common/ui/datepicker/datepicker'
import { Dropdown } from 'components/common/ui/dropdown'
import LabelWithTooltip from 'components/common/ui/labelWithTooltip'
import { OptionsType } from 'components/common/ui/radio/radio'
import RadioForFormik from 'components/common/ui/radio/radioForFormik'
import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'
import SellNftPreview from 'components/marketplace/nft/sell/sellNftPreview'
import ListingModal from 'components/modals/nft/listing'
import { DropdownArrow } from 'components/svg/dropdownArrow'
import useGetERC20Currencies from 'hooks/swap/useGetERC20Currencies'
import { useHydrated } from 'hooks/useHydrated'
import { useModal } from 'hooks/useModal'
import { MarketplaceService } from 'services/api/marketplace'
import useServiceStore from 'store/service'
import useUserStore from 'store/useUserStore'
import { QueryKeys } from 'utils/constants/reactQuery'
import { defaultFee } from 'utils/math/fee/calculateFee'
import validation from 'validation/yup'

type SellNftForm = {
    coin: string
    price: number
    startDate: Date
    stopDate: Date
    listingType: string
}
const typeData: OptionsType[] = [
    { title: 'Fixed price', value: Gallery.ListingType.BUY, icon: '' },
    { title: 'Timed auction', value: Gallery.ListingType.AUCTION, icon: '' },
]

const durations = [
    { title: '1 minute', _id: '0', addDuration: day => moment(day).add(1, 'm').toDate() },
    { title: '3 minutes', _id: '6', addDuration: day => moment(day).add(3, 'm').toDate() },
    { title: '1 day', _id: '1', addDuration: day => moment(day).add(1, 'day').toDate() },
    { title: '1 week', _id: '2', addDuration: week => moment(week).add(1, 'week').toDate() },
    { title: '1 month', _id: '3', addDuration: month => moment(month).add(1, 'month').toDate() },
    { title: '3 months', _id: '4', addDuration: month => moment(month).add(3, 'month').toDate() },
    { title: '6 months', _id: '5', addDuration: month => moment(month).add(6, 'month').toDate() },
]

const startListingDelay = 50000

export const CurrencyLabel = ({ icon, symbol }: Economics.IAsset): JSX.Element => (
    <div className="flex items-center gap-2">
        <Image src={icon ?? ''} alt={`${symbol ?? ''}icon`} width={24} height={24} />
        <div className="text-custom-sl">{symbol ?? ''}</div>
    </div>
)
const DurationLabel = ({ title }): JSX.Element => (
    <div className="flex items-center gap-2">
        <Image src="/img/marketplace/status.svg" alt="icon" width={20} height={20} />
        <div className="text-custom-sl">{title}</div>
    </div>
)

type LabelForRadioType = (item: OptionsType, isSelected: boolean) => ReactNode

const LabelForRadio: LabelForRadioType = ({ title }, isSelected) => (
    <span className={`${isSelected ? '' : 'text-base-300'}`}>{title}</span>
)

const initialState: SellNftForm = {
    coin: '',
    price: 0,
    startDate: new Date(Date.now() + startListingDelay),
    stopDate: new Date(),
    listingType: `${Gallery.ListingType.BUY}`,
}
const schema = yup.object().shape({
    price: validation.number.positiveNumber('price', true),
})

type PropsType = {
    id: string
}

const SellNft: FC<PropsType> = ({ id }) => {
    useRedirect()
    const router = useRouter()
    const userId = useUserStore(state => state.userId)
    const isHydrated = useHydrated()
    const marketplaceService = useServiceStore(store => store.marketplaceService)

    const [activePrice, setActivePrice] = useState<Economics.IAsset>(null)
    const [activeDuration, setActiveDuration] = useState(durations[durations.length - 1])

    const [isOpenListing, openListing, closeListing] = useModal()

    const submitForm = async (): Promise<void> => {
        openListing()
    }

    const {
        data: nft,
        isLoading,
        isError,
    } = useQuery([QueryKeys.GET_NFT, id], () => marketplaceService.getToken({ id }))
    const assets = useGetERC20Currencies(nft?.currency?.chaiId)

    const link =
        nft.payload.resolution === 'TOKEN_ERC721' ? `/nft/${nft._id}` : `/mysterybox/${nft._id}`

    useEffect(() => {
        setActivePrice(assets.data?.pages?.[0]?.docs[0])
    }, [assets.data])

    useEffect(() => {
        if (nft.status === 'SALE') {
            router.push(`/nft/${nft._id}`)

            return
        }
        if (nft?.payload?.ownerId !== userId) {
            router.push('/404')
        }
    }, [])

    return (
        <PageWrapper>
            {!isLoading && !isError && nft && (
                <>
                    <div className="bg-base-700 px-6 py-5">
                        <Container>
                            <Link href={link} className="flex w-fit items-center gap-5">
                                <DropdownArrow className="rotate-90" height={20} width={20} />
                                <div>{nft.payload.name}</div>
                            </Link>
                        </Container>
                    </div>

                    <Formik
                        onSubmit={submitForm}
                        validateOnMount
                        validationSchema={schema}
                        initialValues={initialState}
                    >
                        {formik => (
                            <Container className="mb-3 grid grid-cols-1 gap-0 pb-20 pt-3 lg:mb-0 lg:grid-cols-2 lg:gap-4 lg:pt-5">
                                <Form className="contents space-y-6 lg:col-span-1 lg:block">
                                    <div className="order-1 mb-6 text-xl sm:text-custom-4xl lg:mb-0">
                                        List item for sale
                                    </div>
                                    <div className="order-3 flex flex-col gap-4">
                                        <div className="self-start">
                                            <div className="mb-2">Type:</div>
                                            <RadioForFormik
                                                itemToLabel={LabelForRadio}
                                                options={typeData}
                                                name="listingType"
                                            />
                                        </div>
                                        <div className="flex w-full flex-col gap-2">
                                            <LabelWithTooltip
                                                label={
                                                    formik.values.listingType === '2'
                                                        ? 'Min price'
                                                        : 'Price'
                                                }
                                                infoText="Info about price"
                                            />
                                            <div className="flex w-full flex-col gap-2 sm:flex-row">
                                                <Dropdown
                                                    items={(
                                                        assets?.data?.pages?.map(
                                                            page => page.docs
                                                        ) ?? []
                                                    ).flat()}
                                                    activeItem={activePrice}
                                                    setActiveItem={setActivePrice}
                                                    elementToLabel={CurrencyLabel}
                                                    classes={{ wrapper: 'w-full sm:w-1/3' }}
                                                    onScrollEnd={assets.fetchNextPage}
                                                />
                                                <div className="w-full sm:w-2/3">
                                                    <FormikInput
                                                        name="price"
                                                        type="number"
                                                        placeholder="0"
                                                        patternForRemoveSymbols={/-/i}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-2 flex gap-1">
                                                <span>Duration</span>
                                            </div>
                                            <Dropdown
                                                items={durations}
                                                activeItem={activeDuration}
                                                setActiveItem={setActiveDuration}
                                                elementToLabel={DurationLabel}
                                                classes={{ wrapper: 'w-full' }}
                                            />
                                        </div>
                                        {isHydrated ? (
                                            <Datepicker addDuration={activeDuration.addDuration} />
                                        ) : null}
                                        <div className="flex flex-col gap-1">
                                            <LabelWithTooltip
                                                label="Fees"
                                                infoText="Info about fees"
                                            />
                                            <div className="opacity-60">
                                                Service Fee: {defaultFee}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-4">
                                        <MarketplaceButton className="md:w-1/2" type="submit">
                                            Complete listing
                                        </MarketplaceButton>
                                    </div>
                                </Form>

                                <SellNftPreview
                                    priceValue={formik.values.price}
                                    nft={nft}
                                    activePrice={activePrice}
                                />
                                <ListingModal
                                    txInfo={{
                                        priceValue: formik.values.price,
                                        startDate: formik.values.startDate,
                                        stopDate: formik.values.stopDate,
                                        coin: activePrice?.address,
                                        listingType: +formik.values.listingType,
                                        currencyIcon: activePrice?.icon,
                                    }}
                                    nft={nft}
                                    isOpen={isOpenListing}
                                    close={closeListing}
                                />
                            </Container>
                        )}
                    </Formik>
                </>
            )}
        </PageWrapper>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { id = '' } = context.query
    const queryClient = new QueryClient()
    const marketplaceService = new MarketplaceService()

    await queryClient.prefetchQuery([QueryKeys.GET_NFT, id], () =>
        marketplaceService.getToken({ id: id as string })
    )

    const nft = queryClient.getQueryData<IMarketplaceToken.TBodyResponse>([QueryKeys.GET_NFT, id])

    if (nft.status === 'SALE') {
        return { redirect: { destination: `/nft/${nft._id}`, permanent: false } }
    }

    return { props: { id, dehydratedState: dehydrate(queryClient) } }
}

export default SellNft
