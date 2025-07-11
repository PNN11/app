type TCurrency = 'ETH' | 'MATIC' | 'USDT'

interface ITokenInfo {
    address: string
    name: string
    decimals: number
    icon: any
    ticker: TCurrency
}

const dictionaryMain: Record<string, ITokenInfo> = {
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': {
        address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        name: 'USDT',
        icon: '',
        decimals: 6,
        ticker: 'USDT',
    },
    '0x0000000000000000000000000000000000001010': {
        address: '0x0000000000000000000000000000000000001010',
        decimals: 18,
        name: 'MATIC',
        icon: '',
        ticker: 'MATIC',
    },
}

const dictionaryDev: Record<string, ITokenInfo> = {
    '0x77512daD51Bcb0318cE64b00e9410677FAF82157': {
        address: '0x77512daD51Bcb0318cE64b00e9410677FAF82157',
        name: 'USDT',
        icon: '',
        decimals: 18,
        ticker: 'USDT',
    },
    '0x0000000000000000000000000000000000001010': {
        address: '0x0000000000000000000000000000000000001010',
        decimals: 18,
        name: 'MATIC',
        icon: '',
        ticker: 'MATIC',
    },
}

export const TokensDictionary =
    process.env.NEXT_PUBLIC_NET === 'DEV' ? dictionaryDev : dictionaryMain
