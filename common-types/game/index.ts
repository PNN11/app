import { Core } from '../core';
import { Economics } from '../economics';
import { IMarketplaceCollection } from '../marketplace/marketplace-collection';
import { Children } from '../richText';


export enum GameStatus {
  LIVE = 'LIVE',
  COMMING_SOON = 'COMMING_SOON',
}

export namespace Game {
  export type TGameStatus = keyof typeof GameStatus;
  export interface IGame {
    icon: string;
    title: string;
    address: string;
    alias: string;
    currencies: Economics.IAsset[];
    description: string;
    shortDescription: string;
    stores: { apple: string; google: string; web: string; pc: string; galaxy: string };
    shortVideo: string;
    screenshots: string[];
    preview: string;
    id: string;
    collections: IMarketplaceCollection.TResponseBody[];
    countTokens: number;
    genre: Genre[];
    releaseAt?: string;
    developer: {
      name?: string;
      url?: string;
    };
    platforms: GamePlatform[];
    status: TGameStatus;
    view: {
      isStatistics: boolean;
      isShowGame: boolean;
    };
    banner: string;
    socials: {
      twitter: string;
      discord: string;
      instagram: string;
      medium: string;
      telegram: string;
    };
  }

  export type TLeaderboardItem = {
    username: string;
    score: number;
    position: number;
  };

  export type TLeaderboard = {
    top?: TLeaderboardItem[];
    center?: TLeaderboardItem[];
    bottom?: TLeaderboardItem[];
    pagination: Core.PaginatedResponse<boolean>;
  };
  export type TGameBanner = {
    image: {
      src: string;
      width: number;
    };
    game: {
      icon: string;
      title: string;
    };
    bgImage: string;
    description: string;
    maxWidthForDescription: string;
    blur: {
      image: string;
      width: number;
      padding: number;
    };
  };

  export type GameStatisticsRequestParams = {
    gameId: string;
    date: {
      gte: string;
      lte: string;
    };
  };

  export type PlayersStaticticsResponse = {
    totalCount: number;
    result: {
      count: number;
      date: number;
    }[];
  };

  export type PerfomanceResponceResult = { amount: number; date: number };

  export type TotalEarnedResponse = {
    totalEarned: number;
    result: PerfomanceResponceResult[];
  };

  export type TotalSpentResponse = {
    totalSpent: number;
    result: PerfomanceResponceResult[];
  };

  export interface Challenge {
    id: string;
    title?: string;
    game: IGame;
    isVisible?: boolean;
    description?: string;
    preview: Core.Media;
    content?: Children[];
    createdAt: string;
    updatedAt: string;
  }

  export interface Genre {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface GamePlatform {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
  }

  export type GetGamesRequestParams = Core.PaginatedRequestBaseParams & {
    createdAt?: Core.SortParams;
    status?: TGameStatus;
    isActiveChallenge?: boolean;
    genres?: string[];
    platforms?: string[];
    updatedAt?: Core.SortParams;
    searchText?: string;
  };

  export type TGameAsset = {
    name: string;
    description: string;
    cover: string;
    gameAssetId: string;
    price: {
      currency: {
        type: string;
        symbol: string;
        name: string;
      };
      amount: number;
    };
    isOwned?: boolean;
    tokenId?: string;
    marketplaceCollection?: IMarketplaceCollection.TResponseBody;
  };

  export interface MintGameAssetResponse {
    txId: string;
    tokenId: string;
  }

  export type GetGameTabsResponse = { leaderboard: boolean; tokens: boolean; challenges: boolean };

  export type GetChallengesResponse = Core.PaginatedResponse<Challenge>;
  export type GetGenresResponse = Core.PaginatedResponse<Genre>;
  export type GetGamePlatformsResponse = Core.PaginatedResponse<GamePlatform>;
  export type GetMyGameAssetsResponse = Core.PaginatedResponse<TGameAsset>;
}
