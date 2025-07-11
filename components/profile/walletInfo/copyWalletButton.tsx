import { FC } from 'react'

import WalletActionButton from './walletActionButton'

import CopyIcon from 'components/svg/copy'
import useCopyToClipboard from 'hooks/useCopyToClipboard'

interface Props {
    address: string
}

const CopyWalletButton: FC<Props> = ({ address }) => {
    const [copy, copied] = useCopyToClipboard()

    return (
        <WalletActionButton
            onClick={() => copy(address)}
            Icon={CopyIcon}
            iconClassName="stroke-base-100"
            title={copied ? 'Copied' : 'Copy'}
        />
    )
}

export default CopyWalletButton
