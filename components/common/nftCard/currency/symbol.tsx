import { FC } from 'react'

import { Economics } from 'common-types/economics'
import { WithClassName } from 'utils/types/common'

type Props = WithClassName<{
    asset: Pick<Economics.IAsset, 'symbol'>
}>

export const CurrencySymbol: FC<Props> = ({ asset, className }) => {
    return <span className={className}>{getCurrencySymbol(asset)}</span>
}

export function getCurrencySymbol(asset: Pick<Economics.IAsset, 'symbol'>): string {
    return asset?.symbol ?? 'SNF'
}
