import { FC } from 'react'

import NftInfoWrapper from '../infoWrapper'

interface GameAssetCardInfoProps {
    name: string
}

const GameAssetCardInfo: FC<GameAssetCardInfoProps> = ({ name }) => {
    return (
        <NftInfoWrapper className="relative group-hover:-mt-12 group-hover:pb-16">
            <h5 className="font-medium">{name}</h5>
            <div className="absolute left-4 right-4 mt-4 opacity-0 group-hover:mt-2 group-hover:opacity-100">
                <p>This item can be mint in future</p>
            </div>
        </NftInfoWrapper>
    )
}

export default GameAssetCardInfo
