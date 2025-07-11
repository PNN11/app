/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import { FC } from 'react'

import Image from 'next/image'

import Radio from 'components/common/ui/radio/radio'
import Badge from 'components/profile/referralInfo/badge'
import useGetUsdToAmtSwapRate from 'hooks/swap/useGetUsdToAmtSwapRate'

const options = [
    { title: '2 USD', value: '2000', icon: 'Hamster' },
    { title: '50 USD', value: '50000', icon: 'Monkey' },
    { title: '100 USD', value: '100000', icon: 'Mammoth' },
    { title: '1000 USD', value: '1000000', icon: 'Whale' },
]

interface Props {
    value: string
    setValue: (value: string) => void
}

const BinanceDepositOptions: FC<Props> = ({ setValue, value }) => {
    const rate = useGetUsdToAmtSwapRate()

    return (
        <>
            <div className="mb-3">
                Choose the amount of Arcane Merge Token (AMT) you want to buy
            </div>
            <div className="mb-6">
                <Radio
                    name="sum"
                    options={options}
                    value={value}
                    onChangeOption={value => setValue(value)}
                    spanProps={{ className: 'text-base-100' }}
                    itemToLabel={({ icon, value, title }, isSelected) => {
                        return value === 'NaN' ? (
                            <div className="flex items-center gap-1">
                                <div>{title} GOLD PASS for ARENA GAMES</div>
                                <Image
                                    src="/images/regular-pass.jpg"
                                    width={1080}
                                    height={1080}
                                    alt="Gold pass"
                                    className="aspect-square w-6"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <div>
                                    {`${+value * rate} USD`}{' '}
                                    {`(${(+value).toLocaleString('us-US')} AMT)`}
                                </div>
                                <Badge
                                    title={icon}
                                    className={`${
                                        isSelected ? 'bg-base-700' : 'bg-base-600'
                                    } select-none py-1 text-sm font-medium leading-4`}
                                />
                            </div>
                        )
                    }}
                />
            </div>
        </>
    )
}

export default BinanceDepositOptions
