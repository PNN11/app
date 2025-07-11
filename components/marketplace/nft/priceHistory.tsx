import { FC, useState } from 'react'

import moment from 'moment'
import { useQuery } from 'react-query'

import PriceHistoryBlock from '../priceHistoryBlock'

import NftAccordionWrapper from './nftAccordionWrapper'

import useServiceStore from 'store/service'
import { priceHistoryOptions } from 'utils/constants/priceHistoryOptions'

interface PriceHistoryProps {
    tokenId: string
}

const PriceHistory: FC<PriceHistoryProps> = ({ tokenId }) => {
    const [priceHistoryOption, setPriceHistoryOption] = useState(priceHistoryOptions[0])

    const marketplaceService = useServiceStore(state => state.marketplaceService)

    const { data: priceHistory, isLoading } = useQuery(
        ['token-price-history', priceHistoryOption, tokenId],
        () =>
            marketplaceService.getTokenPriceHistory({
                tokenId,
                dateMin: priceHistoryOption.timestamp,
                dateMax: moment().format('MM-DD-YYYY'),
            }),
        { enabled: !!tokenId }
    )

    return (
        <NftAccordionWrapper title="Price History">
            <PriceHistoryBlock
                priceHistoryOption={priceHistoryOption}
                setPriceHistoryOption={setPriceHistoryOption}
                priceHistory={priceHistory}
                isLoading={isLoading}
                classes={{
                    chart: 'h-28 w-full',
                    dropdown: 'md:w-full lg:w-55',
                    wrapper: 'mb-5 md:flex-col md:items-start lg:flex-row lg:items-center',
                }}
            />
        </NftAccordionWrapper>
    )
}

export default PriceHistory
