export const MarketplaceGalleryAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'blacklisted',
                type: 'bool',
            },
        ],
        name: 'Blacklisted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'bidder',
                type: 'address',
            },
        ],
        name: 'CancelBid',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'ClaimToken',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'collection',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'string',
                name: 'slug',
                type: 'string',
            },
        ],
        name: 'CollectionCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'creator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'enabled',
                type: 'bool',
            },
        ],
        name: 'CollectionCreatorSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'collection',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'status',
                type: 'bool',
            },
        ],
        name: 'CollectionSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'currency',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'enabled',
                type: 'bool',
            },
        ],
        name: 'CurrencySet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'address',
                name: 'feePlatformAddress',
                type: 'address',
            },
        ],
        name: 'FeePlatformAddressSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint8',
                name: 'version',
                type: 'uint8',
            },
        ],
        name: 'Initialized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'bidder',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timeEnd',
                type: 'uint256',
            },
        ],
        name: 'ListingBid',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'buyer',
                type: 'address',
            },
        ],
        name: 'ListingBought',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'collection',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'enum Gallery2.ListingType',
                name: 'listingType',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timeStart',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'timeEnd',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'address',
                name: 'currency',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'minimalBid',
                type: 'uint256',
            },
        ],
        name: 'ListingCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'claimer',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'PendingWithdrawn',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'PriceReduction',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'target',
                type: 'address',
            },
        ],
        name: 'RevertToken',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
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
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'bidETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'bids',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'bidsInListings',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
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
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'buyETH',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
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
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'claimCollectible',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'collectionCreators',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'slug_',
                type: 'string',
            },
            {
                internalType: 'address',
                name: 'signer_',
                type: 'address',
            },
        ],
        name: 'createCollection',
        outputs: [
            {
                internalType: 'address',
                name: 'collection',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'enum Gallery2.ListingType',
                name: 'listingType',
                type: 'uint8',
            },
            {
                internalType: 'contract ICollection',
                name: 'collection',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
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
                internalType: 'contract IERC20Upgradeable',
                name: 'currency',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'minimalBid',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'bidStep',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'gracePeriod',
                type: 'uint256',
            },
        ],
        name: 'createListing',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'enum Gallery2.ListingType',
                name: 'listingType',
                type: 'uint8',
            },
            {
                internalType: 'address',
                name: 'seller',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
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
                internalType: 'contract IERC20Upgradeable',
                name: 'currency',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'minimalBid',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'bidStep',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'gracePeriod',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'claimed',
                type: 'bool',
            },
        ],
        name: 'createListingFromCollection',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'currencies',
        outputs: [
            {
                internalType: 'bool',
                name: 'enabled',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'feePlatformAddress',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_feePlatformAddress',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'isBlacklisted',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'isCollection',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'listings',
        outputs: [
            {
                internalType: 'enum Gallery2.ListingType',
                name: 'listingType',
                type: 'uint8',
            },
            {
                internalType: 'address',
                name: 'seller',
                type: 'address',
            },
            {
                internalType: 'contract ICollection',
                name: 'collection',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
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
                internalType: 'contract IERC20Upgradeable',
                name: 'currency',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'minimalBid',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'lastBid',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'lastBidder',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'claimed',
                type: 'bool',
            },
            {
                internalType: 'bool',
                name: 'isFirstListing',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'listingsAuction',
        outputs: [
            {
                internalType: 'uint256',
                name: 'gracePeriod',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'bidStep',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        name: 'priceReduction',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'revertToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_collection',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: '_status',
                type: 'bool',
            },
        ],
        name: 'setCollection',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'creator',
                type: 'bool',
            },
        ],
        name: 'setCollectionCreator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'currency',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'enabled',
                type: 'bool',
            },
        ],
        name: 'setCurrency',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_feePlatformAddress',
                type: 'address',
            },
        ],
        name: 'setFeePlatformAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'tokenToLastListing',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'listingId',
                type: 'uint256',
            },
        ],
        name: 'withdrawPending',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const
