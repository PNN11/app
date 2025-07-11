import { FC, PropsWithChildren, ReactNode } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

type Props = {
    nft: IMarketplaceToken.TBodyResponse
    className?: string
    fallback?: ReactNode
}

const UnstakedOnly: FC<PropsWithChildren<Props>> = ({
    nft,
    children,
    className,
    fallback = null,
}) => {
    if (nft.payload.type === 'MINT' && nft.payload.isStaked)
        return <div className={className}>{fallback}</div>

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
}

export default UnstakedOnly
