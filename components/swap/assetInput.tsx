import { ChangeEvent, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { Economics } from 'common-types/economics'
import { numberFormatter } from 'utils/math/formatNumber'
import { validateIntegerAndFloatDigitsLength } from 'utils/math/validateIntegerAndFloatDigits'
import { integerOrFloatNumbers } from 'utils/regexp/number'

type PropsType = {
    assets: Economics.IAsset[]
    className?: string
    balance: number
    value: string
    setValue: (e: ChangeEvent<HTMLInputElement>) => void
    selectedAsset: Economics.IAsset
    setSelectedAsset: (currency: Economics.IAsset) => void
    onReachEnd?: () => void
}

export const AssetInput: FC<PropsType> = ({
    assets,
    balance,
    value,
    setValue,
    selectedAsset,
    setSelectedAsset,
    className = '',
    onReachEnd,
}) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

    const { ref } = useInView({
        threshold: 1,
        onChange(inView) {
            if (inView && onReachEnd) onReachEnd()
        },
    })

    const dropdown = useRef() as MutableRefObject<HTMLDivElement>

    const changeCurrency = (asset: Economics.IAsset): void => {
        setSelectedAsset(asset)
        setIsOpenDropdown(!isOpenDropdown)
    }

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            // @ts-ignore
            if (e.target.closest('.dropdown') !== dropdown.current) {
                setIsOpenDropdown(false)
            }
        }

        document.addEventListener('click', clickHandler)

        return () => {
            document.removeEventListener('click', clickHandler)
        }
    }, [])

    return (
        <div
            className={`flex items-center justify-between rounded-2xl bg-base-800 p-4 ${className}`}
        >
            <div>
                <div
                    className="dropdown relative cursor-default"
                    ref={dropdown}
                    // onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                    <div className="mb-2 flex items-center gap-x-3 rounded-2xl bg-cta p-2">
                        {selectedAsset?.icon ? (
                            <Image
                                src={selectedAsset.icon}
                                alt="coin"
                                width={24}
                                height={24}
                                className="h-6"
                            />
                        ) : null}
                        <p className="text-custom-xl">{selectedAsset?.symbol}</p>
                        {/* <Image
                            src="/img/arrowSelect.svg"
                            alt="arrowSelect"
                            className="pr-0.5 opacity-30"
                            width={10}
                            height={6}
                        /> */}
                    </div>
                    <div
                        className={`${
                            isOpenDropdown ? 'block' : 'hidden'
                        } absolute top-[120%] z-10 w-full rounded-xl bg-cta py-1 pr-1`}
                    >
                        <div className="max-h-50 overflow-y-auto">
                            {!!assets?.length &&
                                assets.map(asset => (
                                    <div
                                        key={asset._id}
                                        className="flex cursor-pointer gap-2 p-2"
                                        onClick={() => changeCurrency(asset)}
                                    >
                                        <Image
                                            src={asset.icon}
                                            alt="coin"
                                            width={24}
                                            height={24}
                                            className="h-5 w-5"
                                        />
                                        {asset.symbol}
                                    </div>
                                ))}
                        </div>
                        {onReachEnd ? <div ref={ref} /> : null}
                    </div>
                </div>
                <p className={`text-custom-xs ${balance ? 'text-base-100' : 'text-base-400'}`}>
                    Balance: {numberFormatter(balance, 0, 3)}
                </p>
            </div>
            <input
                value={value}
                type="number"
                placeholder="0.00"
                className="max-w-[50%] bg-transparent text-right text-2xl placeholder:text-base-400"
                onChange={e => {
                    if (
                        integerOrFloatNumbers.test(e.target.value) &&
                        validateIntegerAndFloatDigitsLength({ value: e.target.value })
                    ) {
                        setValue(e)
                    }
                }}
            />
        </div>
    )
}
