export const MysteryBoxAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "collection",
                type: "address",
            },
        ],
        name: "CreateContextBox",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "boxId",
                type: "uint256",
            },
        ],
        name: "MintBox",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "nameSeries",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "MintToken",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "boxId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "droppedTokenId",
                type: "uint256",
            },
        ],
        name: "OpenBox",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "_lastContextId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "boxes",
        outputs: [
            {
                internalType: "bool",
                name: "isOpen",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "droppedTokenId",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "contextsBox",
        outputs: [
            {
                internalType: "uint256",
                name: "countBoxs",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "countTokens",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "probability",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "nameSeries",
                        type: "string",
                    },
                ],
                internalType: "struct IMysteryBox.InputBoxSeries[]",
                name: "inputBoxes",
                type: "tuple[]",
            },
        ],
        name: "createContextBox",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
        ],
        name: "getAllSeries",
        outputs: [
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "boxTokenId",
                type: "uint256",
            },
        ],
        name: "getBox",
        outputs: [
            {
                components: [
                    {
                        internalType: "bool",
                        name: "isOpen",
                        type: "bool",
                    },
                    {
                        internalType: "uint256",
                        name: "droppedTokenId",
                        type: "uint256",
                    },
                ],
                internalType: "struct IMysteryBox.Box",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "series",
                type: "string",
            },
        ],
        name: "getSeries",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "probability",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "issueAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "soldAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256[]",
                        name: "tokens",
                        type: "uint256[]",
                    },
                ],
                internalType: "struct IMysteryBox.BoxSeries",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract ICollection",
                name: "collection",
                type: "address",
            },
            {
                internalType: "string",
                name: "boxURI",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
        ],
        name: "mintOneBox",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "collection",
                type: "address",
            },
            {
                internalType: "string",
                name: "tokenURI",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "nameSeries",
                type: "string",
            },
        ],
        name: "mintOneToken",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract ICollection",
                name: "collection",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "contextId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenBoxId",
                type: "uint256",
            },
        ],
        name: "openBox",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
