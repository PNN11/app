import { FC } from 'react'

import { Form, Formik } from 'formik'
import Image from 'next/image'
import * as yup from 'yup'

import ListingModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { getCurrencySymbol } from 'components/common/nftCard/currency/symbol'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import FormikInput from 'components/common/ui/inputs/formikInput'
import LabelWithTooltip from 'components/common/ui/labelWithTooltip'
import validation from 'validation/yup'

const minimalBidText =
    'This is the minimal bid. To participate in auction you need to make a bid greater by one AGP than the minimal bid.'

const lastBidText =
    'This is the highest bid. To participate in auction you need to make a bid greater by one AGP than the last highest bid.'

export type TBidFormType = {
    bidPrice: number
}
const initialState: TBidFormType = {
    bidPrice: 0,
}

type Props = {
    nft: IMarketplaceToken.TBodyResponse
    close: () => void
    onSubmit: ({ bidPrice }: TBidFormType) => Promise<void>
    isLoading: boolean
}
const BidForm: FC<Props> = ({ nft, close, onSubmit, isLoading }) => {
    const lastBid = nft.payload.type === 'MINT' && nft.payload.lastBidPriceAmount

    const schema = yup.object().shape({
        bidPrice: validation.number.positiveNumber(
            'price',
            true,
            null,
            nft.payload.type === 'MINT' && nft.payload.lastBidPriceAmount,
            nft.payload.type === 'MINT' && nft.payload.lastBidPriceAmount ? null : nft.priceAmount
        ),
    })

    return (
        <ListingModalWrapper title="Place your bid" close={close} className="flex flex-col gap-7">
            <Formik
                onSubmit={onSubmit}
                validateOnMount
                validationSchema={schema}
                initialValues={initialState}
            >
                {() => (
                    <Form className="space-y-7">
                        <div className="border-line-gradient flex justify-between border-b pb-2">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={nft.payload.logo}
                                    width={70}
                                    height={70}
                                    alt="nft preview"
                                    className="aspect-square w-[4.375rem] rounded-2xl"
                                />
                                <div className="flex w-full flex-col gap-1">
                                    <p className="text-custom-sl text-link">
                                        {nft.payload.game?.title}
                                    </p>
                                    <div className="text-xl uppercase">{nft.payload.name}</div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-center gap-1">
                                <div className="flex items-center gap-1">
                                    <Image
                                        src={nft.currency.icon}
                                        alt={`${nft.currency.icon}icon`}
                                        width={20}
                                        height={20}
                                        className="h-5"
                                    />
                                    <div className="text-custom-2.5xl">
                                        {lastBid || nft.priceAmount}
                                    </div>
                                </div>

                                <LabelWithTooltip
                                    labelClassName="text-base-300"
                                    label={lastBid ? 'Top bid' : 'Minimal bid'}
                                    infoText={lastBid ? lastBidText : minimalBidText}
                                />
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-2 md:flex-row">
                            <div className="w-full md:w-2/3">
                                <FormikInput name="bidPrice" type="number" placeholder="0" />
                            </div>
                            <div className="flex h-fit w-full items-center justify-between gap-2 rounded-2xl bg-base-700 p-3 md:w-1/3">
                                <div className="text-base-100">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={nft.currency?.icon}
                                            alt={`${getCurrencySymbol(nft.currency)} icon`}
                                            width={24}
                                            height={24}
                                            className="aspect-square w-6"
                                        />
                                        <div className="text-custom-sl">
                                            {getCurrencySymbol(nft.currency)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MarketplaceButton type="submit" isLoading={isLoading}>
                            Place a bid
                        </MarketplaceButton>
                    </Form>
                )}
            </Formik>
        </ListingModalWrapper>
    )
}

export default BidForm
