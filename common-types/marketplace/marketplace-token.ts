import { Core } from '../core';
import { Economics } from '../economics';
import { Game } from '../game';
import { Web3Core } from '../web3core';

import { IMarketplaceCollection } from './marketplace-collection';

export enum MarketplaceTokenType {
  BUY = 'BUY',
  AUCTION = 'AUCTION',
}

export const MysteryBoxRarity = {
  common: 'common',
  uncommon: 'uncommon',
  rare: 'rare',
  epic: 'epic',
  legendary: 'legendary',
} as const;

export const ResolutionVariants = {
  MYSTER_BOX: 'MYSTER_BOX',
  TOKEN_ERC721: 'TOKEN_ERC721',
} as const;

export enum MarketplaceTokenTypePayload {
  CREATED = 'CREATED',
  MINT = 'MINT',
}

export enum MarketplaceTokenStatus {
  SOLD = 'SOLD',
  SALE = 'SALE',
}

export namespace IMarketplaceToken {
  export type TType = keyof typeof MarketplaceTokenType;
  export type TTypePayload = keyof typeof MarketplaceTokenTypePayload;
  export type TStatus = keyof typeof MarketplaceTokenStatus;

  export type RarityVariants = Core.ObjectValues<typeof MysteryBoxRarity>;
  export type ResolutionType = Core.ObjectValues<typeof ResolutionVariants>;

  export type TPayloadAll = TPayload<TTypePayload>;

  export type MarketplaceTokenSkill = {
    type: string;
    minLength: number;
    maxLength: number;
    step: number;
    value: number;
    label: string;
  };

  export type TPayload<T extends TTypePayload, R extends ResolutionType = 'TOKEN_ERC721'> = T extends 'CREATED'
    ? TPayloadCreated<T, R>
    : T extends 'MINT'
    ? TPayloadMint<T>
    : unknown;

  export type TPayloadBase<T extends TTypePayload, R extends ResolutionType> = {
    type: T;
    game?: Game.IGame;
    ownerId?: string;
    name: string;
    description: string;
    logo: string;
    metadataURI: string;
    resolution: R;
    isOpen: boolean;
    rankResolution?: R extends 'TOKEN_ERC721' ? RarityVariants : never;
    preview?: string;
  };

  export type TPayloadCreated<T extends TTypePayload, R extends ResolutionType> = TPayloadBase<T, R>;

  export type TSerie = {
    series: string;
    issueAmount: number;
    probability: number;
    soldAmount: number;
  };

  type PayloadMint<T extends TTypePayload, R extends ResolutionType> = TPayloadCreated<T, R> & {
    ownerAddress: string;
    address: string;
    chainId: Web3Core.EChainID;
    txHash: string;
    tokenId: number;
    lastListingId: number;
    dataTimeStart: number;
    dataTimeStop: number;
    lastBidPriceAmount: number;
    lastBidderId: string;
    isStaked: boolean;
    isPrivilegesRemoved: boolean;
  };

  type PayloadMintERC721<T extends TTypePayload> = PayloadMint<T, 'TOKEN_ERC721'>;
  type PayloadMintMysteryBox<T extends TTypePayload> = PayloadMint<T, 'MYSTER_BOX'> & {
    mysteryBox: {
      id: string;
      externalId: number;
      collectionId: string;
      series: Array<TSerie>;
    };
    isOpen: boolean;
  };

  export type TPayloadMint<T extends TTypePayload> = PayloadMintERC721<T> | PayloadMintMysteryBox<T>;

  export type TGetTokensRequestParams = Core.PaginatedRequestBaseParams &
    Partial<{
      userId: string;
      status: TStatus;
      resolution: ResolutionType;
      collectionId: string;
      collections: string[];
      searchText: string;
      priceAmount: {
        gte: number;
        lte: number;
      };
      lastDateTimeEnd: {
        gte?: number;
        lte?: number;
      };
      rank: Partial<{ gte: number; lte: number }>;
      types: TType[];
      sort: Partial<{
        createdAt: Core.SortParams;
        priceAmount: Core.SortParams;
      }>;
      currencies: string[];
      games: string[];
      traits: string[];
      rankResolutions: string[];
      isStaked?: boolean;
    }>;

  export type TRaffleFreeSpinAccess = {
    type: 'RAFFLE_FREE_SPIN';
    countFreeSpin: number;
  };
  export type TRaffleMultiplierAccess = {
    type: 'RAFFLE_MULTIPLIER';
    multiplier: number;
  };
  export type TReferralMultiplierAccess = {
    type: 'REFERRAL_MULTIPLIER';
    multiplier: number;
  };
  export type TLeaderboardAccess = {
    type: 'LEADERBOARD';
  };
  export type TReadAccess = {
    type: 'READ';
  };

  export type TPrivilegeAccess =
    | TRaffleFreeSpinAccess
    | TRaffleMultiplierAccess
    | TLeaderboardAccess
    | TReadAccess
    | TReferralMultiplierAccess;

  export type TPrivilege = { id: string; access: TPrivilegeAccess[] };

  export type TBodyResponse = Core.Response<{
    _id: string;
    collection: IMarketplaceCollection.TResponseBody;
    currency: Economics.IAsset;
    priceAmount: number;
    status: TStatus;
    traits: IMarketplaceCollection.MarketplaceTokenTrait[];
    skills: MarketplaceTokenSkill[];
    rank: number;
    type: TType;
    payload: TPayloadAll;
    privileges: Record<string, TPrivilege>;
  }>;

  export type TBodyMintResponse = TBodyResponse & {
    signature: string;
    nonce: number;
  };

  export type TBodyResponses = Core.PaginatedResponse<TBodyResponse>;
}
