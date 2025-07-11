import { FC, useState } from 'react'

import Link from 'next/link'

import ModalWrapper from '../modalWrapper'
import SuccessItemPreview from '../nft/listing/successItemPreview'
import { ModalOverlay } from '../overlay'
import { promisifyModal } from '../promissify'
import { ConfirmableProps } from '../promissify/types'

import { Game } from 'common-types/game'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import useMintGameAsset from 'hooks/gameAssets/useMint'

interface Props extends ConfirmableProps, Game.TGameAsset {}

const MintGameAssetModal: FC<Props> = ({ proceed, show, cover, name, gameAssetId }) => {
    const [tokenId, setTokenId] = useState('')
    const close = (): void => proceed()
    const mintGameAsset = useMintGameAsset()

    const handleClick = async (): Promise<void> => {
        const res = await mintGameAsset.mutateAsync({ assetId: gameAssetId })

        if (!res) return

        setTokenId(res.tokenId)
    }

    return (
        <ModalOverlay isOpen={show} onClose={close}>
            <ModalWrapper title="Mint game asset" close={close} className="flex flex-col gap-8">
                <SuccessItemPreview logo={cover} title={name} />

                {tokenId ? (
                    <Link href={`/nft/${tokenId}`} onClick={close}>
                        <MarketplaceButton>Go to NFT page</MarketplaceButton>
                    </Link>
                ) : (
                    <MarketplaceButton isLoading={mintGameAsset.isLoading} onClick={handleClick}>
                        Mint
                    </MarketplaceButton>
                )}
            </ModalWrapper>
        </ModalOverlay>
    )
}

const openMintGameAssetModal = promisifyModal(MintGameAssetModal)

export default openMintGameAssetModal
