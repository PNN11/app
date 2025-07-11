import { FC, useRef } from 'react'

import NftPreview from '../nftPreview'

import GameAssetCardForShopInfo from './infoShop'

import { Game } from 'common-types/game'
import TranslateCardWrapper from 'components/common/wrappers/translateCard'

interface Props extends Game.TGameAsset {}

const GameAssetCardForShop: FC<Props> = props => {
    const { cover, name } = props
    const ref = useRef<HTMLVideoElement>(null)

    return (
        <div className="group/translate-card group block cursor-pointer">
            <TranslateCardWrapper>
                <div className="flex h-full flex-col overflow-hidden">
                    <NftPreview logo={cover} name={name} ref={ref} />
                    <GameAssetCardForShopInfo {...props} />
                </div>
            </TranslateCardWrapper>
        </div>
    )
}

export default GameAssetCardForShop
