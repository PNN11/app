import { Core } from '../core';
import { Game as GameNamespace } from '../game';
import { Children } from '../richText';

export namespace MainPage {
  export interface ActionButton {
    label?: string;
    url?: string;
  }

  export interface Currency {
    id: string;
    symbol: string;
    title: string;
    isVisible?: boolean;
    icon: string | Core.Media;
    decimals?: number;
    address?: string;
    chaiId?: '97' | '56' | '31337' | '80001' | '137';
    type: 'ERC20' | 'VIRTUAL';
    createdAt: string;
    updatedAt: string;
  }

  export interface Game {
    id: string;
    address: string;
    alias: string;
    showStatistics?: boolean;
    title?: string;
    view: {
      isStatistics?: boolean;
    };
    developer: {
      name?: string;
      url?: string;
    };
    leaderboardIds?: string[];
    description?: string;
    preview?: string;
    icon?: string;
    shortVideo?: string;
    stores: {
      apple?: string;
      google?: string;
    };
    currencies?: string[];
    releaseAt?: string;
    platforms?: GameNamespace.GamePlatform[];
    status?: 'COMMING_SOON' | 'LIVE';
    genres?: GameNamespace.Genre[];
    screenshots: string[];
    createdAt: string;
    updatedAt: string;
    countTokens: number;
  }

  export interface MarketplaceToken {
    id: string;
    collectionId: string;
    currencyId: Currency;
    priceAmount: number;
    type: 'BUY' | 'ACTION';
    isView?: boolean;
    status: 'SOLD' | 'SALE';
    rank?: number;
    traits?: string[];
    skills: {
      type: 'SELECT';
      label?: string;
      minLength?: number;
      maxLength?: number;
      step?: number;
      value?: number;
      id?: string;
    }[];
    payload: {
      type: 'CREATED' | 'MINT';
      name: string;
      description: string;
      nameSeries?: string;
      mysteryBoxId?: string;
      logo: Core.Media;
      preview?: Core.Media;
      gameId?: Game;
      ownerId?: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  export interface MainPageBanner {
    id: string;
    title?: string;
    description?: string;
    image: string;
    actionButton: ActionButton;
    secondaryActions: ActionButton[];
  }

  export interface MainPageDiscord {
    id: string;
    text?: string;
    actionButton: ActionButton;
    createdAt: string;
    updatedAt: string;
  }

  export interface Faq {
    id: string;
    question?: string;
    isVisible?: boolean;
    answer?: Children[];
    createdAt: string;
    updatedAt: string;
  }

  export interface GetMainPageDataResponse {
    banners: MainPageBanner[];
    discord: MainPageDiscord;
    faq: Faq[];
    games: Game[];
    marketplace: MarketplaceToken[];
  }
}
