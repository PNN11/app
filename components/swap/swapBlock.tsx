/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'

import { useInfiniteQuery, useMutation } from 'react-query'
import { toast } from 'react-toastify'

import SubmitButton from '../authorization/form/submitButton'
import ExternalInlineLink from '../profile/basicInfo/externalInlineLink'

import { AssetInput } from './assetInput'

import { Economics } from 'common-types/economics'
import openDepositAmtModal from 'components/modals/swapModals/depositModal'
import SwapModal from 'components/modals/swapModals/swapModal'
import WithdrawModal from 'components/modals/swapModals/withdraw'
import Badge from 'components/profile/referralInfo/badge'
import SwapArrow from 'components/svg/swapArrow'
import useBalance from 'hooks/useBalance'
import useLoggedIn from 'hooks/useLoggedIn'
import { useModal } from 'hooks/useModal'
import usePairs from 'hooks/usePairs'
import useRequireWallet from 'hooks/useRequireWallet'
import useSwapRate from 'hooks/useSwapRate'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import getChainId from 'utils/environment/getChainId'
import { HttpError } from 'utils/httpError'

interface ISwapBlock {
    linkText?: string
}

const limit = 10

const SwapBlock: FC<ISwapBlock> = ({ linkText }) => {
    const swapService = useServiceStore(state => state.swapService)
    const requireWallet = useRequireWallet()
    const ifLogged = useLoggedIn()

    const [selectedAssetFrom, setSelectedAssetFrom] = useState<Economics.IAsset>()
    const [selectedAssetTo, setSelectedAssetTo] = useState<Economics.IAsset>()

    const [enteredAmountFrom, setEnteredAmountFrom] = useState<string>('')
    const [enteredAmountTo, setEnteredAmountTo] = useState<string>('')

    const [assetPairs, pairs, fetchNextPairs] = usePairs(selectedAssetFrom?._id, limit)
    const [fromBalance, , updateFrom] = useBalance(selectedAssetFrom?._id)
    const [toBalance, , updateTo] = useBalance(selectedAssetTo?._id)

    const [isOpen, , close] = useModal(false)

    const [isWithdrawOpen, openWithdraw, closeWithdraw] = useModal(false)

    const rate = useSwapRate(selectedAssetFrom?._id, selectedAssetTo?._id, pairs)
    const [selectedFromSymbol, setSelectedFromSymbol] = useState<string>()
    const [selectedToSymbol, setSelectedToSymbol] = useState<string>()
    const [swapRate, setSwapRate] = useState<number>()

    const { data, fetchNextPage } = useInfiniteQuery(
        QueryKeys.ALL_ASSETS,
        ({ pageParam = 0, signal }) =>
            swapService.getAssets({
                limit: limit.toString(),
                offset: (pageParam * limit).toString(),
                signal,
            }),
        {
            getNextPageParam: lastPage => {
                if (lastPage.hasNextPage) return lastPage.nextPage
            },
            onSuccess(data) {
                if (!selectedAssetFrom) setSelectedAssetFrom(data.pages[0].docs[0])
            },
            refetchOnWindowFocus: false,
        }
    )

    const assets = useMemo(
        () =>
            data?.pages?.reduce((prev, current) => {
                return [...prev, ...(current?.docs ?? [])]
            }, [] as Economics.IAsset[]),
        [data]
    )

    // const reverseRate = (): void => {
    //     setSelectedFromSymbol(selectedToSymbol)
    //     setSelectedToSymbol(selectedFromSymbol)
    //     setSwapRate(prev => 1 / prev)
    // }

    // const swap = (): void => {
    //     setSelectedAssetTo(selectedAssetFrom)
    //     setSelectedAssetFrom(selectedAssetTo)
    //     setEnteredAmountTo(enteredAmountFrom)
    //     setEnteredAmountFrom(enteredAmountTo)
    // }

    const enterAmountFrom = (e: ChangeEvent<HTMLInputElement>): void => {
        setEnteredAmountFrom(e.target.value)
        setEnteredAmountTo(String(e.target.valueAsNumber * rate))
    }

    const enterAmountTo = (e: ChangeEvent<HTMLInputElement>): void => {
        setEnteredAmountTo(e.target.value)
        setEnteredAmountFrom(String(e.target.valueAsNumber / rate))
    }

    const sendMutation = useMutation(swapService.swap, {
        onSuccess() {
            updateFrom()
            updateTo()
            setEnteredAmountFrom('')
            setEnteredAmountTo('')
        },
        onError(e) {
            if (e instanceof HttpError) toast(e.message)
        },
    })

    const sendTransaction = (): void => {
        ifLogged().then(() =>
            sendMutation.mutate({
                _from: selectedAssetFrom._id,
                _to: selectedAssetTo._id,
                amount: parseFloat(enteredAmountFrom),
            })
        )
    }

    const openWithdrawModal = (): Promise<void> => requireWallet(() => openWithdraw(), getChainId())

    useEffect(() => {
        setSelectedFromSymbol(selectedAssetFrom?.symbol)
    }, [selectedAssetFrom])

    useEffect(() => {
        setSelectedToSymbol(selectedAssetTo?.symbol)
    }, [selectedAssetTo])

    useEffect(() => {
        setSwapRate(rate)
    }, [rate])

    useEffect(() => {
        if (assetPairs?.length) setSelectedAssetTo(assetPairs[0])
    }, [assetPairs])

    return (
        <div className="relative mx-auto w-full max-w-106 rounded-xl border border-base-700 bg-bg p-4 pt-3">
            <div className="mb-3 flex gap-4">
                <p>Swap</p>
                <button
                    disabled
                    onClick={openWithdrawModal}
                    type="button"
                    className="text-base-400 disabled:opacity-70"
                >
                    Withdraw
                </button>
            </div>
            <div className="absolute top-3 right-4">
                <Badge className="bg-base-700" title="Testnet" />
            </div>
            <div>
                <div className="mb-2 space-y-1">
                    <AssetInput
                        value={enteredAmountFrom}
                        setValue={enterAmountFrom}
                        selectedAsset={selectedAssetFrom}
                        setSelectedAsset={setSelectedAssetFrom}
                        balance={fromBalance}
                        assets={assets}
                        onReachEnd={fetchNextPage}
                    />
                    <div className="relative">
                        <div
                            className="absolute top-1/2 left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center
                                justify-center rounded-md border-2 border-base-800 bg-bg"
                            // onClick={swap}
                        >
                            <SwapArrow className="text-base-500" />
                        </div>
                    </div>
                    <AssetInput
                        value={enteredAmountTo}
                        setValue={enterAmountTo}
                        selectedAsset={selectedAssetTo}
                        setSelectedAsset={setSelectedAssetTo}
                        balance={toBalance}
                        assets={assetPairs}
                        onReachEnd={fetchNextPairs}
                    />
                    {/* <div className="flex items-center gap-x-2 rounded-2xl bg-base-800 py-2 px-4">
                        <p className="py-3 text-custom-xs">
                            1 {selectedFromSymbol} = {swapRate?.toFixed(2)} {selectedToSymbol}
                        </p>
                        <button type="button" onClick={reverseRate}>
                            <Image
                                src="/img/convert.svg"
                                alt="convert"
                                className="h-4 w-4"
                                width={16}
                                height={16}
                            />
                        </button>
                    </div> */}
                </div>
            </div>

            {linkText ? (
                <ExternalInlineLink className="mb-3" href="">
                    {linkText}
                </ExternalInlineLink>
            ) : null}
            <SubmitButton
                disabled
                className="mb-3 bg-cta py-3 disabled:bg-cta-700 disabled:text-cta disabled:opacity-100 disabled:shadow-none"
                handleClick={sendTransaction}
                isLoading={sendMutation.isLoading}
            >
                Swap is coming soon
            </SubmitButton>
            <div className="flex items-center justify-center gap-3">
                <p className="text-custom-xs opacity-70">To swap you need to have Arena Tokens.</p>
                <button
                    onClick={() => openDepositAmtModal()}
                    type="button"
                    className="text-cta underline underline-offset-4"
                >
                    Deposit
                </button>
            </div>
            <SwapModal closeModal={close} isOpen={isOpen} />

            <WithdrawModal closeModal={closeWithdraw} isOpen={isWithdrawOpen} />
        </div>
    )
}

export default SwapBlock
