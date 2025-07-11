import { FC } from 'react'

const tableHeaders = [
    'NFT',
    'Referral multiplier',
    'Reward multiplier',
    'Spins in the Raffle',
    'Expiration time',
    '',
]

const NftForStakingTableHeader: FC = () => {
    return (
        <div className="grid grid-cols-staking-row items-center justify-between px-5 py-3 xl:grid-cols-staking-row-xl">
            {tableHeaders.map((item, index) => (
                <p className={`text-base-200 ${index ? 'text-end' : ''}`} key={item}>
                    {item}
                </p>
            ))}
        </div>
    )
}

export default NftForStakingTableHeader
