import { FC } from 'react'

import NftAccordionWrapper from './nftAccordionWrapper'

import CopyButton from 'components/profile/basicInfo/copyButton'
import { maskInfo } from 'utils/mask-info'

interface DetailsProps {
    tokenId: string
    blockchain: string
    address: string
}

const Details: FC<DetailsProps> = ({ address, blockchain, tokenId }) => {
    return (
        <NftAccordionWrapper title="Details">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase text-base-200">Token ID</p>
                <div className="flex items-center gap-x-2">
                    {tokenId ? (
                        <CopyButton value={tokenId} classes={{ text: 'text-base-100' }} iconRight>
                            {maskInfo(tokenId)}
                        </CopyButton>
                    ) : (
                        'Not minted'
                    )}
                </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase text-base-200">Blockchain</p>
                <p className="">{blockchain ?? 'Not minted'}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-xs uppercase text-base-200">Contract address</p>
                <CopyButton classes={{ icon: 'hidden', text: 'text-link' }} value={address}>
                    {maskInfo(address, 5, 5)}
                </CopyButton>
            </div>
        </NftAccordionWrapper>
    )
}

export default Details
