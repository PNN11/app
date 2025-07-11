import { Economics } from '../economics';
import { Web3Core } from '../web3core';

export namespace Swap {
  export interface ExchangeRate {
    address: string;
    rate: number;
    reverseRate: number;
  }

  export enum WithdrawStatus {
    INIT,
    PENDING,
    SUCCESS,
    EXPIRED,
  }

  export interface WithdrawResponce {
    _id: string;
    externalId: string;
    currencyId: string;
    profileId: string;
    type: Economics.AssetType;
    payload: {
      addressRecipient: string;
      nonce: number;
      signature: string;
      chainId: Web3Core.EChainID;
    };
    status: WithdrawStatus;
    amount: 0;
  }

  export interface GetBalanceRequestParams {
    currenciesId: string[];
  }

  export interface Balance {
    id: string;
    currencyId: string;
    amount: number;
  }

  export type GetBalanceResponse = Balance[];
}
