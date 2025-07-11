export const TabsList = {
    OVERVIEW: 'Overview',
    CHALLENGES: 'Challenges',
    ACTIVITIES: 'Activities',
    NFT: 'NFTs',
    MYSTERY_BOXES: 'Mystery boxes',
    LEADERBOARD: 'Leaderboard',
    E_SHOP: 'E-shop',
} as const

export const NftTabsList = {
    ALL: 'All',
    LISTING: 'Listings',
    SALES: 'Sales',
    TRANSFERS: 'Transfers',
} as const

export const ProfileTabsList = {
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
    MY_NFTS: 'My NFTs',
    ACTIVITIES: 'Activities',
    REFERRAL: 'Referral',
    E_SHOP: 'E-shop',
} as const

export const ProfileMyNftsTabsList = {
    ALL: 'NFTs',
    GAME_ASSETS: 'Game assets',
    OWNED: 'Owned',
    LISTED: 'Listed',
    NOTCLAIMED: 'Not claimed',
    MYSTERY_BOXES: 'Mystery boxes',
    STAKED: 'Staked',
} as const

export type ObjectValues<T> = T[keyof T]

export type GameTab = {
    gameTab: string
}
