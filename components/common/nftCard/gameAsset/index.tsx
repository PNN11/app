import { FC, useRef } from 'react'

import NftPreview from '../nftPreview'

import GameAssetCardInfo from './info'

import { Game } from 'common-types/game'
import TranslateCardWrapper from 'components/common/wrappers/translateCard'

interface Props extends Game.TGameAsset {}

const GameAssetCard: FC<Props> = ({ cover, name }) => {
    const ref = useRef<HTMLVideoElement>(null)

    return (
        <div className="group/translate-card group block cursor-pointer">
            <TranslateCardWrapper>
                <div className="flex flex-col overflow-hidden">
                    <NftPreview logo={cover} name={name} ref={ref} />
                    <GameAssetCardInfo name={name} />
                </div>
            </TranslateCardWrapper>
        </div>
    )
}

export default GameAssetCard
