export const MarketplaceProxyGalleryAbi = [
    {
        inputs: [
            {
                internalType: 'contract IGallery',
                name: 'gallery',
                type: 'address',
            },
            {
                internalType: 'contract IWalletInterface',
                name: 'wallet',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'bid',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IGallery',
                name: 'gallery',
                type: 'address',
            },
            {
                internalType: 'contract IWalletInterface',
                name: 'wallet',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'nonce',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'buy',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract IGallery',
                name: 'gallery',
                type: 'address',
            },
            {
                internalType: 'contract IWalletInterface',
                name: 'wallet',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'cancelBid',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'contract ICollection',
                name: 'collection',
                type: 'address',
            },
            {
                internalType: 'contract IWalletInterface',
                name: 'wallet',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'nonceWallet',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'signatureWallet',
                type: 'bytes',
            },
            {
                internalType: 'string',
                name: 'tokenURI',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'timeStart',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'timeEnd',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'currency',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'nonceCollection',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'signatureCollection',
                type: 'bytes',
            },
        ],
        name: 'mintWithFixedPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const
