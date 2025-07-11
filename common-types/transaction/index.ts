import { Economics } from '../economics';
import { Web3Core } from '../web3core';

export namespace Transaction {
  export enum ETransferType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAWAL',
  }

  //   TODO: extennd list of statuses
  export enum ETxStatus {
    CREATED = 'CREATED',
  }

  export enum WithdrawalStatusCode {
    INIT = 'INIT',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    EXPIRED = 'EXPIRED',
  }

  export enum PayInPaymentStatusCode {
    PENDING = 'PENDING',
    RECEIVED = 'RECEIVED',
    COMPLETE = 'COMPLETE',
    FAILED = 'FAILED',
    EXPIRED = 'EXPIRED',
  }

  export enum PayInBinancePaymentStatusCode {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    EXPIRED = 'EXPIRED',
  }

  export enum PayloadType {
    BINANCE = 'BINANCE',
    ERC20 = 'ERC20',
  }

  export interface WithdrawPayload {
    status: WithdrawalStatusCode;
    nonce: number;
    signature: string;
    chainId: Web3Core.EChainID;
    type: PayloadType.ERC20;
  }

  export interface PayInPayload {
    status: PayInPaymentStatusCode;
    nonce: number;
    signature: string;
    chainId: Web3Core.EChainID;
    type: PayloadType.ERC20;
  }

  export interface PayInBinancePayload {
    status: PayInPaymentStatusCode;
    type: PayloadType.BINANCE;
    redirectType: {
      expiredTime: number;
      pairRate: { _amount: string };
      prepayId: string;
      redirectUrl: string;
      profileId: { _id: string };
    };
  }

  export interface ITransaction<P extends unknown, T extends ETransferType> {
    type: T;
    from: string;
    to: string;
    amount: number;
    currency: Economics.IAsset;
    createdAt: number;
    payload: P;
  }
  export type WithdrawTransaction = ITransaction<WithdrawPayload, ETransferType.WITHDRAW>;

  export type PayInTransaction = ITransaction<PayInPayload, ETransferType.DEPOSIT>;

  export type PayInBinanceTransaction = ITransaction<PayInBinancePayload, ETransferType.DEPOSIT>;

  export type Transaction = WithdrawTransaction | PayInTransaction | PayInBinanceTransaction;
}
