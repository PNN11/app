import { Core } from '../core';
import { Economics } from '../economics';

export enum MarketplaceCollectionType {
  CREATED = 'CREATED',
  MINT = 'MINT',
}

export namespace IMarketplaceCollection {
  export type TType = keyof typeof MarketplaceCollectionType;
  export type TPayloadBase<T extends TType = TType> = {
    type: T;
    name: string;
    description: string;
    logo?: string;
    background?: string;
    chainId: string;
  };

  export interface MarketplaceTokenTrait extends Core.IEntity {
    title: string;
    value: string;
    rarity: number;
  }

  export type TPayloadCreated = TPayloadBase<'CREATED'> & {};

  export type TPayloadMint = TPayloadBase<'MINT'> & {
    creator?: string;
    owner?: string;
    address?: string;
  };

  export type TAllPayload = TPayloadCreated | TPayloadMint;

  export type TResponseBody = Core.Response<{
    _id: string;
    symbol: string;
    payload: TAllPayload;
    traits: MarketplaceTokenTrait[];
    currencies: Economics.IAsset[];
    statistics: {
      countBuyToken: number;
      countOwner: number;
      countTokens: number;
      minPrice: number;
    };
  }>;

  export type TResponsesBody = Core.PaginatedResponse<TResponseBody>;

  export type PriceHistoryPoint = { avg: number; date: number; countSale: number };

  export type PriceHistoryResponse = {
    avg: number;
    volume: number;
    prices: PriceHistoryPoint[];
  };
}
