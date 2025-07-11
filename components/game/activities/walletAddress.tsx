import { FC } from 'react'

import useCheckIsYouWalletOwner from 'hooks/useCheckIsYouWalletOwner'
import { maskInfo } from 'utils/mask-info'

interface WalletAddressProps {
    address: string
}

const WalletAddress: FC<WalletAddressProps> = ({ address }) => {
    const checkWallet = useCheckIsYouWalletOwner()

    return (
        <span className={`${checkWallet(address) ? '' : 'text-link'}`}>
            {checkWallet(address) ? 'you' : maskInfo(address)}
        </span>
    )
}

export default WalletAddress
