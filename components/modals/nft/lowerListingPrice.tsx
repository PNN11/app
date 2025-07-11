import { FC, useRef } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import Image from 'next/image'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import ListingModalWrapper from './listing/wrapper'

import { MarketplaceCollectionType } from 'common-types/marketplace/marketplace-collection'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { getCurrencySymbol } from 'components/common/nftCard/currency/symbol'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import FormikInput from 'components/common/ui/inputs/formikInput'
import { IModal } from 'components/modals/interfaces/modalInterface'
import { ModalOverlay } from 'components/modals/overlay'
import InfoSvg from 'components/svg/InfoSvg'
import useGetRequiredBlockchainService from 'hooks/blockchain/useGetRequiredBlockchainService'
import { useAsyncWrapper } from 'hooks/useAsyncWrapper'
import useRequireWallet from 'hooks/useRequireWallet'
import useEventStore from 'store/useEventStore'
import useWalletStore from 'store/useWalletStore'
import { getNftChainId } from 'utils/nft/getNftChainId'
import validation from 'validation/yup'

type FormType = {
    newPrice: number
}
const initialState: FormType = {
    newPrice: 0,
}

type PropsType = IModal & {
    nft: IMarketplaceToken.TBodyResponse
}
const LowerListingPriceModal: FC<PropsType> = ({ close, isOpen, nft }) => {
    const activeWallet = useWalletStore(state => state.activeWallet)
    const { wrap, processing, reset } = useAsyncWrapper()
    const emit = useEventStore(store => store.emit)
    const requireWallet = useRequireWallet()
    const getBlockchainService = useGetRequiredBlockchainService()

    const transactionProcessing = useRef(false)

    const schema = yup.object().shape({
        newPrice: validation.number.positiveNumber('price', true, nft.priceAmount),
    })

    const setNewPrice = async (
        { newPrice }: FormType,
        { resetForm }: FormikHelpers<FormType>
    ): Promise<void> => {
        if (transactionProcessing.current) return

        await requireWallet(async () => {
            transactionProcessing.current = true
            const blockchainService = await getBlockchainService()
            const [res] = await wrap(async () => {
                if (
                    nft.collection.payload.type === MarketplaceCollectionType.MINT &&
                    nft.payload.type === MarketplaceCollectionType.MINT
                ) {
                    const tx = await blockchainService.lowerListingPrice({
                        listingId: nft.payload.lastListingId,
                        price: +newPrice,
                        decimals: nft.currency.decimals,
                    })

                    const postedTx = await blockchainService.sendTransaction({ activeWallet, tx })

                    const lowerRes = await activeWallet.waitForTx(postedTx?.hash)

                    resetForm()

                    return lowerRes
                }
            }, null)()

            transactionProcessing.current = false

            if (!res?.success) {
                toast('Failed to lower listing price')
                reset()

                return
            }

            emit(`lowerprice-${nft._id}`, { target: { ...nft, priceAmount: +newPrice } })
            close()
        }, getNftChainId(nft))
    }

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <ListingModalWrapper
                title="Lower the listing price"
                close={close}
                className="flex flex-col gap-8"
            >
                <Formik
                    onSubmit={setNewPrice}
                    validateOnMount
                    validationSchema={schema}
                    initialValues={initialState}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2 md:flex-row">
                                    <div className="flex w-[8.5rem] items-center gap-2 rounded-2xl bg-base-700 p-3 text-base-100">
                                        <Image
                                            src={nft.currency?.icon}
                                            alt={`${nft.currency?.symbol}icon`}
                                            width={20}
                                            height={20}
                                        />
                                        <div>{getCurrencySymbol(nft.currency)}</div>
                                    </div>
                                    <FormikInput
                                        name="newPrice"
                                        type="number"
                                        placeholder={`max value: ${nft.priceAmount}`}
                                        classes={{ wrapper: 'w-full' }}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-7">
                                        <InfoSvg />
                                    </div>

                                    <div className="mb-8">
                                        You must pay an additional gas fee if you want to cancel
                                        this listing at a later point.{' '}
                                        <span className="text-base-300">Learn more</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 md:flex-row">
                                <MarketplaceButton
                                    className="w-full"
                                    variant="inline"
                                    onClick={close}
                                >
                                    Never mind
                                </MarketplaceButton>
                                <MarketplaceButton
                                    className="w-full"
                                    type="submit"
                                    isLoading={processing}
                                >
                                    Set new price
                                </MarketplaceButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

export default LowerListingPriceModal
