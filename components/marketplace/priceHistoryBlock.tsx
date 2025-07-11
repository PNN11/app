import { Dispatch, FC, SetStateAction } from 'react'

import Image from 'next/image'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'
import Skeleton from 'components/common/skeleton'
import { Dropdown } from 'components/common/ui/dropdown'
import Chart from 'components/game/activities/chart'
import { PriceHistoryOption, priceHistoryOptions } from 'utils/constants/priceHistoryOptions'

interface PriceHistoryBlockProps {
    priceHistoryOption: PriceHistoryOption
    setPriceHistoryOption: Dispatch<SetStateAction<PriceHistoryOption>>
    priceHistory: IMarketplaceCollection.PriceHistoryResponse
    classes?: { wrapper?: string; chart?: string; dropdown?: string }
    isLoading?: boolean
}

const PriceHistoryOptionLabel = ({ label }: { label: string }): JSX.Element => {
    return <span>{label}</span>
}

const PriceHistoryBlock: FC<PriceHistoryBlockProps> = ({
    priceHistoryOption,
    setPriceHistoryOption,
    priceHistory,
    classes = { chart: '', dropdown: '', wrapper: '' },
    isLoading = false,
}) => {
    return (
        <>
            <div
                className={`flex flex-col gap-7 text-custom-sl s:flex-row s:items-center s:justify-start ${classes.wrapper}`}
            >
                <Dropdown
                    items={priceHistoryOptions}
                    activeItem={priceHistoryOption}
                    setActiveItem={setPriceHistoryOption}
                    elementToLabel={PriceHistoryOptionLabel}
                    classes={{
                        wrapper: `w-full s:w-55 ${classes.dropdown}`,
                        activeItem: 'bg-base-650',
                    }}
                />
                <div className="flex items-center gap-18 s:gap-7">
                    <div>
                        <p className="mb-1 text-base-100/60">
                            {priceHistoryOption.value} Avg. Price
                        </p>
                        <Skeleton isLoading={isLoading}>
                            <p>{priceHistory?.avg}</p>
                        </Skeleton>
                    </div>
                    <div>
                        <p className="mb-1 text-base-100/60">{priceHistoryOption.value} Volume</p>
                        <Skeleton isLoading={isLoading}>
                            <p>{priceHistory?.volume}</p>
                        </Skeleton>
                    </div>
                </div>
            </div>
            <div className={`${classes.chart}`}>
                {!isLoading ? (
                    <Chart data={priceHistory?.prices} />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Image
                            src="/img/loader.png"
                            alt="loading"
                            height={60}
                            width={60}
                            className="loading w-15"
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default PriceHistoryBlock
