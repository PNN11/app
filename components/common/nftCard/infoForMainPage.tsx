import { FC } from 'react'

import NftInfoWrapper from './infoWrapper'

interface NftCardInfoProps {
    name: string
    price: number
    symbol: string
}

const NftCardInfoForMainPage: FC<NftCardInfoProps> = ({ name, price, symbol }) => {
    return (
        <NftInfoWrapper>
            <div className="font-medium">{name}</div>
            <div>
                {price} {symbol}
            </div>
        </NftInfoWrapper>
    )
}

export default NftCardInfoForMainPage
