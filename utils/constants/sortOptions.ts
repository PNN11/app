import { TSortFilter } from 'components/marketplace/filter/types'

export const marketplaceSortOptions: TSortFilter[] = [
    { title: 'Recently Created', sortBy: { createdAt: 'DESC', priceAmount: undefined } },
    { title: 'Oldest', sortBy: { createdAt: 'ASC', priceAmount: undefined } },
    { title: 'Price: Low to High', sortBy: { priceAmount: 'ASC', createdAt: undefined } },
    { title: 'Price: High to Low', sortBy: { priceAmount: 'DESC', createdAt: undefined } },
]

export const gamesSortOptions: TSortFilter[] = [
    { title: 'Recently Created', sortBy: { createdAt: 'DESC', priceAmount: undefined } },
    { title: 'Oldest', sortBy: { createdAt: 'ASC', priceAmount: undefined } },
]

export enum MarketplaceSortOptions {
    createdAtDESC,
    createdAtASC,
    priceAmountASC,
    priceAmountDESC,
}
