import { Core } from '../core';

import { IMarketplaceToken } from './marketplace-token';

export enum UserActivityTypeEvent {
  LIST = 'LIST',
  SALE = 'SALE',
  TRANSFER = 'TRANSFER',
  MINTED = 'MINTED',
  BID = 'BID',
  CANCEL = 'CANCEL',
  CLAIM = 'CLAIM',
}

export enum UserActivityStatus {
  EXPIRE = 'EXPIRE',
  WON = 'WON',
  OUTBIDDED = 'OUTBIDDED',
  CANCEL_BID = 'CANCEL_BID',
  CANCEL = 'CANCEL',
  NONE = 'NONE',
  AUCTION_CANCELLED = 'AUCTION_CANCELLED',
}

export namespace IMarketplaceUserActivities {
  export type TEvents = keyof typeof UserActivityTypeEvent;
  export type TStatuses = keyof typeof UserActivityStatus;

  export type TPayload = {
    priceAmountToken: number;
  };

  export type TBodyResponse = {
    event: TEvents;
    priceAmount: number;
    token: IMarketplaceToken.TBodyResponse;
    from?: string;
    to?: string;
    lastListingId: number;
    isCancelBid: boolean;
    createdAt: number;
    status: TStatuses;
  };

  export type TBodyResponses = Core.PaginatedResponse<TBodyResponse>;
}
